import http from "node:http";
import { json } from "./middleware/json.js"; //import the json middleware
import { Database } from "./database.js"; //import the database
import { routes } from "./routes.js"; //import the routes
//create a new instance of the database
const users = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);


  const route = routes.find(route=>{
    return route.method === method && route.path === url;
  }

  )

  if (route) {
    return route.handle(req, res);
  }
  res.writeHead(404).end("Not found");
});

server.listen(3333);
