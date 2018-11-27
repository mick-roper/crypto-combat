const { NotImplementedError } = require('./errors');

module.exports.getTrainerByUserId = async (userId) => {
  if (!userId) {
    throw new Error('userId is not defined');
  }

  throw new NotImplementedError('not implemented');
};

module.exports.createTrainerFor = async (userId) => {
  if (!userId) {
    throw new Error('userId is not defined');
  }

  throw new NotImplementedError('not implemented');
};
