import styles from "../styles/jinteractive.module.css";
import Image from 'next/image';
import { useState } from 'react';

export default function Jint() {
  const [steps, setSteps] = useState([]);
  const [isJourneyCreated, setIsJourneyCreated] = useState(false);

  const branches = [
    "All Branches", 
    "Hyper One",  
    "Mohandiseen", "Yara"
  ];

  const addStep = () => {
    if (steps.length < 2) {
      const newStep = {
        triggerType: '',
        triggerValue: '',
        actionType: '',
        actionValue: '',
        delayInterval: 0,
        title: '',
        content: '',
        isExpanded: true
      };
      setSteps([...steps, newStep]);
    }
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const toggleStep = (index) => {
    const newSteps = [...steps];
    newSteps[index].isExpanded = !newSteps[index].isExpanded;
    setSteps(newSteps);
  };

  const handleCreate = () => {
    setIsJourneyCreated(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {isJourneyCreated ? (
          <div className={styles.successMessage}>
            Journey created successfully!
          </div>
        ) : (
          <>
            <button className={styles.sbutton} onClick={addStep}>Add Step</button>
            {steps.map((step, index) => (
              <div key={index} className={styles.section}>
                <h2 className={styles.stepHeader} onClick={() => toggleStep(index)}>
                  Step {index + 1}
                  <span className={styles.arrow}>
                    {step.isExpanded ? '▼' : '►'}
                  </span>
                </h2>
                <div
                  className={`${styles.stepContent} ${step.isExpanded ? styles.expanded : styles.collapsed}`}
                >
                  <select
                    className={styles.select}
                    value={step.triggerType}
                    onChange={(e) => handleStepChange(index, 'triggerType', e.target.value)}
                  >
                    <option value="">Select Trigger</option>
                    <option value="send_to_user_ids">Specific User IDs</option>
                    <option value="max_orders">Maximum # of orders placed</option>
                    <option value="top_branch">Top Branch</option>
                    <option value="days_since_last_order">Days Since Last Order</option>
                    <option value="min_order_value">Minimum Order Value</option>
                  </select>
                  {step.triggerType === 'top_branch' ? (
                    <select
                      className={styles.select}
                      value={step.triggerValue}
                      onChange={(e) => handleStepChange(index, 'triggerValue', e.target.value)}
                    >
                      {branches.map((branch, idx) => (
                        <option key={idx} value={branch}>{branch}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Trigger Value"
                      value={step.triggerValue}
                      onChange={(e) => handleStepChange(index, 'triggerValue', e.target.value)}
                    />
                  )}
                  <select
                    className={styles.select}
                    value={step.actionType}
                    onChange={(e) => handleStepChange(index, 'actionType', e.target.value)}
                  >
                    <option value="">Select Action</option>
                    <option value="send_notification">Send Notification</option>
                    <option value="send_sms">Send SMS (N/A)</option>
                  </select>
                  {step.actionType === 'send_notification' && (
                    <div>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="Notification Title"
                        value={step.title}
                        onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      />
                      <textarea
                        className={styles.input}
                        placeholder="Notification Content"
                        value={step.content}
                        onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                      />
                    </div>
                  )}
                  <button className={styles.dbutton} onClick={() => removeStep(index)}>Remove Step</button>
                </div>
              </div>
            ))}
            <button className={styles.button} onClick={handleCreate}>Create</button>
          </>
        )}
      </div>
    </div>
  )
}
