import express from "express";
const app = express();
export default app;

import employees from "./db/employees.js";
console.log(employees);

//hello employees
app.route("/").get((req, res) => {
    res.send("Hello employees!");
  });


  //list of employees
  app.route("/employees").get((req, res) => {
    res.send(employees);
  });


  let previousIndex = null

  app.route("/employees/random").get((req, res) => { 
    const randomIndex = Math.floor(Math.random() * employees.length)
    console.log(randomIndex)
    if (previousIndex  === randomIndex) {
        return res.status(404).send("we already did this")
    }
    previousIndex = randomIndex
    const randomEmployee =  employees[randomIndex]
    console.log(randomEmployee)
    return res.json(randomEmployee)

  });


  //return an individual employee
  app.route("/employees/:id").get((req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(404).send("id need to be a number")
    }
    if (id > employees.length - 1) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employees[id-1]);
  });

