// ── Social Media Data ──
// Place social media screenshots in: public/assets/social/
// Screenshots:
//   github.png       — GitHub profile screenshot
//   linkedin.png     — LinkedIn profile screenshot
//   hackerrank.png   — HackerRank profile screenshot

export const socialProfiles = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@itsmearundas',
    url: 'https://github.com/itsmearundas',
    icon: 'fab fa-github',
    screenshot: '/assets/social/github.png',
    iconBg: 'linear-gradient(135deg,#24292e,#3a3f47)',
    iconColor: '#fff',
    description:
      'My primary code repository hosting all projects. Contains the full source code for the Hybrid Object Detection system, Credit Card Default Prediction platform, and InnerForge. Repositories include detailed READMEs, setup guides, and commit histories showing development progress.',
    stats: [
      { label: 'Public Repos', value: '5+' },
      { label: 'Technologies', value: 'Python, React, ML' },
    ],
    highlight: 'All academic & personal project source code',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'itsmearundas-kunnel',
    url: 'https://linkedin.com/in/itsmearundas-kunnel',
    icon: 'fab fa-linkedin-in',
    screenshot: '/assets/social/linkedin.png',
    iconBg: 'linear-gradient(135deg,#0077B5,#0a95da)',
    iconColor: '#fff',
    description:
      'Professional networking profile detailing my academic background, technical skills, and project experience. Connect here for professional opportunities, collaborations, or to learn more about my journey from BCA to MCA with a focus on AI/ML and full-stack development.',
    stats: [
      { label: 'Profile', value: 'Professional' },
      { label: 'Focus', value: 'AI & Full-Stack' },
    ],
    highlight: 'Professional profile & networking hub',
  },
  {
    id: 'leetcode',
    platform: 'LeetCode',
    handle: 'itsmearundas',
    url: 'https://leetcode.com/itsmearundas',
    icon: 'fas fa-code',
    screenshot: '/assets/social/leetcode.png',
    iconBg: 'linear-gradient(135deg,#f89f1b,#f6a623)',
    iconColor: '#fff',
    description:
      'Competitive programming and algorithm practice profile. I use LeetCode to sharpen data structures, algorithms, and problem-solving skills in Python and JavaScript — the same foundation that powers efficient ML data pipelines and optimised backend APIs in my projects.',
    stats: [
      { label: 'Language', value: 'Python, JS' },
      { label: 'Focus', value: 'Algorithms & DS' },
    ],
    highlight: 'Competitive programming & coding challenges',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@itsmearundas',
    url: 'https://instagram.com/itsmearundas',
    icon: 'fab fa-instagram',
    screenshot: '/assets/social/instagram.png',
    iconBg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    iconColor: '#fff',
    description:
      'Follow me on Instagram for glimpses into my day-to-day life, tech journey, project updates, and moments from Idukki, Kerala. A mix of personal life and passion for technology.',
    stats: [
      { label: 'Content', value: 'Tech & Life' },
      { label: 'Location', value: 'Kerala, India' },
    ],
    highlight: 'Personal moments & tech journey',
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp',
    handle: '+91-7736908820',
    url: 'https://wa.me/917736908820',
    icon: 'fab fa-whatsapp',
    screenshot: '/assets/social/whatsapp.png',
    iconBg: 'linear-gradient(135deg,#25d366,#128c7e)',
    iconColor: '#fff',
    description:
      'Prefer a quick chat? Reach me directly on WhatsApp for fast communication about project collaborations, internship opportunities, or any queries. Available on weekdays.',
    stats: [
      { label: 'Response', value: 'Within 24hrs' },
      { label: 'Best for', value: 'Quick queries' },
    ],
    highlight: 'Direct & fast communication',
  },
  {
    id: 'email',
    platform: 'Email',
    handle: 'itsmearundasofficial@gmail.com',
    url: 'mailto:itsmearundasofficial@gmail.com',
    icon: 'fas fa-envelope',
    screenshot: '/assets/social/email.png',
    iconBg: 'linear-gradient(135deg,#ff6b35,#f59e0b)',
    iconColor: '#fff',
    description:
      'For professional enquiries, internship discussions, project collaborations, or detailed conversations — email is the best way to reach me. I typically respond within 24 hours on working days.',
    stats: [
      { label: 'Response', value: '24hrs' },
      { label: 'Best for', value: 'Professional' },
    ],
    highlight: 'Professional enquiries & collaborations',
  },
];
