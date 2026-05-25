import { Check } from 'lucide-react';

const ITEMS = [
  'Manufactured in Ajman, UAE',
  'ASHRAE-Aligned Performance',
  '500+ Projects Delivered',
  '1-Year Manufacturer Warranty',
  'UAE & GCC Coverage',
  'Premium Aluminum',
  'Sand-Trap Tested for Gulf Climates',
  'Custom Sizes on Request',
  '10+ Years Experience',
  'Powder-Coated Finishes',
];

// Continuous horizontal scroll of value props.
// Render two identical tracks side-by-side so the animation loops seamlessly.
export default function Marquee() {
  const Track = () => (
    <div className="marquee-track" aria-hidden="false">
      {ITEMS.map((text, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2.5 text-white/85 text-sm md:text-base font-heading font-semibold whitespace-nowrap"
        >
          <Check size={16} className="text-accent flex-shrink-0" strokeWidth={2.5} />
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="bg-navy border-y border-white/10 py-4 md:py-5 relative z-10">
      <div className="marquee-viewport">
        <Track />
        <Track />
      </div>
    </div>
  );
}
