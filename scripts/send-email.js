#!/usr/bin/env node

const nodemailer = require('nodemailer');

// Get email data from command line arguments
const emailData = JSON.parse(process.argv[2]);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'albertokiddi1992@gmail.com',
    pass: 'hhzqolhuickhpqxo',
  },
});

async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: 'CasinosPesos <albertokiddi1992@gmail.com>',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      replyTo: emailData.replyTo || 'albertokiddi1992@gmail.com',
    });
    
    console.log(JSON.stringify({
      success: true,
      messageId: info.messageId,
      accepted: info.accepted
    }));
  } catch (error) {
    console.log(JSON.stringify({
      success: false,
      error: error.message
    }));
    process.exit(1);
  }
}

sendEmail();