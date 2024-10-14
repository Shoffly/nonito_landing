import { Resend } from 'resend';
import { render } from '@react-email/render';
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

const resend = new Resend('re_PAsX3LYP_6MtW7tJxxm3jw1xRMuqKnSXP');

const WelcomeEmail = ({ email }) => (
  <Html>
    <Head />
    <Preview>Welcome to Nonito - Next Steps</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerImageContainer}>
          <Img
            src="https://utfs.io/f/O4yPUD0urLd3MHa9lwP8jZc2A3UMoOrBsXnRhaN4SKvuIxF5"
            width="580"
            height="auto"
            alt="Nonito"
            style={headerImage}
          />
        </Section>
        <Heading style={h1}>Welcome to Nonito!</Heading>
        <Text style={text}>
          Thank you for your interest in Nonito. We&apos;re excited to help you grow your business!
        </Text>
        <Text style={text}>To get started, you have two options:</Text>

        <Section style={buttonContainer}>
          <Button pX={20} pY={12} style={button} href="https://mini.nonito.xyz/signup">
            Sign Up Now
          </Button>
        </Section>
        <Text style={text}>or</Text>
        <Section style={buttonContainer}>
          <Button pX={20} pY={12} style={button} href="https://cal.com/nonito/30min">
            Schedule a Demo
          </Button>
        </Section>

        <Text style={text}>
          By scheduling a demo, you&apos;ll get your free .link SMS integration and access to Nonito forms.
        </Text>

        <Section>
          <Text style={footerText}>
            If you have any questions, feel free to <Link href="mailto:m@nonito.xyz" style={link}>contact our support team</Link>.
          </Text>
        </Section>

        <Section>
          <Text style={footerText}>
            ©2023 Nonito. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#333',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%',
  backgroundColor: '#ffffff',
};

const headerImageContainer = {
  marginBottom: '32px',
};

const headerImage = {
  borderRadius: '8px',
  width: '100%',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '1.5',
  textAlign: 'center',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
  paddingLeft: '30px',
  paddingRight: '30px',
};

const buttonContainer = {
  textAlign: 'center',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#4caf50',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 20px',
};

const footerText = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  marginTop: '20px',
};

const link = {
  color: '#4caf50',
  textDecoration: 'underline',
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      console.log('Attempting to send email to:', email);

      const { data, error } = await resend.emails.send({
        from: 'Nonito <onboarding@email.nonito.xyz>',
        to: [email],
        subject: 'Welcome to Nonito - Next Steps',
        react: WelcomeEmail({ email }),
      });

      if (error) {
        console.error('Resend API error:', error);
        return res.status(400).json({ error: error.message });
      }

      console.log('Email sent successfully');
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
