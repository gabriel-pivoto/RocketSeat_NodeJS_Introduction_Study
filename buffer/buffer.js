const buf = Buffer.from("hello world");
console.log(buf); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.toString()); // hello world
console.log(buf.toString("base64")); // aGVsbG8gd29ybGQ=
console.log(buf.toString("hex")); // 68656c6c6f20776f726c64
console.log(buf.toString("utf8")); // hello world
console.log(buf.toJSON());  
