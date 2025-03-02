const nodemailer = require("nodemailer");
require('dotenv').config()



const APP_EMAIL = process.env.APP_EMAIL
const APP_PASSWORD = process.env.APP_MAIL_PASSWORD






const SendMail = async (string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: true,
    auth: {
      // TODO: replace `user` with your gmail and password with `google app password`>
      user: APP_EMAIL,
      pass: APP_PASSWORD
    }
  });

  const mail = await transporter.sendMail({
    from: string.from,
    to: string.to,
    subject: string.subject,
    html: string.message
  }).catch(e => console.log(e))
  console.log('Message sent: ' + mail.messageId)
}

//qtal qqoj mvaw uxmt




  module.exports = {
    SendMail
  }

