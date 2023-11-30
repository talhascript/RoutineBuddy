import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);

  const handleResetPassword = async () => {
    try {
      // Send a password reset email to the user's email address
      await sendPasswordResetEmail(auth, email);
      setIsResetEmailSent(true);
      setEmailNotFoundError(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setEmailNotFoundError(true);
      } else {
        alert(`Error sending password reset email: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {isResetEmailSent ? (
        <div>
          <h1 style={{ color: '#4CAF50' }}>Password Reset Email Sent</h1>
          <p>Please check your email to reset your password.</p>
        </div>
      ) : (
        <div>
          <h1 style={{ color: '#2196F3' }}>Forgot Password</h1>
          <p>Enter your email address to reset your password.</p>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ marginRight: '10px', fontSize: '1.2em' }}>Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          {emailNotFoundError && (
            <p style={{ color: 'red' }}>This email is not registered in the system.</p>
          )}
          <button onClick={handleResetPassword} style={{ padding: '10px 20px', fontSize: '1em', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset Password</button>
        </div>
      )}
      <p style={{ marginTop: '20px', fontSize: '1em' }}>
        Remember your password? <Link to="/" style={{ color: '#2196F3' }}>Log in</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
