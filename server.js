const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

// HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// API Endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      dateString = parseInt(dateString);
    }
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is cooking on port ${PORT}`);
});
