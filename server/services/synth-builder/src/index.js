const { createSynth } = require('./processor');

module.exports.handler = (event) => {
  let { body } = event;

  if (!body) {
    return {
      statusCode: 400,
      message: 'no data',
    };
  }

  try {
    body = JSON.parse(body);

    const data = createSynth(body);

    return {
      statusCode: 200,
      data,
    };
  } catch (err) {
    console.error(err);

    const { message } = err;

    return {
      statusCode: 500,
      message,
    };
  }
};
