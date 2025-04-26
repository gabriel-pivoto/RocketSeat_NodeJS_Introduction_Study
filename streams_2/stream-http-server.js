import http from "node:http";
import { Transform } from "node:stream";
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    //chunk is a buffer, so we need to convert it to a string and then to a number
    //encoding is the encoding of the chunk, callback is a function that we need to call when we are done transforming the chunk
    const number = Number(chunk.toString()) * -1; //callback is a function that we need to call when we are done transforming the chunk
    console.log(number);
    callback(null, Buffer.from(String(number))); //callback is a function that we need to call when we are done transforming the chunk
  }
}
// req => readbleStream
// res => writableStream
const server = http.createServer(async(req, res) => {

    const buffer = [];
    for await (const chunk of req) {
      buffer.push(chunk); //push the chunk to the buffer
    }
    const data = Buffer.concat(buffer).toString(); //convert the buffer to a string
    console.log(data); //log the data to the console
    return res.end(data); //end the response with the data
});

server.listen(3334);
