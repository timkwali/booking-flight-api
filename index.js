const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const allFlights  = models.exampleModel

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

//ADD A FLIGHT
app.post("/flight", (req, res) => {
  allFlights.push(req.body)
    return res.status(200).json(
      {
        status: 200,
        message: "New flight successfully created.",
      }
    )
})

//GET ALL FLIGHTS
app.get("/flights", (req, res) => {
  return res.json({
    status: 200,
    message: "Request successful",
    data: allFlights
  })
})

//GET SINGLE FLIGHT BY ID
app.get('/flight/:id', (req, res) => {
  let id = req.params.id
  let foundFlight = allFlights.find(flight => {
    return flight.id == id
  })

  if(foundFlight) {
    return res.json(
      {
        status: 200,
        message: "Request successful",
        data: foundFlight
      }
    )
  } else {
    return res.status(404).json({
      status: 404,
      message: `Flight not found.`,
      data: {}
    })
  }
})

//UPDATE SINGLE FLIGHT BY ID
app.put('/flight/:id', (req, res) => {
  let id = req.params.id
  let newFlight = req.body
  //Replace flight
  allFlights.forEach((flight, index) => {
    if(flight.id == id) {
      allFlights[index] = newFlight
      return res.status(200).json(
        {
          status: 200,
          message: "Flight updated successfully.",
        }
      )
    }
  })

  //FLIGHT NOT FOUND
  return res.status(404).json({
    status: 404,
    message: `Flight not found.`,
    data: {}
  })
})

//DELETE SINGLE FLIGHT BY ID
app.delete('/flight/:id', (req, res) => {
  let id = req.params.id
  allFlights.forEach((flight, index) => {
    if(flight.id == id) {
      allFlights.splice(index, 1)
      return res.status(200).json(
        {
          status: 200,
          message: "Flight deleted successfully.",
        }
      )
    } 
  })

  //FLIGHT NOT FOUND
  return res.status(404).json({
    status: 404,
    message: `Flight not found.`,
    data: {}
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
