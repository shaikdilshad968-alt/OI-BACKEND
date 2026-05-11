const express = require('express');
const router = express.Router();
const ContactLead = require('../models/ContactLead');

// POST: Submit a new contact lead
router.post('/', async (req, res, next) => {
  try {
    const { name, email, company, phone, message } = req.body;
    
    const newLead = new ContactLead({
      name,
      email,
      company,
      phone,
      message
    });

    await newLead.save();

    // Here you could also trigger an email notification
    // using nodemailer or a service like SendGrid/Resend

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you shortly.',
      data: newLead
    });
  } catch (error) {
    next(error);
  }
});

// GET: Retrieve all contact leads (Admin only ideally)
router.get('/', async (req, res, next) => {
  try {
    const leads = await ContactLead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
