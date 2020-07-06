const path = require("path");
// All about express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     xoauth2: xoauth2.createXOAuth2Generator({
//       user: "newbennytal@gmail.com",
//       clientId: "",
//       clientSecret: "",
//       refreshToken: "",
//     }),
//   },
// });
const mailOpt = {
  from: "bennytal@gmail.com",
  to: "newbennytal@gmail.com",
  subject: "Test Nodemailer",
  text: "This is plain text",
};
// const sgMail = require("@sendgrid/mail");
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
  console.log(process.env.NODEMAILER_USER);
  console.log(process.env.NODEMAILER_PASS);
  // sgMail.setApiKey(
  //   "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"
  // );
  // const msg = {
  //   to: "newbennytal@gmail.com",
  //   from: "newbennytal@gmail.com",
  //   subject: "Sending with Twilio SendGrid is Fun",
  //   text: "Email from a costumer",
  //   html: `<strong>Name: ${req.body.name} <br /> <strong>Email: ${req.body.email}</strong> <br/> <strong>Msg: ${req.body.msg}</strong></strong>`,
  // };
  // sgMail.send(msg).catch((err) => console.log(err));
  transporter.sendMail(mailOpt, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email was sent nodemailer");
    }
  });

  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
