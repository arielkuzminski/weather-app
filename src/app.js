const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebards engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Strona główna",
    name: "Ariel Kuźmiński",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About header",
    name: "Ariel Kuźmiński",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help header",
    name: "Ariel Kuźmiński",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must privde an address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error: "Error fetching location",
      });
    }
    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "Error fetching forecast",
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });


});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Sorry, help article not found",
    name: "Ariel Kuźmiński",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Sorry, page not found",
    name: "Ariel Kuźmiński",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
