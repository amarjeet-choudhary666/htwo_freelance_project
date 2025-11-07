import ReCAPTCHA from 'react-google-recaptcha';
import { forwardRef } from 'react';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
}

const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>(
  ({ onChange, onExpired, onError, theme = 'light', size = 'normal' }, ref) => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcupeUrAAAAAB50W7WHhLeneOpE8Wt0ViiSNv9-';

    return (
      <div className="flex justify-center items-center my-6">
        <div className="relative">
          {/* Decorative border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
          <div className="relative bg-white py-1 px-2 rounded-lg border border-gray-200 shadow-sm">
            <ReCAPTCHA
              ref={ref}
              sitekey={siteKey}
              onChange={onChange}
              onExpired={onExpired}
              onError={onError}
              theme={theme}
              size={size}
            />
          </div>
        </div>
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;