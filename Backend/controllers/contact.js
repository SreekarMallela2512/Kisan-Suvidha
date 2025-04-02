const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });

  } catch (err) {
    next(err);
  }
};