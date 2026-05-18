'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const PHONE = '971585312152';
const MESSAGE =
  "Hello ALUGRIDX team, I'd like to enquire about your HVAC air distribution products (diffusers, grilles, louvers, dampers). Could you please share product details and a quotation? Thank you.";

const TEASERS = [
  { emoji: '💬', text: 'Need a quote?' },
  { emoji: '👋', text: 'Got a question?' },
  { emoji: '💡', text: 'Let’s talk HVAC!' },
];

const STORAGE_KEY = 'alx_wa_dismissed';

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [bubble, setBubble] = useState(null); // current teaser index or null
  const [dismissed, setDismissed] = useState(false);
  const bubbleTimerRef = useRef(null);

  // Entry fade-in
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Respect user's dismissal for the rest of the session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') setDismissed(true);
  }, []);

  // Rotating teaser — appears 4s after mount, then every 15s for ~5s
  useEffect(() => {
    if (dismissed) return;
    if (pathname?.startsWith('/admin')) return;

    let i = 0;
    const show = () => {
      setBubble(i % TEASERS.length);
      bubbleTimerRef.current = setTimeout(() => setBubble(null), 5000);
      i++;
    };

    const first = setTimeout(show, 4000);
    const interval = setInterval(show, 15000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [dismissed, pathname]);

  if (pathname?.startsWith('/admin')) return null;

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBubble(null);
    setDismissed(true);
    if (typeof window !== 'undefined') sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const teaser = bubble !== null ? TEASERS[bubble] : null;

  return (
    <>
      <style>{`
        @keyframes wa-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes wa-ring {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.9); opacity: 0;    }
        }
        @keyframes wa-ring-fast {
          0%   { transform: scale(1);   opacity: 0.45; }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        @keyframes wa-bubble-in {
          0%   { opacity: 0; transform: translateX(8px) translateY(4px) scale(0.96); }
          100% { opacity: 1; transform: translateX(0)   translateY(0)   scale(1);    }
        }
        @keyframes wa-bubble-out {
          0%   { opacity: 1; transform: translateX(0)   translateY(0)   scale(1);    }
          100% { opacity: 0; transform: translateX(8px) translateY(4px) scale(0.96); }
        }
        @keyframes wa-glow {
          0%, 100% { box-shadow: 0 10px 30px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.35); }
          50%      { box-shadow: 0 14px 36px rgba(37,211,102,0.55), 0 0 0 6px rgba(37,211,102,0.18); }
        }
        .wa-float-anim   { animation: wa-float 3.6s ease-in-out infinite; }
        .wa-ring-slow    { animation: wa-ring 2.6s cubic-bezier(0,0,0.2,1) infinite; }
        .wa-ring-quick   { animation: wa-ring-fast 1.6s cubic-bezier(0,0,0.2,1) infinite; animation-delay: 0.5s; }
        .wa-glow-anim    { animation: wa-glow 2.8s ease-in-out infinite; }
        .wa-bubble-show  { animation: wa-bubble-in 0.4s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .wa-float-anim, .wa-ring-slow, .wa-ring-quick, .wa-glow-anim, .wa-bubble-show {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999]
                    transition-all duration-500 ease-out
                    ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Teaser bubble */}
        {teaser && (
          <div
            className="wa-bubble-show absolute bottom-full right-0 mb-3 origin-bottom-right"
            role="status"
          >
            <div
              className="relative flex items-center gap-2 rounded-2xl bg-white pl-4 pr-9 py-2.5
                         shadow-[0_10px_30px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5
                         whitespace-nowrap"
            >
              <span className="text-lg leading-none">{teaser.emoji}</span>
              <span className="text-sm font-medium text-slate-800">{teaser.text}</span>

              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full
                           text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X size={12} strokeWidth={2.5} />
              </button>

              {/* Tail */}
              <span
                className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-white
                           ring-1 ring-black/5"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
            </div>
          </div>
        )}

        {/* Button + animated rings */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group relative block wa-float-anim"
        >
          <span className="relative flex h-14 w-14 sm:h-16 sm:w-16">
            {/* Multi-ring pulse */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] wa-ring-slow" />
            <span className="absolute inset-0 rounded-full bg-[#25D366] wa-ring-quick" />

            {/* Core button */}
            <span
              className="wa-glow-anim relative inline-flex h-full w-full items-center justify-center
                         rounded-full bg-gradient-to-br from-[#25D366] via-[#1FBA57] to-[#128C7E]
                         ring-4 ring-white
                         transition-transform duration-300
                         group-hover:scale-110 group-active:scale-95"
            >
              {/* Inner gloss */}
              <span
                className="pointer-events-none absolute inset-1 rounded-full opacity-60"
                style={{
                  background:
                    'radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)',
                }}
              />

              <svg
                viewBox="0 0 32 32"
                className="relative h-7 w-7 sm:h-8 sm:w-8 fill-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
                aria-hidden="true"
              >
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.633.633 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.392-.515 2.735-1.318.215-.502.215-.932.143-1.318-.085-.158-.33-.244-.71-.43z" />
                <path d="M26.575 5.398C23.748 2.557 19.978 1 16.018 1 7.792 1 1.097 7.696 1.083 15.922c0 2.636.688 5.186 1.992 7.45L1 32l8.85-2.32a14.84 14.84 0 0 0 7.122 1.819h.007C25.198 31.5 31.89 24.804 31.9 16.58c0-3.985-1.547-7.737-4.36-10.564l-.965-.617zM16.018 28.96h-.005a12.297 12.297 0 0 1-6.272-1.72l-.45-.267-4.65 1.22 1.243-4.538-.293-.466a12.245 12.245 0 0 1-1.878-6.514c0-6.785 5.535-12.305 12.31-12.305 3.293 0 6.385 1.287 8.708 3.62a12.227 12.227 0 0 1 3.61 8.704c0 6.785-5.535 12.305-12.32 12.305z" />
              </svg>
            </span>

            {/* Online green dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
