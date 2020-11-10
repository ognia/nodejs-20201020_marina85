const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = Number(options.limit) || 2;
    this.sizeStream = 0;
  }

  _transform(chunk, encoding, callback) {
    this.sizeStream += chunk.byteLength;

    if (this.limit < this.sizeStream) {
      callback(new LimitExceededError(), null);
    }

    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
