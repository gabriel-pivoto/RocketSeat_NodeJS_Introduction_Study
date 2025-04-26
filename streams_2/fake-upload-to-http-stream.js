import { Readable } from "node:stream"; //import Readable from node:stream
class OneToHundredStream extends Readable {
  index = 1; //index is a property of the class, so we need to use this.index to access it

  _read() {
    //_read is a method of the class, so we need to use this._read to access it
    const i = this.index++; //this.index is a property of the class, so we need to use this.index to access it
    setTimeout(() => {
      if (i > 5) {
        this.push(null); //push null to signal that there is no more data to be read
      } else {
        const buffer = Buffer.from(String(i)); //convert the number to a string and then to a buffer
        this.push(buffer); //push the buffer to the readable stream
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
    method: "POST", 
    body: new OneToHundredStream(),
    duplex: "half", //body is a property of the request, so we need to use this.body to access it
}).then(res => res.text()).then(data => console.log(data)); //res is a response object, so we need to use res.text() to get the text of the response
// .then(data => console.log(data)); //data is the data that we get from the response, so we need to use data to access it  
