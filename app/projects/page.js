import { buildMetadata } from '@/lib/seo';
import ProjectsClient from './projects-client';

export const metadata = buildMetadata({
  title: 'Our Projects — HVAC Installations Across UAE & GCC',
  description:
    'Recent ALUGRIDX HVAC air-distribution deliveries across residential, commercial and industrial projects in the UAE & GCC region.',
  path: '/projects',
  keywords: [
    'HVAC projects UAE',
    'ALUGRIDX projects',
    'air distribution installations',
    'commercial HVAC Dubai',
    'industrial HVAC GCC',
  ],
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
