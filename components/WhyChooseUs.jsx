'use client';

import {
  Shield,
  Settings,
  Truck,
  Award,
  Users,
  Leaf,
} from 'lucide-react';

import { useReveal } from '@/components/useReveal';

const reasons = [
  {
    icon: Award,
    title: 'High Quality Aluminum Products',
    desc: 'Premium-grade aluminum with powder-coated finishes that last. Every product QC-checked before dispatch.',
  },
  {
    icon: Settings,
    title: 'Custom Solutions for Every Need',
    desc: 'Standard and custom sizes available. We manufacture to your exact project specifications.',
  },
  {
    icon: Shield,
    title: 'Compliant with Industry Standards',
    desc: 'All products meet ASHRAE and international HVAC standards for airflow performance and safety.',
  },
  {
    icon: Truck,
    title: 'Timely Delivery Across UAE & GCC',
    desc: 'Based in Ajman, we deliver fast and reliably across the UAE and GCC region.',
  },
  {
    icon: Users,
    title: 'Dedicated Technical Support',
    desc: 'Our engineers provide pre-sale and post-sale support, including installation guidance.',
  },
  {
    icon: Leaf,
    title: 'Eco-Responsible Manufacturing',
    desc: 'Energy-efficient design and sustainable processes form the core of our production philosophy.',
  },
];

export default function WhyChooseUs() {
  useReveal();

  return (
    <section className="section section-light relative overflow-hidden">

      {/* Divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="container">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">

          <span className="section-label justify-center">
            Why Choose Us
          </span>

          <h2 className="heading-lg leading-tight">
            Why Choose ALUGRIDX?
          </h2>

          <p className="text-muted mt-4 font-body text-sm sm:text-base leading-relaxed">
            We deliver innovative, reliable and high performance
            solutions for every residential, commercial and
            industrial project.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

          {reasons.map((reason, i) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className={`card p-6 sm:p-7 group hover:-translate-y-1 reveal delay-${Math.min(
                  i + 1,
                  5
                )}`}
              >

                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-navy transition-colors duration-300">

                  <Icon
                    size={24}
                    className="text-navy group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-dark text-lg leading-snug mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
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