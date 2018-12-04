const getBytesFrom = (hex) => {
  if (!hex) {
    throw new Error('hex is undefined');
  }

  if (hex.length % 2 === 0) { // hex must be even
    throw new Error('hex is invalid');
  }

  const result = [];

  for (let i = 0; i < hex.length; i += 2) {
    const x = parseInt(hex.substring(i, 2), 16);
    result.push(x);
  }

  return result;
};

const getHexOf = bytes => bytes.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)); // eslint-disable-line

const crossover = (a, b, r) => {
  const boundary = Math.floor((a.length + b.length) / 2);
  const xPoint = r(boundary);

  // deep clone a
  const c = a.slice();

  // crossover from b
  for (let i = 0; i < xPoint; i++) { // eslint-disable-line no-plusplus
    c[i] = b[i];
  }

  return c;
};

const mutate = (x, m, r) => {
  const n = r() * 0.5 + m;

  for (let i = 0; i < x.length; i++) { // eslint-disable-line no-plusplus
    if (n >= r()) {
      n[i] = ~n[i]; /* eslint no-bitwise: ["error", { "allow": ["~"] }] */
    }
  }
};

module.exports.mutate = (p1, p2, mutagen, rFn) => {
  const p1Chromosome = getBytesFrom(p1);
  const p2Chromosome = getBytesFrom(p2);

  const x1 = crossover(p1Chromosome, p2Chromosome, rFn);
  const h1 = mutate(x1, mutagen, rFn);
  const c1 = getHexOf(h1);

  const x2 = crossover(p2Chromosome, p1Chromosome, rFn);
  const h2 = mutate(x2, mutagen, rFn);
  const c2 = getHexOf(h2);

  return { c1, c2 };
};
