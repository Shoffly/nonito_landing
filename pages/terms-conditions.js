import Head from 'next/head';
import Nav from "../components/Nav";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Nonito</title>
        <meta name="description" content="Nonito Terms and Conditions, Privacy Policy, and Refund Policy" />
      </Head>
      <Nav />
      <div className="terms-container">
        
        <section className="terms-section">
          <h1>Terms and Conditions</h1>
          
          <h2>1. Introduction</h2>
          <p>Welcome to Nonito. By using our platform, you agree to these Terms and Conditions. Please read them carefully.</p>

          <h2>2. Services Provided</h2>
          <p>Nonito is a growth marketing SMS service that enables businesses to create, send, and automate SMS campaigns.</p>

          <h2>3. User Responsibilities</h2>
          <p>You agree to use Nonito only for lawful purposes.</p>
          <p>You are responsible for maintaining the confidentiality of your account information.</p>
          <p>You agree not to spam, harass, or mislead recipients.</p>

          <h2>4. Payment and Billing</h2>
          <p>Nonito offers multiple subscription tiers: Just Links, Mini, and Mega. By subscribing, you agree to our billing and payment policies.</p>
          <p>All payments are final unless specified in the Refund Policy.</p>

          <h2>5. Account Suspension or Termination</h2>
          <p>Nonito reserves the right to suspend or terminate accounts for violating these terms or engaging in prohibited activities.</p>

          <h2>6. Liability Limitations</h2>
          <p>Nonito is not responsible for any direct or indirect damages resulting from your use of our service.</p>

          <h2>7. Modifications to Terms</h2>
          <p>Nonito reserves the right to modify these Terms at any time. Continued use of the platform constitutes acceptance of the revised Terms.</p>

          <h2>8. Contact Information</h2>
          <p>If you have questions about these Terms, please contact us at [insert contact email].</p>
        </section>

        <section className="terms-section">
          <h1>Refund Policy</h1>
          
          <h2>1. Subscription Fees</h2>
          <p>All subscription fees for Nonito's services are non-refundable, except where required by law or specified below.</p>

          <h2>2. Refund Eligibility</h2>
          <p>Refunds may be issued if there is a verifiable technical error on Nonito's end that prevented access to the service during the subscription period. Please contact us within [X days] of the billing date to request a refund.</p>

          <h2>3. Cancellation</h2>
          <p>You may cancel your subscription at any time, but you will not receive a prorated refund for the unused portion of your subscription.</p>

          <h2>4. Contact Us</h2>
          <p>For refund inquiries, please reach out at [insert contact email].</p>
        </section>

        <section className="terms-section">
          <h1>Privacy Policy</h1>
          <p className="date">Effective Date: [Insert date]</p>

          <h2>1. Information We Collect</h2>
          <p>Nonito collects information you provide, such as account details and campaign data, as well as automatic information like usage statistics.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Nonito uses this information to provide, improve, and personalize our services, send transactional messages, and fulfill legal obligations.</p>

          <h2>3. Sharing of Information</h2>
          <p>We do not share your information with third parties except for service providers and partners who assist in operating Nonito and with legal authorities as required.</p>

          <h2>4. Data Security</h2>
          <p>We prioritize data security and use industry-standard measures to protect your information. However, we cannot guarantee complete security.</p>

          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have rights to access, correct, or delete your information. Please contact us at [insert contact email] to make a request.</p>

          <h2>6. Updates to Privacy Policy</h2>
          <p>Nonito may update this Privacy Policy. Changes will be effective immediately upon posting on our website.</p>

          <h2>7. Contact Information</h2>
          <p>If you have questions about this Privacy Policy, please contact us at [insert contact email].</p>
        </section>

        <section className="terms-section">
          <h1>About Us</h1>
          <h2>About Nonito</h2>
          <p>Nonito is a growth-focused SMS marketing platform designed to help businesses engage their customers in a personalized, automated, and data-driven way. Our mission is to empower brands to build lasting connections through innovative SMS campaigns that drive growth and customer loyalty. Whether you're a small business or a large enterprise, Nonito provides flexible tools to design, automate, and track your SMS marketing efforts with ease.</p>
        </section>
      </div>

      <style jsx>{`
        .terms-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }

        .terms-section {
          margin-bottom: 60px;
        }

        h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 24px;
          color: #444;
          margin: 30px 0 15px;
        }

        p {
          margin-bottom: 15px;
          color: #666;
        }

        .date {
          color: #888;
          font-style: italic;
        }
      `}</style>
    </>
  );
}
