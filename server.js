const express = require("express");
const hbs = require("hbs"); //handlebarsjs.com // npmjs.com/package/hbs
const fs = require("fs");

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(`${now} : ${req.method} ${req.url}`);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home",
    message: "Welcome"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Bad Request"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects"
  });
});

app.listen(PORT, () => {
  console.log(`Server is up in port ${PORT}`);
});
