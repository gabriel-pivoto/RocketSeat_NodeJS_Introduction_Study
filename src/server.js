import http from "node:http";

const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log("Method:", method);
  const buffer = [];
  for await (const chunk of req) {
    buffer.push(chunk); //push the chunk to the buffer
  }
  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString()); //convert the buffer to a string and then to a JSON object
  } catch (error) {
    req.body = null; //if there is an error, set the body to null
  }
  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body; //get the name and email from the body
    users.push({ id: 1, name, email });

    return res.writeHead(201).end("User created");
  }
  res.writeHead(404).end("Not found");
});

server.listen(3333);
