import { Link } from 'react-router-dom';

// Panel styling on purpose stays flat (thin border, no soft drop shadow,
// small radius) - closer to a control-panel gauge than a soft SaaS card.
// The `accent` strip along the top does the job a status light does on
// shop-floor equipment: which board does this panel belong to.
const ACCENTS = {
  steel: 'before:bg-primary-500',
  amber: 'before:bg-amber-400',
  safety: 'before:bg-safety-500',
  rivet: 'before:bg-rivet-500',
  none: 'before:bg-transparent',
};

export default function Card({
  title,
  subtitle,
  eyebrow,
  accent = 'steel',
  to,
  className = '',
  bodyClassName = '',
  children,
}) {
  const base = `relative overflow-hidden rounded-md border border-gunmetal-200/70 bg-white before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-[''] ${
    ACCENTS[accent] || ACCENTS.steel
  }`;
  const interactive = to ? 'transition-colors hover:border-primary-300' : '';
  const Wrapper = to ? Link : 'div';
  const wrapperProps = to ? { to } : {};

  return (
    <Wrapper {...wrapperProps} className={`${base} ${interactive} ${className}`}>
      <div className={`p-5 pt-[22px] ${bodyClassName}`}>
        {(title || eyebrow) && (
          <div className="mb-3">
            {eyebrow && (
              <p className="text-xs font-medium text-gunmetal-400">{eyebrow}</p>
            )}
            {title && (
              <p className="font-display text-lg font-semibold leading-tight text-gunmetal-800">
                {title}
              </p>
            )}
            {subtitle && <p className="mt-0.5 text-sm text-gunmetal-400">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </Wrapper>
  );
}
