# 📄 Middleware `json.js`

## ✨ What is this file?

The `json.js` file is a **custom middleware** designed for a Node.js server.  
Its main job is to **read the body of incoming HTTP requests** and **parse it as JSON**.

In pure Node.js, the request body is received as a stream of data chunks, and **it is not automatically parsed**.  
This middleware handles that manually and attaches the parsed data to `req.body`.

---

## 🛠 How It Works

1. The middleware receives the `req` (request) and `res` (response) objects.
2. It listens to the incoming data by awaiting chunks from the `req` stream.
3. It stores all the chunks in a `buffer` array.
4. After all data is received, it concatenates and converts the buffer to a string.
5. It then tries to parse this string into a JavaScript object using `JSON.parse`.
6. If successful, it assigns the parsed object to `req.body`.
7. If parsing fails (e.g., invalid JSON), `req.body` is set to `null`.

---

## 📜 Example Code (`json.js`)

```javascript
export async function json(req, res, next) {
    const buffer = [];
    
    for await (const chunk of req) {
        buffer.push(chunk); // Push the chunk to the buffer
    }
    
    try {
        req.body = JSON.parse(Buffer.concat(buffer).toString()); // Convert the buffer to a string and then to a JSON object
    } catch (error) {
        req.body = null; // If there is an error, set the body to null
    }
}
```

---

## 📌 Step-by-Step Breakdown:

- `for await (const chunk of req)`  
  ➔ Collects incoming chunks of data from the request stream.

- `Buffer.concat(buffer).toString()`  
  ➔ Merges all chunks into a single string.

- `JSON.parse(...)`  
  ➔ Parses the JSON string into a JavaScript object.

- `req.body = result`  
  ➔ Attaches the parsed object to `req.body`.

- **If parsing fails**, `req.body` becomes `null`, allowing the application to handle invalid input safely.

---

## ⚠️ Important Notes

- This middleware **expects the request body to be JSON** (`Content-Type: application/json`).
- If the request body is not valid JSON, `req.body` will be `null`.
- No `next()` call is made in this example. (In frameworks like Express, `next()` would be used to pass control to the next middleware.)

---

## 📚 Summary

- Node.js by default does **not** parse the request body.
- This middleware manually **reads**, **concatenates**, **parses**, and **assigns** the request body.
- It helps the server easily access incoming data as a JavaScript object through `req.body`.
