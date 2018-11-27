function createError(name, init) {
  function Err(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    init && init.apply(this, arguments); // eslint-disable-line
  }

  Err.prototype = new Error();
  Err.prototype.name = name;
  Err.prototype.constructor = Err;
  return Err;
}

const NotImplementedError = createError('NotImplementedError', () => { this.message = 'not implemented'; });

module.exports = {
  NotImplementedError,
};
