import http from "node:http";

const users = [];
const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log("Method:", method);

  if (method === "GET" && url === "/users") {
    
    return res
    .setHeader("Content-Type", "application/json")
    .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({ id: 1, name: "John Doe", email: "johndoe@example.com" });

    return res.end("User created");
  }
  if (method === "PUT" && url === "/users/1") {
    return res.writeHead(201).end("User updated");
  }
  res.writeHead(404).end("Not found");
});

server.listen(3333);
