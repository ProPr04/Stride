import agreementModel from '../models/agreementModel.js';

/**
 * Allows an athlete to apply for an active opportunity.
 * Restricted to 'athlete' role via middleware.
 */
export const applyForOpportunity = async (req, res, next) => {
  try {
    const athleteId = req.user.id;
    const { opportunityId, academyId } = req.body;

    if (!opportunityId || !academyId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Both opportunityId and academyId are required to apply.',
      });
    }

    const newAgreement = await agreementModel.createAgreement(
      opportunityId, 
      athleteId, 
      academyId
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
    const academyId = req.user.id;
    const { id } = req.params; // The agreement ID from the URL
    const { status } = req.body;

    // Validate the requested status update
    if (!['accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status update. Must be accepted, rejected, or completed.',
      });
    }

    const updatedAgreement = await agreementModel.updateAgreementStatus(
      id, 
      academyId, 
      status
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