import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Form.module.css';
import Nav from "../components/Nav"
import { usePostHog } from 'posthog-js/react'  // Add this import

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

export default function Form() {
  const posthog = usePostHog()  // Add this line
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    sellingMethods: [],
    smsCampaigns: [],
    phoneNumber: '',
  });
  const [otherSellingMethod, setOtherSellingMethod] = useState('');
  const [otherSmsCampaign, setOtherSmsCampaign] = useState('');
  const [isFading, setIsFading] = useState(false);

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
    6: "Thank You"
  };

  useEffect(() => {
    // Track page view with initial step
    posthog?.capture('form_page_view', { 
      initial_step: step,
      step_name: stepNames[step]
    })
  }, [posthog, step])

  const nextStep = () => {
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
      default:
        return {};
    }
  };

  const handleSubmit = async () => {
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
              <p>Expect a call soon!</p>
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
          <div className={styles.progress} style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }}></div>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (step < 5) nextStep();
          else if (step === 5) handleSubmit();
        }}>
          {renderStep()}
          {step < 6 && (
            <button type="submit">{step < 5 ? 'OK' : 'Submit'}</button>
          )}
        </form>
      </div>
    </div>
  );
}