import opportunityModel from '../models/opportunityModel.js';

/**
 * Creates a new active opportunity.
 * Restricted to Academy users only via middleware.
 */
export const createOpportunity = async (req, res, next) => {
  try {
    const academyId = req.user.id;
    const { title, role, sport, compensation_cash, perks } = req.body;

    // 1. Strict Validation: Mandate cash pay + developmental perks
    if (!title || !role || !sport || compensation_cash == null || !perks || !Array.isArray(perks)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all required fields: title, role, sport, compensation_cash, and an array of perks.',
      });
    }

    if (Number(compensation_cash) <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Compensation must be greater than zero. No exposure-only opportunities are allowed.',
      });
    }

    // 2. Create the record in the database
    const newOpportunity = await opportunityModel.createOpportunity(academyId, {
      title,
      role,
      sport,
      compensation_cash,
      perks,
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
 * Accepts query parameters for faceted filtering.
 */
export const getActiveOpportunities = async (req, res, next) => {
  try {
    // 1. Extract query parameters from the request url
    const { sport, role } = req.query;
    
    // 2. Build the filter object
    const filters = {};
    if (sport) filters.sport = sport;
    if (role) filters.role = role;

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
    const academyId = req.user.id;
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

export default {
  createOpportunity,
  getActiveOpportunities,
  getMyPostedOpportunities,
  updateOpportunityStatus,
};