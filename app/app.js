const express = require("express");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const urlDatabase = {};

function generateCode() {
  return crypto.randomBytes(3).toString("hex");
}

app.post("/shorten", (req, res) => {

  const originalUrl = req.body.url;
  const code = generateCode();

  urlDatabase[code] = {
    original: originalUrl,
    clicks: 0
  };

  const shortUrl = `${req.protocol}://${req.get("host")}/${code}`;

  res.json({
    shortUrl: shortUrl
  });

});

app.get("/:code", (req, res) => {

  const code = req.params.code;

  if (urlDatabase[code]) {

    urlDatabase[code].clicks++;

    res.redirect(urlDatabase[code].original);

  } else {

    res.status(404).send("URL not found");

  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});