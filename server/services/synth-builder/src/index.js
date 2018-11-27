module.exports.handler = (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      message: 'no data',
    };
  }

  return {};
};
