//streams
// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";
class OneToHundredStream extends Readable {
  index = 1; //index is a property of the class, so we need to use this.index to access it

  _read() {
    //_read is a method of the class, so we need to use this._read to access it
    const i = this.index++; //this.index is a property of the class, so we need to use this.index to access it
    setTimeout(() => {
      if (i > 100) {
        this.push(null); //push null to signal that there is no more data to be read
      } else {
        const buffer = Buffer.from(String(i)); //convert the number to a string and then to a buffer
        this.push(buffer); //push the buffer to the readable stream
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    //chunk is a buffer, so we need to convert it to a string and then to a number
    //encoding is the encoding of the chunk, callback is a function that we need to call when we are done transforming the chunk
    const number = Number(chunk.toString()) * -1; //callback is a function that we need to call when we are done transforming the chunk
    callback(null, Buffer.from(String(number))); //callback is a function that we need to call when we are done transforming the chunk
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    //chunk is a buffer, so we need to convert it to a string and then to a number
    //encoding is the encoding of the chunk, callback is a function that we need to call when we are done writing the chunk
    const number = Number(chunk.toString()) * 10; //callback is a function that we need to call when we are done transforming the chunk
    console.log(number);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream()) //pipe is a method of the readable stream, so we need to use this.pipe to access it
  .pipe(new MultiplyByTenStream());
