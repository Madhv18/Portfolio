import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`w-full max-w-[1920px] mx-auto overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
}
