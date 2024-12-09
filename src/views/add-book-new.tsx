'use client';
import React, { useState } from 'react';
import SendBook from 'sections/bookSend';

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};

export default function AddBookNew() {
  const [alert, setAlert] = useState(EMPTY_ALERT);

  const onSuccess = () => {
    setAlert({
      showAlert: true,
      alertMessage: 'The book was added!',
      alertSeverity: 'success'
    });
  };

  const onError = (message: string) => {
    setAlert({
      showAlert: true,
      alertMessage: 'Book not added! Error: ' + message,
      alertSeverity: 'error'
    });
  };

  return (
    <div className="add-book-container">
      {alert.showAlert && (
        <div className={`alert-message ${alert.alertSeverity}`} onClick={() => setAlert(EMPTY_ALERT)}>
          {alert.alertMessage}
          <span className="alert-close">×</span>
        </div>
      )}
      <div className="add-book-content">
        <div className="book-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <h1 className="add-book-title">Add book</h1>
        <div className="add-book-form">
          <SendBook onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </div>
  );
}