import { useEffect } from 'react';

export default function Globe() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/scripts/globe.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div id="globe-container" className="w-full h-[500px] bg-black text-white flex items-center justify-center">
      <p>Loading Globe...</p>
    </div>
  );
}