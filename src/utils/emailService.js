import emailjs from '@emailjs/browser';

// EmailJS configuration using environment variables or defaults
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  USER_ID: import.meta.env.VITE_EMAILJS_USER_ID || ''
};

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.USER_ID) {
    emailjs.init(EMAILJS_CONFIG.USER_ID);
  } else {
    console.warn('EmailJS not configured. Skipping initialization.');
  }
};

// Send email notification using EmailJS
export const sendEmailNotification = async (messageData) => {
  // Check if EmailJS is properly configured
  if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.USER_ID) {
    console.warn('EmailJS not configured. Skipping email notification.');
    return { success: false, message: 'EmailJS not configured' };
  }

  try {
    const templateParams = {
      to_email: 'your-email@gmail.com', // Replace with your email
      from_name: messageData.name,
      from_email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      date: new Date().toLocaleString(),
      reply_to: messageData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.USER_ID
    );

    console.log('Email sent successfully:', response);
    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
};

// Alternative: Using fetch to your own email endpoint (if you have one)
export const sendEmailWithCustomEndpoint = async (messageData) => {
  try {
    const emailData = {
      to_email: 'your-email@gmail.com', // Replace with your email
      from_name: messageData.name,
      from_email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      reply_to: messageData.email
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
};
