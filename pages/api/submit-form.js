import { Resend } from 'resend';

const resend = new Resend('re_PAsX3LYP_6MtW7tJxxm3jw1xRMuqKnSXP');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, businessName, sellingMethods, smsCampaigns, phoneNumber } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Nonito <onboarding@email.nonito.xyz>',
      to: 'm@nonito.xyz',
      subject: 'New lead Submitted',
      html: `
        <h1>New Lead Submitted</h1>
        <p>Name: ${name}</p>
        <p>Business Name: ${businessName}</p>
        <p>Selling Methods: ${sellingMethods.join(', ')}</p>
        <p>SMS Campaigns: ${smsCampaigns.join(', ')}</p>
        <p>Phone Number: ${phoneNumber}</p>
      `
    });

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}