import { Database } from "./database.js";
const database = new Database();

import { randomUUID } from "node:crypto"; //import the randomUUID function
export const routes = [
  {
    method: "GET",
    path: "/users",
    handle: (req, res) => {
      const users = database.select("users"); //get the users from the database
      return res.end(JSON.stringify(users));
    },
  },

  {
    method: "POST",
    path: "/users",
    handle: (req, res) => {
      const { name, email } = req.body; //get the name and email from the body
      const user = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", user);

      return res.writeHead(201).end("User created");
    },
  },
];
