import opportunityModel from '../models/opportunityModel.js';
import { deleteUploadedFile } from '../utils/fileUtils.js';
import pool from '../config/db.js';

/**
 * Creates a new active opportunity.
 * Restricted to Academy users only via middleware.
 */
export const createOpportunity = async (req, res, next) => {
  try {
    const academyId = req.user.id;
    const {
      title,
      role,
      sport,
      compensation_cash,
      compensation,
      perks = [],
      description,
      responsibilities,
      whatYouWillDo,
      requirements = [],
      location,
      timeline,
      caption,
      media_image,
      image,
      status,
    } = req.body;

    // 1. Flexible Validation & Normalization
    const effectiveTitle = (title || role || '').trim();
    const effectiveRole = (role || title || '').trim();
    const effectiveSport = (sport || 'General Sports').trim();

    let numericCash = compensation_cash;
    if (numericCash == null && compensation) {
      const match = String(compensation).replace(/[^0-9.]/g, '');
      numericCash = match ? parseFloat(match) : 10000;
    }
    numericCash = Number(numericCash);
    if (!numericCash || numericCash <= 0) {
      numericCash = 10000; // Sensible default minimum compensation
    }

    if (!effectiveTitle || !effectiveRole) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide opportunity title and role.',
      });
    }

    const effectiveDescription = description || responsibilities || whatYouWillDo || caption || '';
    const effectiveCaption = caption || description || `Exciting opportunity for ${effectiveRole} in ${effectiveSport}.`;
    const effectiveRequirements = Array.isArray(requirements)
      ? requirements
      : typeof requirements === 'string'
      ? requirements.split('\n').map((r) => r.trim()).filter(Boolean)
      : [];
    const effectivePerks = Array.isArray(perks)
      ? perks
      : typeof perks === 'string'
      ? perks.split(',').map((p) => p.trim()).filter(Boolean)
      : ['Performance bonus', 'Equipment support'];
    const effectiveStatus = (status === 'Draft' || status === 'closed') ? 'closed' : 'active';
    const effectiveImage = media_image || image || null;

    // 2. Create the record in the database
    const newOpportunity = await opportunityModel.createOpportunity(academyId, {
      title: effectiveTitle,
      role: effectiveRole,
      sport: effectiveSport,
      compensation_cash: numericCash,
      perks: effectivePerks,
      description: effectiveDescription,
      requirements: effectiveRequirements,
      location: location || null,
      timeline: timeline || null,
      caption: effectiveCaption,
      media_image: effectiveImage,
      status: effectiveStatus,
    });

    res.status(201).json({
      status: 'success',
      data: {
        opportunity: newOpportunity,
      },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Retrieves a list of active opportunities.
 * Accepts query parameters for faceted filtering and search.
 */
export const getActiveOpportunities = async (req, res, next) => {
  try {
    // 1. Extract query parameters from the request url
    const { sport, role, search } = req.query;
    
    // 2. Build the filter object
    const filters = {};
    if (sport) filters.sport = sport;
    if (role) filters.role = role;
    if (search) filters.search = search;

    // 3. Query the database
    const opportunities = await opportunityModel.getActiveOpportunities(filters);


    res.status(200).json({
      status: 'success',
      results: opportunities.length,
      data: {
        opportunities,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all opportunities posted by the currently logged-in academy,
 * including the total number of applications received for each.
 */
export const getMyPostedOpportunities = async (req, res, next) => {
  try {
    const academyId = req.user?.id || req.user?.userId;
    if (!academyId) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          opportunities: [],
        },
      });
    }

    const opportunities = await opportunityModel.getOpportunitiesByAcademy(academyId);

    res.status(200).json({
      status: 'success',
      results: opportunities.length,
      data: {
        opportunities,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an opportunity's status (active vs closed).
 * Restricted to the owning academy.
 */
export const updateOpportunityStatus = async (req, res, next) => {
  try {
    const academyId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'closed'].includes(status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status. Must be either "active" or "closed".',
      });
    }

    const updated = await opportunityModel.updateOpportunityStatus(id, academyId, status);

    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        message: 'Opportunity not found or you do not have permission to modify it.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        opportunity: updated,
      },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Updates an existing opportunity.
 * Restricted to the owning academy.
 */
export const updateOpportunity = async (req, res, next) => {
  try {
    const academyId = req.user.id;
    const { id } = req.params;
    const data = req.body;

    let oldImage = null;
    if (data.media_image !== undefined || data.image !== undefined) {
      try {
        const oldRes = await pool.query('SELECT media_image FROM opportunities WHERE id = $1', [id]);
        oldImage = oldRes.rows[0]?.media_image;
      } catch (queryErr) {
        console.warn('Could not query previous opportunity image:', queryErr.message);
      }
    }

    const updated = await opportunityModel.updateOpportunity(id, academyId, data);

    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        message: 'Opportunity not found or you do not have permission to modify it.',
      });
    }

    const newImage = data.media_image !== undefined ? data.media_image : data.image;
    if (oldImage && newImage !== undefined && oldImage !== newImage) {
      await deleteUploadedFile(oldImage);
    }

    res.status(200).json({
      status: 'success',
      data: {
        opportunity: updated,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createOpportunity,
  getActiveOpportunities,
  getMyPostedOpportunities,
  updateOpportunityStatus,
  updateOpportunity,
};