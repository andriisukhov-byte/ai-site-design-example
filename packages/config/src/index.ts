export const defaultSiteUrl = 'https://acme.example';
export const acmeSignupUrl = 'https://app.acme.example/signup';
export const homeSignupUtmContent = 'cognitive-ai-platform';

export function signupUtmContentForPath(pathname: string): string {
  const [rawPath = ''] = pathname.trim().split(/[?#]/, 1);
  const path = rawPath.replace(/\.html$/i, '');
  const segments = path.split('/').filter(Boolean);
  const currentPage = segments.at(-1);

  return currentPage ? decodeURIComponent(currentPage) : homeSignupUtmContent;
}

export function signupUrlForPath(pathname: string): string {
  return `${acmeSignupUrl}?utm_content=${encodeURIComponent(signupUtmContentForPath(pathname))}`;
}

export function isSignupHref(href: string): boolean {
  return /^(?:https?:\/\/app\.acme\.ai)?\/sign-?up\/?(?:[?#].*)?$/i.test(href.trim());
}

export function resolveSignupHref(href: string, pathname: string): string {
  return isSignupHref(href) ? signupUrlForPath(pathname) : href;
}

export type NavigationLink = {
  label: string;
  href: string;
};

export type MegaMenuEntryRole = 'link' | 'heading' | 'span-heading' | 'all';

export type MegaMenuEntry = NavigationLink & {
  role?: MegaMenuEntryRole;
  icon?: string;
  startColumn?: boolean;
  startRow?: boolean;
};

export type PrimaryNavigationItem = NavigationLink & {
  variant?: 'link' | 'mega';
  items?: MegaMenuEntry[];
};

export type FooterColumn = {
  title: string;
  links: NavigationLink[];
};

export type SocialLink = NavigationLink & {
  platform: 'linkedin' | 'x' | 'facebook' | 'youtube' | 'instagram';
  icon: {
    src: string;
    width: number;
    height: number;
  };
};

export type SiteChromeConfig = {
  siteName: string;
  siteUrl: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
  footerLogo: {
    src: string;
    width: number;
    height: number;
  };
  primaryNavigation: PrimaryNavigationItem[];
  footerColumns: FooterColumn[];
  legalLinks: NavigationLink[];
  socialLinks: SocialLink[];
  headerActions: {
    startFree: NavigationLink;
    demo: NavigationLink;
    login: NavigationLink;
  };
  copyright: string;
};

export const siteChrome: SiteChromeConfig = {
  siteName: 'Acme',
  siteUrl: defaultSiteUrl,
  logo: {
    src: '/assets/brand/acme-logo.svg',
    width: 120,
    height: 19,
  },
  footerLogo: {
    src: '/assets/brand/acme-footer-logo.svg',
    width: 202,
    height: 32,
  },
  primaryNavigation: [
    {
      label: 'Features',
      href: '/features/',
      variant: 'mega',
      items: [
        { label: 'Platform Capabilities', href: '/platform-capabilities/', icon: 'blocks' },
        { label: 'Cognitive AI Agents', href: '/cognitive-ai-platform/', icon: 'brain-circuit' },
        { label: 'Conversational AI', href: '/conversational-ai-platform/', icon: 'messages-square' },
        { label: 'Autonomous AI Agents', href: '/autonomous-ai-agents/', icon: 'orbit' },
        { label: 'Virtual Employees', href: '/virtual-employees/', icon: 'user-round-cog', startColumn: true },
        { label: 'Multi-Agent Collaboration', href: '/multi-agent-collaboration/', icon: 'network' },
        { label: 'Advanced Voice AI', href: '/advanced-voice-intelligence/', icon: 'mic' },
        { label: 'Workflow Automation', href: '/business-workflow-automation/', icon: 'workflow' },
        { label: 'All Features', href: '/features/', role: 'all' },
      ],
    },
    {
      label: 'Industries',
      href: '#',
      variant: 'mega',
      items: [
        { label: 'Retail & eCommerce', href: '/ai-use-cases-in-ecommerce/', icon: 'shopping-cart' },
        { label: 'Real Estate', href: '/real-estate-ai-agent/', icon: 'building2' },
        { label: 'Insurance', href: '/ai-insurance-agent/', icon: 'shield-check' },
        { label: 'Call Center', href: '/call-center-automation/', icon: 'headset', startColumn: true },
        { label: 'Restaurants', href: '/ai-agent-for-restaurants/', icon: 'utensils-crossed' },
        { label: 'Security', href: '/ai-security-agent/', icon: 'shield-half' },
        { label: 'Home Services', href: '#', role: 'span-heading', startRow: true },
        { label: 'HVAC', href: '/hvac-ai-agent/', icon: 'fan' },
        { label: 'Cleaning', href: '/ai-cleaning-agent/', icon: 'network' },
        { label: 'Plumbing', href: '/ai-agent-for-plumbers/', icon: 'wrench', startColumn: true },
        { label: 'Auto Repair', href: '/ai-auto-repair-agent/', icon: 'car' },
        { label: 'All Industries', href: '/ai-use-cases/', role: 'all' },
      ],
    },
    {
      label: 'Use Cases',
      href: '#',
      variant: 'mega',
      items: [
        { label: 'Sales', href: '#', role: 'heading' },
        { label: 'Lead Qualification', href: '/ai-lead-qualification/', icon: 'filter' },
        { label: 'AI Sales Assistant', href: '/ai-sales-assistant/', icon: 'badge-dollar-sign' },
        { label: 'Customer Support', href: '#', role: 'heading', startColumn: true },
        { label: 'Customer Service AI Agent', href: '/customer-service-ai-agent/', icon: 'headset' },
        { label: 'Returns Management', href: '/automated-return-management/', icon: 'package-open' },
        { label: 'Marketing', href: '#', role: 'heading', startRow: true },
        { label: 'AI Marketing Agent', href: '/ai-marketing-agent/', icon: 'megaphone' },
        { label: 'Email Marketing Automation', href: '/email-marketing-automation/', icon: 'mail' },
        { label: 'HR & Recruiting', href: '#', role: 'heading', startColumn: true },
        { label: 'AI Recruiting Agent', href: '/ai-agents-for-recruiting/', icon: 'user-round-search' },
        { label: 'Candidate Screening', href: '/candidate-screening-agent/', icon: 'clipboard-check' },
        { label: 'Operations', href: '#', role: 'heading', startRow: true },
        { label: 'ERP Automation', href: '/erp-ai-chatbot/', icon: 'boxes' },
        { label: 'All Use Cases', href: '/ai-use-cases/', role: 'all' },
      ],
    },
    {
      label: 'Resources',
      href: '#',
      variant: 'mega',
      items: [
        { label: 'News', href: '/news/', icon: 'newspaper' },
        { label: 'Blog', href: '/blog/', icon: 'pencil' },
        { label: 'Documentation', href: 'https://docs.dev.acme.example', icon: 'book-text' },
        { label: 'Pricing', href: '/pricing/', icon: 'badge-dollar-sign' },
        { label: 'How-to Guides', href: '/guides/', icon: 'book-open', startColumn: true },
        { label: 'Tips & Tricks', href: '/tips-and-tricks/', icon: 'lightbulb' },
        { label: 'Platform Comparison', href: '/alternatives/', icon: 'git-compare-arrows' },
      ],
    },
    {
      label: 'Company',
      href: '#',
      variant: 'mega',
      items: [
        { label: 'About Us', href: '/about/', icon: 'info' },
        { label: 'Contact', href: '/contact-us/', icon: 'mails' },
      ],
    },
  ],
  footerColumns: [
    {
      title: 'Automation',
      links: [
        { label: 'AI Agent Builder', href: '/ai-agent-builder/' },
        { label: 'Business Workflows', href: '/business-workflow-automation/' },
        { label: 'AI Sales Assistant', href: '/ai-sales-assistant/' },
        { label: 'Customer Service AI', href: '/customer-service-ai-agent/' },
        { label: 'Call Center', href: '/call-center-automation/' },
        { label: 'ERP', href: '/erp-ai-chatbot/' },
      ],
    },
    {
      title: 'Features',
      links: [
        { label: 'AcmeApps', href: '/acme-canvas/' },
        { label: 'Conversational AI Platform', href: '/conversational-ai-platform/' },
        { label: 'Autonomous AI', href: '/autonomous-ai-agents/' },
        { label: 'Multi-Agents', href: '/multi-agent-collaboration/' },
        { label: 'Magic UI', href: '/ai-magic-window/' },
        { label: 'More', href: '/features/' },
      ],
    },
    {
      title: 'Use Cases',
      links: [
        { label: 'eCommerce', href: '/ai-use-cases-in-ecommerce/' },
        { label: 'Marketing', href: '/ai-use-cases-in-marketing/' },
        { label: 'Real Estate', href: '/ai-use-cases-in-real-estate/' },
        { label: 'Sales', href: '/ai-use-cases-in-sales/' },
        { label: 'HR & Recruitment', href: '/ai-use-cases-in-hr/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Pricing', href: '/pricing/' },
        { label: 'About', href: '/about/' },
        { label: 'Blog', href: '/blog/' },
        { label: 'Guides', href: '/guides/' },
        { label: 'Comparisons', href: '/alternatives/' },
        { label: 'Tips and Tricks', href: '/tips-and-tricks/' },
        { label: 'Contact', href: '/contact-us/' },
      ],
    },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms of Service', href: '/terms-of-use/' },
  ],
  socialLinks: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61574480321357',
      platform: 'facebook',
      icon: { src: '/assets/footer/social/facebook.svg', width: 32, height: 32 },
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/106779608/',
      platform: 'linkedin',
      icon: { src: '/assets/footer/social/linkedin.svg', width: 32, height: 32 },
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Acme',
      platform: 'youtube',
      icon: { src: '/assets/footer/social/youtube.svg', width: 24, height: 24 },
    },
  ],
  headerActions: {
    startFree: { label: 'Start Free', href: acmeSignupUrl },
    demo: { label: 'Demo', href: '#popup-open-popupRequestDemo' },
    login: { label: 'Log in', href: 'https://app.acme.example/login' },
  },
  copyright: '© {year} Acme Inc.. All rights reserved.',
};
