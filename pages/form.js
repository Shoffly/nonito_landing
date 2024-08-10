import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Form.module.css';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

export default function Form() {
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

  const handleSubmit = async () => {
    try {
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

      console.log('Form submitted successfully:', data);
      // Handle successful submission (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  };

  const nextStep = () => setStep(prev => prev + 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <h2 className={styles.question} >Hello, what's your name?</h2>
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
            <h2 className={styles.question} >What do you use for SMS campaigns?</h2>
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
            <h2 className={styles.question} >Please provide your number</h2>
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
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${(step / 5) * 100}%` }}></div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (step < 5) nextStep();
        else handleSubmit();
      }}>
        {renderStep()}
        <button type="submit">{step < 5 ? 'OK' : 'Submit'}</button>
      </form>
    </div>
  );
}