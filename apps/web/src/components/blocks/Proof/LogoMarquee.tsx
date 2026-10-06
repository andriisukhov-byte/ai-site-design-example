import FastMarquee from 'react-fast-marquee';
import type { ComponentType, ReactNode } from 'react';

type FastMarqueeProps = {
  children?: ReactNode;
  className?: string;
  autoFill?: boolean;
  speed?: number;
  gradient?: boolean;
};

const Marquee = ((FastMarquee as unknown as { default?: ComponentType<FastMarqueeProps> }).default ?? FastMarquee) as ComponentType<FastMarqueeProps>;

type ImageValue = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type LogoView = {
  label: string;
  image: ImageValue;
};

type LogoMarqueeProps = {
  logos: LogoView[];
  variant?: 'inline' | 'full';
  label?: string;
};

export default function LogoMarquee({ logos, variant = 'full', label = 'Trusted companies' }: LogoMarqueeProps) {
  if (logos.length === 0) return null;

  return (
    <div className={`logo-strip__marquee logo-strip__marquee--${variant}`} role="region" aria-label={label}>
      <Marquee className="logo-strip__runner" autoFill speed={38} gradient={false}>
        <div className="logo-strip__set" role="list">
          {logos.map((logo, index) => (
            <div className="logo-strip__logo" role="listitem" key={`${logo.image.src || logo.label}-${index}`}>
              {logo.image.src ? (
                <img
                  className="logo-strip__logo-image"
                  src={logo.image.src}
                  alt={logo.image.alt}
                  width={logo.image.width}
                  height={logo.image.height}
                  loading="eager"
                  decoding="async"
                />
              ) : logo.label ? (
                <span className="logo-strip__logo-text">{logo.label}</span>
              ) : null}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
