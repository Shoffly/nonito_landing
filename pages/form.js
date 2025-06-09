import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Form.module.css';
import Nav from "../components/Nav"
import { usePostHog } from 'posthog-js/react'

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

export default function Form() {
  const posthog = usePostHog()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    sellingMethods: [],
    smsCampaigns: [],
    phoneNumber: '',
    address: '',
    city: '',
    paymentMethod: '',
  });
  const [otherSellingMethod, setOtherSellingMethod] = useState('');
  const [otherSmsCampaign, setOtherSmsCampaign] = useState('');
  const [isFading, setIsFading] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const stepNames = {
    1: "Name",
    2: "Business Name",
    3: "Selling Methods",
    4: "SMS Provider",
    5: "Phone Number",
    6: "Thank You",
    7: "Checkout",
    8: "Address & Payment",
    9: "Success"
  };

  useEffect(() => {
    // Track page view with initial step
    posthog?.capture('form_page_view', { 
      initial_step: step,
      step_name: stepNames[step]
    })
  }, [posthog, step, stepNames])

  useEffect(() => {
    validateStep();
  }, [formData, step]);

  const validateStep = () => {
    switch(step) {
      case 1:
        setIsStepValid(formData.name.trim() !== '');
        break;
      case 2:
        setIsStepValid(formData.businessName.trim() !== '');
        break;
      case 3:
        setIsStepValid(formData.sellingMethods.length > 0);
        break;
      case 4:
        setIsStepValid(formData.smsCampaigns.length > 0);
        break;
      case 5:
        setIsStepValid(formData.phoneNumber.trim() !== '');
        break;
      case 6:
        setIsStepValid(true); // Thank you page - always valid
        break;
      case 7:
        setIsStepValid(true); // Checkout page - always valid
        break;
      case 8:
        setIsStepValid(
          formData.address.trim() !== '' && 
          formData.city.trim() !== '' && 
          formData.paymentMethod !== ''
        );
        break;
      default:
        setIsStepValid(true);
    }
  };

  const nextStep = () => {
    if (!isStepValid) return;

    setIsFading(true);
    setTimeout(() => {
      const currentStep = step;
      const newStep = currentStep + 1;
      setStep(newStep);
      setIsFading(false);
      // Track step change with more details
      posthog?.capture('form_step_changed', { 
        from_step: currentStep, 
        to_step: newStep,
        from_step_name: stepNames[currentStep],
        to_step_name: stepNames[newStep],
        step_data: getStepData(currentStep)
      })
    }, 500);
  };

  const getStepData = (stepNumber) => {
    switch(stepNumber) {
      case 1:
        return { name: formData.name };
      case 2:
        return { business_name: formData.businessName };
      case 3:
        return { selling_methods: formData.sellingMethods };
      case 4:
        return { sms_campaigns: formData.smsCampaigns };
      case 5:
        return { phone_number: formData.phoneNumber };
      case 6:
        return { step: 'thank_you' };
      case 7:
        return { step: 'checkout' };
      case 8:
        return { 
          address: formData.address,
          city: formData.city,
          payment_method: formData.paymentMethod
        };
      default:
        return {};
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid) return;

    setIsSubmitting(true);

    try {
      // First, submit to Supabase
      const { data, error } = await supabase
        .from('form_responses')
        .insert([{
          name: formData.name,
          business_name: formData.businessName,
          selling_methods: formData.sellingMethods,
          sms_campaigns: formData.smsCampaigns,
          phone_number: formData.phoneNumber
        }]);

      if (error) throw error;

      console.log('Form submitted successfully to Supabase:', data);

      // Then, send email via API route
      const emailResponse = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully');

      // Track form submission with all data
      posthog?.capture('form_submitted', {
        ...formData,
        total_steps: step,
        step_names: Object.values(stepNames).slice(0, step)
      });

      nextStep(); // Move to the success page
    } catch (error) {
      console.error('Error submitting form:', error);
      // Track form submission error
      posthog?.capture('form_submission_error', { 
        error: error.message,
        step: step,
        step_name: stepNames[step],
        form_data: formData
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const content = (() => {
      switch(step) {
        case 1:
          return (
            <>
              <h2 className={styles.question}>Hello, what&#x2019;s your name?</h2>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Type your answer here.."
              />
            </>
          );
        case 2:
          return (
            <>
              <h2>Nice to meet you, {formData.name}. What is the name of your business?</h2>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                placeholder="Type your answer here.."
              />
            </>
          );
        case 3:
          return (
            <>
              <h2 className={styles.question}>How do you sell to your customers?</h2>
              <p>Choose as many as you like</p>
              <div className={styles.checkboxContainer}>
                {['Talabat, el menus etc', 'Physical location', 'Online Store', 'Other'].map((method) => (
                  <label key={method} className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={formData.sellingMethods.includes(method)}
                      onChange={() => handleCheckboxChange('sellingMethods', method)}
                    />
                    <span></span>
                    {method}
                  </label>
                ))}
              </div>
              {formData.sellingMethods.includes('Other') && (
                <input
                  type="text"
                  value={otherSellingMethod}
                  onChange={(e) => setOtherSellingMethod(e.target.value)}
                  placeholder="Specify other selling method"
                />
              )}
            </>
          );
        case 4:
          return (
            <>
              <h2 className={styles.question}>What do you use for SMS campaigns?</h2>
              <div className={styles.checkboxContainer}>
                {['Victory Link', 'SMS Misr', 'I dont send SMS campaigns', 'Other'].map((campaign) => (
                  <label key={campaign} className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={formData.smsCampaigns.includes(campaign)}
                      onChange={() => handleCheckboxChange('smsCampaigns', campaign)}
                    />
                    <span></span>
                    {campaign}
                  </label>
                ))}
              </div>
              {formData.smsCampaigns.includes('Other') && (
                <input
                  type="text"
                  value={otherSmsCampaign}
                  onChange={(e) => setOtherSmsCampaign(e.target.value)}
                  placeholder="Specify other SMS campaign method"
                />
              )}
            </>
          );
        case 5:
          return (
            <>
              <h2 className={styles.question}>Please provide your number</h2>
              <p>Will be used to follow up on your request</p>
              <div className={styles.countrySelector}>
                <select>
                  <option value="+20">🇪🇬 +20</option>
                  {/* Add other country options as needed */}
                </select>
                <input
                  className={styles.phoneInput}
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                  placeholder="010 01234567"
                />
              </div>
            </>
          );
        case 6:
          return (
            <div className={styles.successMessage}>
              <h2>Thank you {formData.name}!</h2>
              <p>We're excited to help your business grow with Nonito!</p>
              <p>Ready to get started with your Nonito Package?</p>
            </div>
          );
        case 7:
          return (
            <div className={styles.checkoutSection}>
              <h2 className={styles.question}>Checkout</h2>
              <div className={styles.packageCard}>
                <h3>📦 Nonito Package</h3>
                <p>Complete SMS marketing solution for your business</p>
                <div className={styles.packageFeatures}>
                  <div>✅ Advanced SMS campaigns</div>
                  <div>✅ Customer segmentation</div>
                  <div>✅ Analytics & reporting</div>
                  <div>✅ 24/7 support</div>
                </div>
                <div className={styles.packagePrice}>Custom pricing based on your needs</div>
              </div>
            </div>
          );
        case 8:
          return (
            <>
              <h2 className={styles.question}>Shipping & Payment Details</h2>
              <div className={styles.addressSection}>
                <h3>Shipping Address</h3>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Street address"
                />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className={styles.paymentSection}>
                <h3>Payment Method</h3>
                <div className={styles.checkboxContainer}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === "Cash on Delivery"}
                      onChange={(e) => updateFormData('paymentMethod', e.target.value)}
                    />
                    <span></span>
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </>
          );
        case 9:
          return (
            <div className={styles.finalSuccessMessage}>
              <div className={styles.successIcon}>🎉</div>
              <h2>Order Confirmed!</h2>
              <p>Thank you for choosing Nonito Package, {formData.name}!</p>
              <div className={styles.contactInfo}>
                <p><strong>What happens next?</strong></p>
                <p>✅ We'll contact you within 24 hours</p>
                <p>✅ Our team will discuss your specific needs</p>
                <p>✅ We'll set up your Nonito Package</p>
                <p>✅ You'll receive onboarding support</p>
              </div>
              <p className={styles.contactNote}>
                <strong>Questions?</strong> We'll be in touch soon to finalize everything!
              </p>
            </div>
          );
        default:
          return null;
      }
    })();

    return (
      <div className={`${styles.formContent} ${isFading ? styles['fade-out'] : ''}`}>
        {content}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.formContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${(Math.min(step, 8) / 8) * 100}%` }}></div>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (step < 8) nextStep();
          else if (step === 8) handleSubmit();
        }}>
          {renderStep()}
          {step < 9 && (
            <button type="submit" disabled={!isStepValid || isSubmitting}>
              {isSubmitting ? <div className={styles.spinner}></div> : 
                step < 5 ? 'OK' : 
                step === 5 ? 'Continue' :
                step === 6 ? 'Proceed to Checkout' :
                step === 7 ? 'Continue' :
                'Complete Order'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
