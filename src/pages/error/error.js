import React from 'react'
import './styles.css';


function ErrorScreen() {
  return (
    <>
        <div className="error-container">
            <img src="/images/no-results.png" alt="Error Image" />
            <h3>Sorry! Page Not Found</h3>
            <p>The requested URL is not found. Please try again.</p>
        </div>
    </>
  )
}

export default ErrorScreen