'use client';

import { Shield, Settings, Truck, Award, Users, Leaf } from 'lucide-react';
import { useReveal } from '@/components/useReveal';

const reasons = [
  {
    icon: Award,
    title: 'Premium aluminum stock',
    desc: 'Powder-coated finishes and QC-checked tolerances on every batch before dispatch.',
  },
  {
    icon: Settings,
    title: 'Custom sizes to order',
    desc: 'Standard and custom sizes manufactured to project specification, no minimum-order penalty.',
  },
  {
    icon: Shield,
    title: 'ASHRAE-aligned performance',
    desc: 'Airflow, throw and pressure-drop data documented for design submittal.',
  },
  {
    icon: Truck,
    title: 'UAE & GCC dispatch',
    desc: 'Ajman-based production with established logistics to Saudi, Oman, Qatar and Kuwait.',
  },
  {
    icon: Users,
    title: 'Engineering support',
    desc: 'Pre-sale sizing assistance and post-sale installation guidance from in-house engineers.',
  },
  {
    icon: Leaf,
    title: 'Lifecycle responsibility',
    desc: 'Recyclable aluminum, low-VOC coatings and energy-conscious production processes.',
  },
];

export default function WhyChooseUs() {
  useReveal();

  return (
    <section className="section section-light">
      <div className="container">
        <div className="max-w-2xl mb-12 reveal">
          <span className="section-label">Why ALUGRIDX</span>
          <h2 className="heading-lg">Built for spec sheets, delivered for projects.</h2>
          <p className="lead mt-4 text-muted">
            What contractors, consultants and MEP teams come back for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`card p-6 md:p-7 reveal delay-${Math.min(i + 1, 5)}`}
              >
                <div className="w-11 h-11 rounded-md bg-offwhite border border-hairline flex items-center justify-center mb-5">
                  <Icon size={20} className="text-accent" strokeWidth={1.6} />
                </div>
                <h3 className="font-heading font-semibold text-ink text-base leading-snug mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted text-[13px] leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
