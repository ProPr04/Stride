import savedModel from '../models/savedModel.js';

export const saveOpportunity = async (req, res, next) => {
  try {
    const athleteId = req.user.id;
    const { opportunityId } = req.body;

    if (!opportunityId) {
      return res.status(400).json({
        status: 'fail',
        message: 'opportunityId is required.',
      });
    }

    const saved = await savedModel.saveOpportunity(athleteId, opportunityId);

    res.status(201).json({
      status: 'success',
      data: {
        saved,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const unsaveOpportunity = async (req, res, next) => {
  try {
    const athleteId = req.user.id;
    const { opportunityId } = req.params;

    if (!opportunityId) {
      return res.status(400).json({
        status: 'fail',
        message: 'opportunityId is required.',
      });
    }

    await savedModel.unsaveOpportunity(athleteId, opportunityId);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedOpportunities = async (req, res, next) => {
  try {
    const athleteId = req.user.id;
    const saved = await savedModel.getSavedOpportunities(athleteId);

    res.status(200).json({
      status: 'success',
      results: saved.length,
      data: {
        saved,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  saveOpportunity,
  unsaveOpportunity,
  getSavedOpportunities,
};
