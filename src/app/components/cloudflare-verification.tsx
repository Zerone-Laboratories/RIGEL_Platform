import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef } from 'react';

interface CloudflareVerificationProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

export default function CloudflareVerification({ 
  onVerify, 
  onError, 
  onExpire, 
  className 
}: CloudflareVerificationProps) {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;

  if (!siteKey) {
    console.warn('Cloudflare site key not found. Please add NEXT_PUBLIC_CLOUDFLARE_SITE_KEY to your environment variables.');
    return (
      <div className={`p-4 bg-yellow-100 border border-yellow-400 rounded ${className}`}>
        <p className="text-yellow-700 text-sm">Cloudflare verification is not configured.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
        onExpire={() => {
          if (onExpire) onExpire();
          turnstileRef.current?.reset();
        }}
        options={{
          theme: 'dark',
          size: 'normal',
        }}
      />
    </div>
  );
}
