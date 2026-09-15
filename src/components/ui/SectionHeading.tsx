

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({ eyebrow, title, description, align = 'center', className = '' }: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  
  return (
    <div className={`flex flex-col gap-4 ${alignmentClass} ${className}`}>
      {eyebrow && <span className="uppercase tracking-widest text-sm text-light-text opacity-70">{eyebrow}</span>}
      <h2 className={`hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]`}>
        {title}
      </h2>
      {description && (
        <p className="font-light leading-relaxed max-w-2xl opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
          {description}
        </p>
      )}
    </div>
  );
}
