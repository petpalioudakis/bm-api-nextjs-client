import React from 'react';

function ContentWrapper({
  children,
  extraClasses = '',
  narrow = false,
}: {
  children: React.ReactNode;
  extraClasses?: string;
  narrow?: boolean;
}) {
  return (
    <div className={`mt-16 rounded p-3 ${extraClasses}`}>
      <div className={`${narrow ? 'max-w-sm md:max-w-xl mx-auto' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;
