// A program to perform CRUD operation in a sample array data. Data is wiped out on reloading the server

import express from "express";

const app = express();
const port = 3000;

// app.use is used to accept data from the frontend
app.use(express.json());

let teaData = [];
let nextID = 1;

// Add a new Tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextID++, name, price };
  teaData.push(newTea);

  res.status(201).send(newTea);
});

//app.get is used to send `get` response to the frontend
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Get all the tea stored in the database
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get a perticular tea using id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea Not Found");
  }
  res.status(200).send(tea);
});

//Update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea Not Found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

//Delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea Not Found");
  }

  teaData.splice(index, 1);
  return res.status(204).send("Tea Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
