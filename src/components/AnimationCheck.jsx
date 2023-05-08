import React, { useState, useEffect } from 'react';

function AnimatedCheck({ success, loading }) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
        <div className={`w-20 h-20 rounded-full border-2 border-solid ${success ? ' border-green-500':' border-primary' } flex justify-center items-center`}>
            <svg className={`h-10 w-10 ${success ? ' text-green-500':' text-primary' } `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {success ? (
                <path fill="none" stroke="currentColor" strokeWidth="4" d="M6,12 10,16 18,8" />
                ) : (
                    <path fill="none" stroke="currentColor" strokeWidth="4" d="M5,5 19,19 M19,5 5,19" />
                    )}
            </svg>
        </div>
        <h3 className={ ` font-bold text-2xl ${success ? 'text-green-500':'text-primary'}` }>{ success ? 'Success':'failed'}</h3>
    </div>
  );
}

export default AnimatedCheck;
