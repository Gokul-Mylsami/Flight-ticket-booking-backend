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

  async sendWelcome() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Welcome to Aves Air",
      html: `<p style="color:#339af0;font-size:3rem">Welcome to AvesAir</p>
    <p style="font-size:2rem">Let's start the Journey , we will fly like the birds 🥳🤣</p>`,
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
