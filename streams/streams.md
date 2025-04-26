# Understanding Streams in Node.js

## What are Streams?

Streams are a way to handle **reading** and **writing** data **asynchronously** and **efficiently** in Node.js.  
Instead of loading the entire data into memory at once, streams work with **small chunks of data**.

Streams are essential for handling large files, video streams, network communications, and more.

---

## Types of Streams

Node.js provides four main types of streams:

| Type | Description |
|:-----|:------------|
| **Readable** | Used to read data |
| **Writable** | Used to write data |
| **Duplex** | Can both read and write data |
| **Transform** | A special type of Duplex stream that modifies data during transmission |

---

## Example Explained

Let's look at an example where we:

1. Generate numbers from 1 to 100 (`Readable`).
2. Invert the number's sign (`Transform`).
3. Multiply the result by 10 and output it (`Writable`).

---

### 1. Readable Stream: `OneToHundredStream`

```javascript
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null); // No more data
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer); // Send the data chunk
      }
    }, 1000); // Delay each number by 1 second
  }
}
```

- `push(buffer)`: Sends a chunk of data.
- `push(null)`: Signals the end of data.

---

### 2. Transform Stream: `InverseNumberStream`

```javascript
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(number)));
  }
}
```

- Receives a chunk, converts it to a number, multiplies it by `-1`, and passes it along.

---

### 3. Writable Stream: `MultiplyByTenStream`

```javascript
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString()) * 10;
    console.log(number);
    callback();
  }
}
```

- Receives the transformed chunk, multiplies it by `10`, and logs the result.

---

## Connecting the Streams

We connect the streams using the `pipe()` method:

```javascript
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
```

- `pipe()` automatically connects the streams so that the output of one becomes the input of the next.
- The data flows from **Readable ➔ Transform ➔ Writable**.

---

## Important Concepts

| Concept | Description |
|:--------|:------------|
| **Stream** | Continuous flow of data |
| **Chunk** | Small piece of data (Buffer) |
| **Buffer** | Binary representation of data |
| **Readable Stream** | Emits data |
| **Writable Stream** | Receives data |
| **Transform Stream** | Modifies data |
| **pipe()** | Connects streams in a flow |

---

## Summary

Streams in Node.js allow efficient data processing without loading everything into memory.  
They are extremely powerful when working with large datasets, and their modular structure (Readable ➔ Transform ➔ Writable) makes building data pipelines intuitive and scalable.

