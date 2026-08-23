import pool from '../config/db.js';
import agreementModel from '../models/agreementModel.js';

/**
 * Allows an athlete to apply for an active opportunity.
 * Restricted to 'athlete' role via middleware.
 */
export const applyForOpportunity = async (req, res, next) => {
  try {
    const athleteId = parseInt(req.user.id, 10);
    let { opportunityId, academyId } = req.body;

    const numOppId = parseInt(opportunityId, 10);
    if (!opportunityId || isNaN(numOppId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Valid opportunityId is required to apply.',
      });
    }

    let numAcademyId = academyId ? parseInt(academyId, 10) : null;

    if (!numAcademyId || isNaN(numAcademyId)) {
      const oppRes = await pool.query('SELECT academy_id FROM opportunities WHERE id = $1', [numOppId]);
      if (oppRes.rows.length > 0 && oppRes.rows[0].academy_id) {
        numAcademyId = parseInt(oppRes.rows[0].academy_id, 10);
      }
    }

    const newAgreement = await agreementModel.createAgreement(
      numOppId, 
      athleteId, 
      numAcademyId || null
    );


    res.status(201).json({
      status: 'success',
      data: {
        agreement: newAgreement,
      },
    });
  } catch (error) {
    // Handle PostgreSQL unique constraint violation (code 23505) for duplicate applications
    if (error.code === '23505') {
      return res.status(400).json({
        status: 'fail',
        message: 'You have already applied for this opportunity.',
      });
    }
    next(error);
  }
};

/**
 * Retrieves all agreements for the currently logged-in user.
 * Dynamically returns applications made by an athlete, or applications received by an academy.
 */
export const getMyAgreements = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const agreements = await agreementModel.getAgreementsByUser(userId, role);

    res.status(200).json({
      status: 'success',
      results: agreements.length,
      data: {
        agreements,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Allows an academy to update the status of an application (accepted, rejected, completed).
 * Restricted to 'academy' role via middleware.
 */
export const updateAgreementStatus = async (req, res, next) => {
  try {
    const academyId = parseInt(req.user.id, 10);
    const agreementId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isNaN(agreementId) || isNaN(academyId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid agreement or academy ID format.',
      });
    }

    // Normalize status
    let normalizedStatus = status;
    if (status === 'approved') normalizedStatus = 'accepted';
    if (status === 'declined') normalizedStatus = 'rejected';

    // Validate the requested status update
    if (!['accepted', 'rejected', 'completed'].includes(normalizedStatus)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status update. Must be accepted, rejected, or completed.',
      });
    }

    const updatedAgreement = await agreementModel.updateAgreementStatus(
      agreementId, 
      academyId, 
      normalizedStatus
    );

    if (!updatedAgreement) {
      return res.status(404).json({
        status: 'fail',
        message: 'Agreement not found or you do not have permission to modify it.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        agreement: updatedAgreement,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  applyForOpportunity,
  getMyAgreements,
  updateAgreementStatus,
};