import type { Certification, EducationItem } from '@/types/portfolio';

export const education: EducationItem[] = [
  {
    id: 'hacktiv8',
    institution: 'Hacktiv8 Indonesia',
    qualification: 'Bootcamp',
    field: 'FullStack JavaScript Immersive',
    start: '2023-01',
    end: '2023-06',
  },
  {
    id: 'gunadarma',
    institution: 'Gunadarma University',
    qualification: "Bachelor's degree",
    field: 'Computer Engineering',
    start: '2019-08',
    end: '2022-08',
  },
];

export const certifications: Certification[] = [
  {
    id: 'product-owner',
    name: 'Product Owner',
    issuer: 'Digital Talent Scholarship — Kominfo',
  },
  {
    id: 'android-retrofit',
    name: 'Android REST API with Retrofit',
    issuer: 'Certification',
  },
  {
    id: 'teknisi-jaringan',
    name: 'Teknisi Muda Jaringan Komputer',
    issuer: 'Certification',
  },
  {
    id: 'flutter-coaching',
    name: 'Developer Coaching: Flutter',
    issuer: 'Certification',
  },
];

export const languages: { name: string; level: string }[] = [
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'Professional working' },
];
