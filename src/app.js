import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";

import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Machak Company",
    createdByName: "Manojit Chakraborty",
  });
});

// app.get('/', (req, res) => {
//   res.send('Welcome to World of express.js')
// })

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help & Support Page",
    createdByName: "Manojit Chakraborty",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us Page",
    createdByName: "Manojit Chakraborty",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.status(422).send({
      error: "Please provide a search term",
    });
  }

  const address = req.query.search

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.status(500).send({
          error: error,
        });
      }

      res.status(200).send({
        location: location,
        forecast: forecastData,
        address: address,
      });
    });
  });
});

app.get("/html", (req, res) => {
  res.send("<b>HTML</b>");
});

app.get("/json", (req, res) => {
  res.send({
    name: "Manojit",
    age: 29,
  });
});

app.get("/array_of_objects", (req, res) => {
  res.send([
    {
      name: "Manojit",
      age: 29,
    },
    {
      name: "Debopriya",
      age: 24,
    },
  ]);
});

app.use(function (req, res, next) {
  res.status(404).render("404", {
    title: "404",
    errorMessage: "File Not Found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
