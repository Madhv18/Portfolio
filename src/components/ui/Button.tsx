import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'contact' | 'liveProject';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  href?: string;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
};

export default function Button({ variant = 'primary', href, as, children, className = '', ...props }: ButtonProps) {
  const Component = as || (href ? 'a' : 'button');
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 uppercase tracking-widest text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  let variantStyles = "";
  switch(variant) {
    case 'contact':
      variantStyles = "rounded-full text-white bg-[linear-gradient(123deg,#18011F_7%,#B600A8_37%,#7621B0_72%,#BE4C00_100%)] shadow-[0px_4px_4px_rgba(181,1,167,0.25),4px_4px_12px_#7721B1_inset] outline outline-2 outline-white -outline-offset-[3px] px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base";
      break;
    case 'liveProject':
      variantStyles = "rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[rgba(215,226,234,0.1)] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base";
      break;
    case 'primary':
      variantStyles = "bg-white text-dark-text rounded-full px-6 py-3 hover:bg-opacity-90";
      break;
    default:
      variantStyles = "px-6 py-3 rounded-full border border-transparent hover:bg-white/10";
      break;
  }

  const combinedClassName = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (Component === 'a') {
    return (
      <a href={href} className={combinedClassName} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
