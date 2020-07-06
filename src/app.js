const path = require("path");
// All about express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "newbennytal@gmail.com",
//     clientId:
//       "534672942139-7b3jc811suniui3fci0ri16memfg2f1s.apps.googleusercontent.com",
//     clientSecret: "UafOPCMrT_bYB5m0AHJlqQie",
//     refreshToken:
//       "1//048Ol5CbZOgmsCgYIARAAGAQSNwF-L9Ir0Ndodd0tENeJsKhydQGTqr6jTjLqvmNddah7N8MJd5pDcCXT0BnHWb_cqi50cF08-tg",
//   },
// });

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "newbennytal@gmail.com",
    clientId:
      "534672942139-7b3jc811suniui3fci0ri16memfg2f1s.apps.googleusercontent.com",
    clientSecret: "UafOPCMrT_bYB5m0AHJlqQie",
    refreshToken:
      "1//048Ol5CbZOgmsCgYIARAAGAQSNwF-L9Ir0Ndodd0tENeJsKhydQGTqr6jTjLqvmNddah7N8MJd5pDcCXT0BnHWb_cqi50cF08-tg",
  },
});

const mailOpt = {
  from: "newbennytal@gmail.com",
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
