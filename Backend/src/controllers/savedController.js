import savedModel from '../models/savedModel.js';

export const saveOpportunity = async (req, res, next) => {
  try {
    const athleteId = parseInt(req.user.id, 10);
    const { opportunityId } = req.body;
    const numOppId = parseInt(opportunityId, 10);

    if (!opportunityId || isNaN(numOppId) || isNaN(athleteId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Valid opportunityId is required.',
      });
    }

    const saved = await savedModel.saveOpportunity(athleteId, numOppId);

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
    const athleteId = parseInt(req.user.id, 10);
    const { opportunityId } = req.params;
    const numOppId = parseInt(opportunityId, 10);

    if (!opportunityId || isNaN(numOppId) || isNaN(athleteId)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Valid opportunityId is required.',
      });
    }

    await savedModel.unsaveOpportunity(athleteId, numOppId);

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
