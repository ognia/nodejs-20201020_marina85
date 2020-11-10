const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
    constructor(options) {
        super(options);

        this.line = '';

    }

    _transform(chunk, encoding, callback) {
        const charArray = chunk.toString().split('');

        for (const char of charArray) {
            if (char === os.EOL) {
                this.push(this.line);
                this.line = ''
                continue;
            }

            this.line += char;

        }
        callback();
    }

    _flush(callback) {
        callback(null, this.line)
    }
}

module.exports = LineSplitStream;
