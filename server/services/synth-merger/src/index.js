const { mutate } = require('./mutator');

module.exports.handler = (event) => {
  let statusCode;
  let body;

  try {
    const payload = JSON.parse(event.message);
    const { p1, p2, mutagen } = payload;

    const result = mutate(p1, p2, mutagen);

    statusCode = 200;
    body = JSON.stringify(result);
  } catch (err) {
    console.error(err);
    statusCode = 500;
    body = 'en error occured';
  }

  return {
    statusCode, body,
  };
};
