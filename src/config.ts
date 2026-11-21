export const siteConfig = {
  handle: 'mossbyte',
  siteName: 'mossbyte',
  tagline: 'a small corner of the internet',
  siteDescription:
    "Maya's little corner of the internet. Web security, Linux, books, and questionable decisions.",
  author: 'maya',
  age: 21,
  pronouns: 'she/her',
  location: 'Manchester, UK',
  statusLabel: 'PROBABLY AWAKE',
  navigation: [
    { label: 'about', href: '/about/' },
    { label: 'projects', href: '/projects/' },
    { label: 'writeups', href: '/writeups/' }
  ],
  quotes: [
    "i'll fix it after one more song.",
    'it worked on my machine. emotionally, at least.',
    'just one more request to intercept.',
    'sleep is a social construct (probably).',
    "if it's stupid but it works, document it.",
    'the payload was inside me the whole time.'
  ]
} as const;

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || '/';
}
