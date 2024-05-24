import { PageSEO } from '@/types/Seo.type';

const baseUrl = 'https://athleti.fi';

const aboutUsConfig: PageSEO = {
  description:
    "Discover AthletiFi's mission to transform the soccer world with dynamic digital trading cards. Dive into our journey, partnerships, and vision for the future of soccer.",
  image: '/about_us_meta.jpg',
  title: 'About Us | Athletifi',
  websiteURL: `${baseUrl}/about-us`,
};

const dashboardConfig: PageSEO = {
  description: 'Write something about the dashboard.',
  image: 'TBD',
  title: 'Dashboard | Athletifi',
  websiteURL: `${baseUrl}/dashboard`,
};

const homeConfig: PageSEO = {
  description:
    "Experience the future of soccer with AthletiFi's digital player card collections. Collect, follow, and interact with elite youth soccer players in engaging ways. Welcome to the future of sports.",
  image: '/home_meta.jpg',
  title: 'Athletifi | The Future of Sports',
  websiteURL: baseUrl,
};

const newsConfig: PageSEO = {
  description: '(dynamically generated)',
  image: '(dynamically generated)',
  title: 'AthletiFi News: Latest Updates & Announcements',
  websiteURL: `${baseUrl}/news`,
};

const signUpConfig: PageSEO = {
  description:
    "Sign-up for exclusive updates! Become part of the sport's revolution.",
  image: '/sign_up_meta.jpg',
  title: 'Start Your Journey | Join AthletiFi',
  websiteURL: `${baseUrl}/sign-up`,
};

// TODO: NEEDS AN UPDATED IMAGE SPECIFIC TO CONTACT-US SEO
const contactUsConfig: PageSEO = {
  description: 'Get in Touch!',
  image: '/sign_up_meta.jpg',
  title: 'Contact the AthletiFi team',
  websiteURL: `${baseUrl}/contact-us`,
};

const notFoundConfig: PageSEO = {
  description: "The page you're looking for doesn't exist or has been moved.",
  image: '', // No image for the 404 page
  title: '404 Not Found | AthletiFi',
  websiteURL: `${baseUrl}/404`,
};

const termsOfUseConfig: PageSEO = {
  description: "Terms of Use for AthletiFi's platform and services.",
  image: '', // No image for Terms of Use
  title: 'Terms of Use | AthletiFi',
  websiteURL: `${baseUrl}/terms-of-use`,
};

const privacyPolicyConfig: PageSEO = {
  description: "Privacy Policy for using AthletiFi's platform and services.",
  image: '', // No image for Terms of Use
  title: 'Terms of Use | AthletiFi',
  websiteURL: `${baseUrl}/privacy-policy`,
};

const loginConfig: PageSEO = {
  description: "Login to experience the AthletiFi's platform and services.",
  image: '',
  title: 'Login | AthletiFi',
  websiteURL: `${baseUrl}/login`,
};

const logoutConfig: PageSEO = {
  description: 'Remember to logout of your account when you are done!',
  image: '',
  title: 'Logout | AthletiFi',
  websiteURL: `${baseUrl}/logout`,
};

const registerConfig: PageSEO = {
  description:
    'Start your AthletiFi journey here by registering an account with us.',
  image: '',
  title: 'Register | AthletiFi',
  websiteURL: `${baseUrl}/register`,
};

export const SEO_CONFIG = {
  aboutUs: aboutUsConfig,
  contactUs: contactUsConfig,
  dashboard: dashboardConfig,
  home: homeConfig,
  news: newsConfig,
  signUp: signUpConfig,
  notFound: notFoundConfig,
  termsOfUse: termsOfUseConfig,
  privacyPolicy: privacyPolicyConfig,
  login: loginConfig,
  logout: logoutConfig,
  register: registerConfig,
};
