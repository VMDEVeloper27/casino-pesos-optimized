#!/usr/bin/env node

const nodemailer = require('nodemailer');
const fs = require('fs');

// Get email data file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.log(JSON.stringify({
    success: false,
    error: 'No file path provided'
  }));
  process.exit(1);
}

// Read email data from file
let emailData;
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  emailData = JSON.parse(fileContent);
} catch (error) {
  console.log(JSON.stringify({
    success: false,
    error: 'Failed to read email data: ' + error.message
  }));
  process.exit(1);
}

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