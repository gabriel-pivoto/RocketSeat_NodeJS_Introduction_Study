import http from "node:http";
import { json } from "./middleware/json.js"; //import the json middleware
import { Database } from "./database.js"; //import the database

const database = new Database(); //create a new instance of the database
const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log("Method:", method);

  await json(req, res);
  if (method === "GET" && url === "/users") {
    const users = database.select("users"); //get the users from the database
    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body; //get the name and email from the body
    const user = {
      id: 1,
      name,
      email,
    }
    database.insert("users", user);

    return res.writeHead(201).end("User created");
  }
  res.writeHead(404).end("Not found");
});

server.listen(3333);
