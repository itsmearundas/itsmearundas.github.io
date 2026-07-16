// ── Academics Data ──
// Place certificate PDFs in: public/assets/certificates/
// Certificate filenames:
//   mca-certificate.pdf     — MCA degree/mark sheet
//   bca-certificate.pdf     — BCA degree/mark sheet
//   hsc-certificate.pdf     — Higher Secondary (Plus Two) certificate
//   sslc-certificate.pdf    — SSLC (10th) certificate

export const academics = [
  {
    id: 'mca',
    yearRange: 'Aug 2024 — May 2026',
    duration: '2 Years',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Mar Athanasius College of Engineering',
    university: 'APJ Abdul Kalam Technological University (KTU), Kerala',
    grade: 'CGPA 7.99 / 10',
    gradeType: 'cgpa',
    stream: 'Computer Applications',
    status: 'Completed',
    location: {
      address: 'Kothamangalam, Ernakulam, Kerala — 686 666',
      mapUrl: 'https://maps.google.com/?q=Mar+Athanasius+College+of+Engineering+Kothamangalam',
      description: 'Located in the scenic Kothamangalam town in Ernakulam district, about 50 km from Kochi. The college is a prestigious technical institution affiliated to KTU, known for its strong engineering and computer science programs.',
    },
    certificatePath: '/assets/certificates/mca-certificate.pdf',
    certificateLabel: 'MCA Provisional Certificate / Mark Sheet',
    color: 'orange',
    highlights: [
      'Specialisation in AI/ML and Full-Stack Development',
      'Projects: Hybrid Object Detection System & Credit Card Default Prediction',
      'Cloud Computing Workshop — IIIT Kottayam × Educ Kshetra (2025)',
      'Participated in Code Crusade, Innovex 2025 — Nirmala College',
    ],
  },
  {
    id: 'bca',
    yearRange: 'Aug 2021 — Mar 2024',
    duration: '3 Years',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'MES College, Nedumkandam',
    university: 'Mahatma Gandhi University (MGU), Kottayam, Kerala',
    grade: 'CGPA 6.36 / 10',
    gradeType: 'cgpa',
    stream: 'Computer Applications',
    status: 'Completed',
    location: {
      address: 'Nedumkandam, Idukki, Kerala',
      mapUrl: 'https://maps.google.com/?q=MES+College+Nedumkandam+Idukki',
      website: 'https://mesnedumkandam.in/',
      description: 'MES College Nedumkandam is situated in Nedumkandam town in Idukki district, affiliated to Mahatma Gandhi University. The college offers undergraduate programmes in arts, science, and computer applications.',
    },
    certificatePath: '/assets/certificates/bca-certificate.pdf',
    certificateLabel: 'BCA Degree Certificate / Mark Sheet',
    color: 'indigo',
    highlights: [
      'Foundation in computer science, programming and database systems',
      'Studied Java, Python, Data Structures, DBMS, Web Technologies',
      'Completed final year project on web application development',
    ],
  },
  {
    id: 'hsc',
    yearRange: '2019 — 2021',
    duration: '2 Years (Plus Two)',
    degree: 'Higher Secondary Education (HSC / Class XII)',
    institution: 'St George Higher Secondary School, Kattappana',
    university: 'Kerala Board of Higher Secondary Education (DHSE)',
    grade: '',
    gradeType: 'percentage',
    stream: 'Computer Science',
    status: 'Completed',
    location: {
      address: 'Kattappana, Idukki, Kerala',
      mapUrl: 'https://maps.google.com/?q=St+George+Higher+Secondary+School+Kattappana',
      website: 'https://sghssktpna.com/',
      description: 'St George Higher Secondary School, Kattappana is located in Kattappana, the administrative headquarters of Idukki district, in the Western Ghats region of Kerala.',
    },
    certificatePath: '/assets/certificates/hsc-certificate.pdf',
    certificateLabel: 'HSC / Plus Two Certificate',
    color: 'mint',
    highlights: [
      'Stream: Computer Science with Mathematics',
      'St George Higher Secondary School, Kattappana — sghssktpna.com',
      'Affiliated to Kerala Board of Higher Secondary Education (DHSE)',
    ],
  },
  {
    id: 'sslc',
    yearRange: '2018 — 2019',
    duration: 'Class X',
    degree: 'Secondary School Leaving Certificate (SSLC / Class X)',
    institution: 'Government Higher Secondary School, Kallar',
    university: 'Kerala Board of Public Examination (KBPE)',
    grade: '',
    gradeType: 'grade',
    stream: 'General',
    status: 'Completed',
    location: {
      address: 'Kallar, Kerala',
      mapUrl: 'https://maps.google.com/?q=GHSS+Kallar+Kerala',
      website: 'https://ghsskallar.weebly.com/',
      description: 'Government Higher Secondary School, Kallar.',
    },
    certificatePath: '/assets/certificates/sslc-certificate.pdf',
    certificateLabel: 'SSLC Certificate',
    color: 'amber',
    highlights: [
      'Kerala Board of Public Examinations (KBPE)',
      'Government Higher Secondary School, Kallar — ghsskallar.weebly.com',
      'Completed secondary schooling with strong fundamentals in sciences and mathematics',
    ],
  },
];
