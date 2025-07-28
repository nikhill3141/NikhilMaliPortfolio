import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('defer', '');
    script.setAttribute('data-domain', 'nikhilmali.com');
    script.src = 'https://plausible.io/js/plausible.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
} 