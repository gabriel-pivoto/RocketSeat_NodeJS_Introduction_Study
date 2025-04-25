import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log("Method:", method);

  if (method === "GET" && URL ==="/users"){
    return res.end("List of users"); 
  }

  if(method === "POST" && URL ==="/users"){
    return res.end("User created"); 
  }
  if(method === "PUT" && URL ==="/users/1"){
    return res.end("User updated"); 
  }
  res.end("Hello World\n");
});

server.listen(3333);
