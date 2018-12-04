const { mutate } = require('./mutator');

const first = (args, ...functions) => {
  for (let i = 0; i < functions.length; i += 1) {
    const x = functions[i](...args);
    if (x) {
      return x;
    }
  }

  throw new Error('none of the functions completed successfully');
};

const validate = (p1, p2, m) => {
  if (!p1) {
    return { statusCode: 400, body: 'no p1 property' };
  }

  if (!p2) {
    return { statusCode: 400, body: 'no p2 property' };
  }

  if (m && Number.isNaN(m)) {
    return { statusCode: 400, body: 'mutator is not a number' };
  }

  return undefined; // explicitly return to please the linter
};

const mutateWrapper = (p1, p2, m) => {
  const data = mutate(p1, p2, m);
  return { statusCode: 200, body: JSON.stringify(data) };
};

module.exports.handler = (event) => {
  try {
    const payload = JSON.parse(event.message);
    const { p1, p2, mutagen } = payload;

    return first([p1, p2, mutagen], validate, mutateWrapper);
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: 'an error occured',
    };
  }
};
