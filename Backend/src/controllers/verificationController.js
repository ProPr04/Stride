import verificationModel from '../models/verificationModel.js';

/**
 * Controller for Verification System
 */

export const getMyVerificationStatus = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 1;
    const role = req.user?.role || req.query.role || 'athlete';

    const status = await verificationModel.getUserVerificationStatus(userId, role);

    return res.status(200).json({
      status: 'success',
      data: { verification: status }
    });
  } catch (error) {
    console.error('Error fetching verification status:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve verification status.'
    });
  }
};

export const getUserVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const role = req.query.role || 'athlete';

    const status = await verificationModel.getUserVerificationStatus(userId, role);

    return res.status(200).json({
      status: 'success',
      data: { verification: status }
    });
  } catch (error) {
    console.error('Error fetching user verification status:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve verification status.'
    });
  }
};

export const promoteAthlete = async (req, res) => {
  try {
    const academyUserId = req.user?.id || req.body.academyUserId;
    const { athleteUserId, tenureReason } = req.body;

    if (!athleteUserId) {
      return res.status(400).json({
        status: 'fail',
        message: 'athleteUserId is required.'
      });
    }

    const result = await verificationModel.promoteAthleteToLevel4WithTenure(
      athleteUserId,
      academyUserId,
      tenureReason
    );

    return res.status(200).json({
      status: 'success',
      message: 'Athlete successfully endorsed and promoted to Level 4 (Elite Pro).',
      data: result
    });
  } catch (error) {
    console.error('Error promoting athlete:', error.message);
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export default {
  getMyVerificationStatus,
  getUserVerificationStatus,
  promoteAthlete
};
