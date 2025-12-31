import * as React from 'react';

interface ForgotPasswordEmailTemplateProps {
  name: string;
  url: string;
}

export const ForgotPasswordEmail: React.FC<Readonly<ForgotPasswordEmailTemplateProps>> = ({
  name,
  url,
}) => (
  <div
    style={{
      width: '100%',
      maxWidth: '600px',
      margin: '20px auto',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}
  >
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
      Hello {name},
    </h1>

    <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '20px' }}>
      We received a request to reset your password. Please click the button below to reset your password. This link is valid for 1 hour.
    </p>

    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <a
        href={url}
        style={{
          backgroundColor: '#4caf50',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          display: 'inline-block',
        }}
      >
        Reset Password
      </a>
    </div>

    <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '30px' }}>
      If you did not request this password reset, please ignore this email.
    </p>

    <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '10px' }}>
      Thank you!
    </p>

    <div
      style={{
        fontSize: '14px',
        color: '#888',
        textAlign: 'center',
        marginTop: '30px',
      }}
    >
      <p>Sincerely, Yeasin Riyad.</p>
    </div>
  </div>
);
