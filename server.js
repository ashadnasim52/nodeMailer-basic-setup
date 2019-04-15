const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.set("view engine", ejs);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  console.log(req.body);
  const toSend = `You had been looged in by user name ${name} and email ${password} all good`;


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: toSend // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..


});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(8800, () => {
  console.log("server is running at 8000");
});