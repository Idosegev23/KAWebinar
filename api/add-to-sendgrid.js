const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, firstName, lastName, phoneNumber } = req.body;

    try {
      const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          list_ids: ['d305b69e-1777-441a-8144-3b2b7d627edb'],
          contacts: [{
            email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add contact to SendGrid list');
      }

      res.status(200).json({ message: 'Contact added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to add contact to SendGrid list' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}