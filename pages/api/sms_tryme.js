import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { first_name, number } = req.body;

    console.log('Received request body:', { first_name, number });

    if (!first_name || !number) {
      return res.status(400).json({ error: 'First name and number are required' });
    }

    // Calculate the scheduled time (2 minutes from now)
    const scheduledTime = new Date(Date.now() + 2 * 60 * 1000);

    const formData = {
      "users": [
        {
          "name": first_name,
          "phone_number": number,
          "fav_item": "test"
        }
      ],
      "long_url": 'https://cal.com/nonito/30min',
      "campaign_name": 'landing page tester',
      "segment_name": 'landing page tester',
      "sms_text": `Hey {first_name}, Nonito allows you to create links to track every sms touchpoint with your customers. Giving you insights into customer engagement and allowing you to retarget them. Schedule your demo:`,
      "scheduled_time": scheduledTime.toISOString(),
      "sender_id": "192cfdc7-18ba-464d-a0c0-9cdc2848248a",
      "withlink": 'yes'
    };

    console.log('Prepared form data for SMS API:', formData);

    const response = await fetch("https://hi.nonito.xyz/schedule_sms", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    const responseText = await response.text();
    console.log('Response body:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return res.status(500).json({ error: 'Invalid response from SMS API', details: responseText });
    }

    if (!response.ok) {
      console.error('Error response from SMS API:', responseData);
      return res.status(response.status).json({ error: responseData.message || 'Failed to send SMS', details: responseData });
    }

    console.log('SMS scheduled successfully:', responseData);
    return res.status(200).json({ message: 'SMS scheduled successfully', data: responseData });
  } catch (error) {
    console.error('Detailed error in SMS automation:', error);
    return res.status(500).json({ error: 'An unexpected error occurred', details: error.message, stack: error.stack });
  }
}
