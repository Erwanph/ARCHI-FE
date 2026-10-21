import { notFound } from 'next/navigation';

// Unknown paths still match [locale], so the 404 renders in the visitor's
// language instead of falling back to the default layout.
export default function MissingPage() {
  notFound();
}
