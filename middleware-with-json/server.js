import http from "node:http";
import { json } from "./middleware/json.js"; //import the json middleware
const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log("Method:", method);

  await json(req, res)    
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
