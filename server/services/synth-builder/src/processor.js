const crypto = require('crypto');

module.exports.createSynth = (data) => {
  const { trainerId } = data;

  if (!trainerId) {
    throw new Error('no trainerId');
  }

  const val = trainerId;

  const hash = crypto.createHash('sha256');

  hash.update(val);

  const attrHash = hash.digest('hex');

  return {
    generation: 0,
    attrHash,
  };
};
