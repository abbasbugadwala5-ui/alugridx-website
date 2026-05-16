'use client';
import { useReveal } from './useReveal';

/**
 * Mounts `useReveal` once at the root so any `.reveal` element on any
 * page — including server-rendered ones — gets animated on scroll.
 */
export default function RevealInit() {
  useReveal();
  return null;
}
