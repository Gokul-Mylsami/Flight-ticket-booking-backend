const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = "Aves Air <" + process.env.EMAIL_USERNAME + ">";
  }
  newTransport() {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendWelcome(name) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Welcome to Aves Air",
      html: `
      <head>
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
      }

      .color-primary {
        color: #fff;
      }

      .navbar {
        background-color: #228be6;
        text-align: center;
        padding: 20px;
      }

      .container {
        width: 80%;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .text {
        font-size: 1.2rem;
        line-height: 1.5;
        margin-top: 20px;
        text-align: center;
      }

      .bg-img {
        opacity: 0.2;
        margin: 0 auto;
      }

      .template {
        position: absolute;
      }

      .small {
        font-size: 0.8rem;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <h1 class="color-primary">Aves Air</h1>
    </nav>
    <section class="container">
      <img src="https://i.ibb.co/ZzSr2CD/logo.png" class="bg-img" alt="" />
      <p class="text template">
        Hi ${name} 🤩 , Welcome to <b> Aves Air </b> , your one-stop solution for
        seamless flight bookings! We are thrilled to have you on board and ready
        to take you on an incredible journey in the skies .
      </p>
    </section>
    <footer>
      <p class="text small">© 2023 Aves Air. All rights reserved.</p>
    </footer>
  </body>`,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendBookingConfirmation(booking) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Aves Air - Booking Confirmation",
      html: `<p style="font-size:2rem;font-weight:bold">Thank you for booking with us.</p>
       <p>Your booking is confirmed.</p>
       <p>ID : ${booking._id}</p>
       <p>Seats : ${booking.seatNumbers.toString()}</p>
       <p>Price : ${booking.price}</p>
       
       <p>Happy Journey 🥳</p>
       `,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendBookingCancellation() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Aves Air - Booking Cancellation",
      html: `<p style="font-size:2rem;font-weight:bold">Successfully Cancelled the Ticket</p>
      <p>Amount Will be Refunded shortly 💥💥</p>
      `,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendFlightCancellation() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Aves Air - Flight Cancellation",
      html: `<p style="font-size:2rem;font-weight:bold">Sorry for the inconvenience</p>
      <p>The Flight are cancelled</p>
      <p>Don't Worry The amount will be Refunded shortly 🙂</p>
      `,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Aves Air - Password Reset",
      html: `<h3>Click on the link to reset your password.</h3>
      <a href=" ${this.url}">Reset Password</a>
      `,
    };
    await this.newTransport().sendMail(mailOptions);
  }
};
