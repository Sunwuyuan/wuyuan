export type IconName =
  | "arrow-up-right"
  | "book-open"
  | "building"
  | "code"
  | "github"
  | "globe"
  | "graduation-cap"
  | "mail"
  | "message-circle"
  | "rocket"
  | "send"
  | "sparkles"
  | "tv"
  | "users";

export interface ExternalLink {
  label: string;
  href: string;
  icon: IconName;
  description?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProductMetric {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slogan: string;
  description?: string;
  logo: string;
  cover?: string;
  href: string;
  repo?: string;
  tags?: string[];
  metrics?: ProductMetric[];
  features?: ProductFeature[];
  featured?: boolean;
}

export interface Profile {
  name: string;
  motto: string;
  avatar: string;
  email: string;
  quickLinks: ExternalLink[];
}

export interface Organization {
  name: string;
  description: string;
  period: string;
  href?: string;
}

export interface SocialEmbed {
  github: {
    username: string;
    href: string;
  };

  youtube?: {
    channelName: string;
    href: string;
  };
  bilibili?: {
    uid: string;
    username: string;
    href: string;
  };
}

export interface ContactLink {
  label: string;
  href: string;
  icon: IconName;
  handle?: string;
}

export interface HomeContent {
  profile: Profile;
  featuredProduct: Product;
  products: Product[];
  social: SocialEmbed;
  contacts: ContactLink[];
  organizations: {
    current: Organization[];
    past: Organization[];
  };
}
