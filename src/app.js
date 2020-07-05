const path = require("path");
// All about express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const sgMail = require("@sendgrid/mail");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/console", (req, res) => {
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: "newbennytal@gmail.com",
    from: "newbennytal@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "Email from a costumer",
    html: `<strong>Name: ${req.body.name} <br /> <strong>Email: ${req.body.email}</strong> <br/> <strong>Msg: ${req.body.msg}</strong></strong>`,
  };
  sgMail.send(msg).catch((err) => console.log(err));

  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
