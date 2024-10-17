import React, { useState, useEffect, useRef } from 'react';
import { FaLink, FaSms, FaCopy, FaDownload, FaCheck } from 'react-icons/fa';
import { MdQrCode2 } from 'react-icons/md'; // New QR code icon
import styles from '/styles/LinkMe.module.css';
import { usePostHog } from 'posthog-js/react';

// Custom hook for client-side only code
function useClientSideQR() {
  const [QRCodeStyling, setQRCodeStyling] = useState(null);

  useEffect(() => {
    import('qr-code-styling').then((module) => {
      setQRCodeStyling(() => module.default);
    });
  }, []);

  return QRCodeStyling;
}

const LinkMe = () => {
  const [activeTab, setActiveTab] = useState('sms');
  const [finalLink, setFinalLink] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const QRCodeStyling = useClientSideQR();
  const qrRef = useRef(null);
  const [smsSuccess, setSmsSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const posthog = usePostHog();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    posthog?.capture('tab_switch', { tab: tabId });
  };

  const generateRandomString = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
  };

  const addHttps = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTrackingLink('');
    setQrCodeImage('');

    posthog?.capture('link_submit', { tab: activeTab, finalLink });

    const formData = {
      link_name: generateRandomString(),
      final_link: addHttps(finalLink),
      sender_id: '192cfdc7-18ba-464d-a0c0-9cdc2848248a',
      split: false,
      android_link: "",
      ios_link: "",
      utm_tracking: false,
      utm_medium: "",
      utm_source: "",
      utm_campaign: "",
      wildcard: "",
      custom_backhalf: "",
      domain: "ni2.co"
    };

    try {
      const response = await fetch('https://hi.nonito.xyz/create_tracking_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create tracking link');
      }

      const data = await response.json();
      setTrackingLink(data.tracking_link);

      if (activeTab === 'qr-code' && QRCodeStyling) {
        generateQRCode(data.tracking_link);
      }
    } catch (err) {
      setError('An error occurred while creating the tracking link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateQRCode = (link) => {
    if (QRCodeStyling && qrRef.current) {
      const qrCode = new QRCodeStyling({
        width: 330,
        height: 330,
        type: 'svg',
        data: link,
        image: '',
        margin: 10,
        qrOptions: {
          errorCorrectionLevel: 'H'
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
        dotsOptions: {
          color: '#0147eb',
          type: 'dots'
        },
        backgroundOptions: {
          color: '#fffef2',
        },
        cornersSquareOptions: {
          color: '#081f5c',
          type: 'dot'
        },
        cornersDotOptions: {
          color: '#0147eb',
          type: 'dot'
        },
      });

      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
      setQrCode(qrCode);
    }
  };

  useEffect(() => {
    if (trackingLink && activeTab === 'qr-code' && QRCodeStyling) {
      generateQRCode(trackingLink);
    }
  }, [trackingLink, activeTab, QRCodeStyling]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingLink);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
      posthog?.capture('link_copied', { trackingLink });
    } catch (err) {
      setCopySuccess('Failed to copy');
      posthog?.capture('link_copy_failed', { error: err.message });
    }
  };

  const handleDownload = () => {
    if (qrCode) {
      qrCode.download({ name: 'qr-code', extension: 'svg' });
      posthog?.capture('qr_code_downloaded');
    }
  };

  const handleSmsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSmsSuccess(false);

    posthog?.capture('sms_submit', { firstName, phoneNumber });

    // Validate phone number
    const phoneRegex = /^201\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid Egyptian phone number starting with 201');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/sms_tryme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, number: phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send SMS');
      }

      console.log('SMS sent successfully:', data);
      setSmsSuccess(true);
    } catch (err) {
      console.error('Error sending SMS:', err);
      setError(`Error sending SMS: ${err.message}`);
      if (err.details) {
        console.error('Error details:', err.details);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.linkMeSection}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.subheading}>Try Now<br></br>No Credit Card Required</h2>
          <h3 className={styles.heading}>Great Connections Start <br />with an SMS, Click or a Scan</h3>
        </div>
        
        <div className={styles.content}>
          <ul className={styles.tabs} role="tablist">
            <li className={styles.tabItem} role="presentation">
              <button
                id="tab-sms"
                className={`${styles.tabButton} ${activeTab === 'sms' ? styles.active : ''}`}
                role="tab"
                onClick={() => handleTabClick('sms')}
              >
                <FaSms size={45} />
                <span>Try SMS</span>
              </button>
            </li>
            <li className={styles.tabItem} role="presentation">
              <button
                id="tab-tracking-link"
                className={`${styles.tabButton} ${activeTab === 'tracking-link' ? styles.active : ''}`}
                role="tab"
                onClick={() => handleTabClick('tracking-link')}
              >
                <FaLink size={45} />
                <span>Tracking Link</span>
              </button>
            </li>
            <li className={styles.tabItem} role="presentation">
              <button
                id="tab-qr-code"
                className={`${styles.tabButton} ${activeTab === 'qr-code' ? styles.active : ''}`}
                role="tab"
                onClick={() => handleTabClick('qr-code')}
              >
                <MdQrCode2 size={45} /> {/* Updated QR code icon */}
                <span>QR Code</span>
              </button>
            </li>
          </ul>
          
          <div className={styles.tabContent}>
            {/* Tracking Link Tab Content */}
            {activeTab === 'tracking-link' && (
              <div id="panel-tracking-link" className={styles.tabPanel} role="tabpanel">
                {!trackingLink ? (
                  <>
                    <h4>Create a Tracking Link</h4>
                    <p>Enter your long URL to generate a tracking link.</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                      <label htmlFor="tracking-url">Enter your long URL</label>
                      <input 
                        type="url" 
                        id="tracking-url" 
                        placeholder="https://example.com/my-long-url" 
                        value={finalLink}
                        onChange={(e) => setFinalLink(e.target.value)}
                        required
                      />
                      <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Free Tracking Link'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={styles.result}>
                    <h4>Your Tracking Link is Ready!</h4>
                    <p>Here's your generated tracking link:</p>
                    <div className={styles.linkContainer}>
                      <a href={trackingLink} target="_blank" rel="noopener noreferrer">{trackingLink}</a>
                      <button onClick={handleCopy} className={styles.copyButton}>
                        <FaCopy /> {copySuccess || 'Copy'}
                      </button>
                    </div>
                    <p className={styles.note}>
                      This link expires in <strong>30 minutes</strong>.
                    </p>
                    <a href="https://mini.nonito.xyz/signup" className={styles.ctaButton} onClick={() => posthog?.capture('tracking_link_cta_click')}>
                      Create a free account
                    </a>
                    <p className={styles.ctaText}>
                      Sign up to create and track unlimited links!
                    </p>
                  </div>
                )}
                {error && <p className={styles.error}>{error}</p>}
              </div>
            )}
            
            {/* QR Code Tab Content */}
            {activeTab === 'qr-code' && (
              <div id="panel-qr-code" className={styles.tabPanel} role="tabpanel">
                {!trackingLink ? (
                  <>
                    <h4>Create a QR Code</h4>
                    <p>Enter a URL to generate a QR code.</p>
                    <form className={styles.form} onSubmit={handleSubmit}>
                      <label htmlFor="qr-content">Enter URL for QR code</label>
                      <input 
                        type="url" 
                        id="qr-content" 
                        placeholder="https://example.com" 
                        value={finalLink}
                        onChange={(e) => setFinalLink(e.target.value)}
                        required
                      />
                      <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Free QR Code'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={styles.result}>
                    <h4>Your QR Code is Ready!</h4>
                    <div className={styles.qrCodePreview}>
                      <div ref={qrRef} className={styles.qrCodeContainer}></div>
                    </div>
                    <button onClick={handleDownload} className={styles.downloadButton}>
                      <FaDownload /> Download QR Code
                    </button>
                    <p className={styles.note}>
                      This QR code expires in <strong>30 minutes</strong>.
                    </p>
                    <a href="https://mini.nonito.xyz/signup" className={styles.ctaButton} onClick={() => posthog?.capture('qr_code_cta_click')}>
                      Create a free account
                    </a>
                    <p className={styles.ctaText}>
                      Sign up to create and track unlimited QR codes!
                    </p>
                  </div>
                )}
                {error && <p className={styles.error}>{error}</p>}
              </div>
            )}
            
            {/* SMS Tab Content */}
            {activeTab === 'sms' && (
              <div id="panel-sms" className={styles.tabPanel} role="tabpanel">
                {!smsSuccess ? (
                  <>
                    <h4>Try Our SMS Service</h4>
                    <p>Enter your name and phone number to receive a demo SMS.</p>
                    <form className={styles.form} onSubmit={handleSmsSubmit}>
                      <label htmlFor="first-name">First Name</label>
                      <input 
                        type="text" 
                        id="first-name" 
                        placeholder="Amgad" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                      <label htmlFor="phone-number">Phone Number (Egyptian)</label>
                      <input 
                        type="tel" 
                        id="phone-number" 
                        placeholder="201xxxxxxxxx" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send SMS'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={styles.result}>
                    <h4>SMS Sent Successfully!</h4>
                    <p className={styles.successMessage}>
                    You will receive an SMS shortly.
                    </p>
                    <p className={styles.note}>
                      The SMS will arrive within <strong>2 minutes</strong>.
                    </p>
                    <a href="https://cal.com/nonito/30min" className={styles.ctaButton} onClick={() => posthog?.capture('sms_cta_click')}>
                      Schedule a Demo
                    </a>
                    <p className={styles.ctaText}>
                      Schedule a demo to learn more.
                    </p>
                  </div>
                )}
                {error && <p className={styles.error}>{error}</p>}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          <h5>Sign up Now. Free Plan includes:</h5>
          <ul className={styles.featureList}>
            <li><FaCheck className={styles.checkIcon} /> Unlimited Tracking Links</li>
            <li><FaCheck className={styles.checkIcon} /> Unlimited Custom QR Codes</li>
            <li><FaCheck className={styles.checkIcon} /> Advanced Analytics</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LinkMe;
