// ── Skills Data ──
// Each skill maps to the projects it is used in, and WHERE in that project.

export const skillGroups = [
  {
    name: 'Languages',
    icon: 'fas fa-code',
    cols: 4,
    gradient: 'var(--grad)',
    skills: [
      {
        name: 'Python',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'YOLOv8 pipeline, EfficientNet model training, Flask API backend' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'ML pipeline, data preprocessing, Random Forest + XGBoost training' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Flask backend — routes, CRUD logic, SQLite queries' },
        ],
      },
      {
        name: 'JavaScript (ES6+)',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'React frontend — frame streaming, mode-switching UI' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'React frontend, Node.js REST API server' },
          { id: 'innerforge',       title: 'InnerForge',       where: 'Entire MERN stack — frontend, backend, real-time Arena' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Vanilla JS frontend — real-time CRUD, category analytics' },
          { id: 'localdrop',        title: 'LocalDrop',        where: 'React frontend + Node.js/Express/Socket.io backend' },
          { id: 'portfolio-site',   title: 'Portfolio Site',   where: 'This entire site — React + Vite' },
        ],
      },
      {
        name: 'SQL',
        highlight: false,
        projects: [
          { id: 'expense-tracker', title: 'ExpenseTracker', where: 'SQLite — schema design, CRUD queries, category aggregation' },
        ],
      },
      {
        name: 'HTML5',
        highlight: false,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'React JSX frontend markup' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'Flask HTML templates + React JSX' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Vanilla HTML frontend structure' },
          { id: 'portfolio-site',   title: 'Portfolio Site',   where: 'Semantic markup throughout this site' },
        ],
      },
      {
        name: 'CSS3',
        highlight: false,
        projects: [
          { id: 'credit-default',   title: 'Credit Default',   where: 'CreditRisk AI web interface styling' },
          { id: 'innerforge',       title: 'InnerForge',       where: 'Tailwind CSS utility classes throughout' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Custom styling for the finance dashboard UI' },
          { id: 'portfolio-site',   title: 'Portfolio Site',   where: 'Custom dark design system, built from scratch' },
        ],
      },
    ],
  },
  {
    name: 'Web & Frameworks',
    icon: 'fas fa-layer-group',
    cols: 8,
    gradient: 'var(--grad2)',
    skills: [
      {
        name: 'React.js',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Responsive frontend — image/video/webcam mode switching via useEffect hooks' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'CreditRisk AI frontend — form inputs, prediction results display' },
          { id: 'innerforge',       title: 'InnerForge',       where: 'Full MERN frontend — journal, forge, arena, dashboard' },
          { id: 'localdrop',        title: 'LocalDrop',        where: 'Frontend — device pairing UI, group chat, transfer progress' },
          { id: 'portfolio-site',   title: 'Portfolio Site',   where: 'This entire site — hand-coded with Vite' },
        ],
      },
      {
        name: 'Node.js',
        highlight: true,
        projects: [
          { id: 'credit-default',   title: 'Credit Default',   where: 'REST API server — credit data processing, model serving' },
          { id: 'innerforge',       title: 'InnerForge',       where: 'Express backend — auth, journal, idea submission APIs' },
          { id: 'localdrop',        title: 'LocalDrop',        where: 'Express server — file transfer handling, Socket.io integration' },
        ],
      },
      {
        name: 'Flask',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'REST API — handles detection/classification inference at 43 FPS' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'Python web server — routes user input to ML model, returns prediction' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Full backend — routes, SQLite integration, CRUD endpoints' },
        ],
      },
      {
        name: 'REST APIs',
        highlight: false,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Flask /predict endpoint for image/video frames' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'Node.js API for credit data submission & prediction fetch' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'Flask endpoints for expense CRUD and analytics' },
        ],
      },
      {
        name: 'Socket.io',
        highlight: true,
        projects: [
          { id: 'innerforge', title: 'InnerForge', where: 'Live Arena — real-time debate sessions between users' },
          { id: 'localdrop',  title: 'LocalDrop',  where: 'Real-time file transfer progress and group chat' },
        ],
      },
      {
        name: 'MongoDB',
        highlight: false,
        projects: [
          { id: 'credit-default', title: 'Credit Default', where: 'User session storage, prediction history' },
          { id: 'innerforge',     title: 'InnerForge',     where: 'Atlas — journal entries, psych profiles, ideas, community data' },
        ],
      },
      {
        name: 'MySQL',
        highlight: false,
        projects: [],
      },
      {
        name: 'D3.js',
        highlight: true,
        projects: [
          { id: 'innerforge', title: 'InnerForge', where: 'Argument Tree visualization — branching attack/defence tree for ideas' },
        ],
      },
      {
        name: 'Recharts',
        highlight: false,
        projects: [
          { id: 'innerforge', title: 'InnerForge', where: 'Bias Radar Chart, Emotion Timeline, Psych Evolution graph' },
        ],
      },
    ],
  },
  {
    name: 'AI / ML & Tools',
    icon: 'fas fa-brain',
    cols: 8,
    gradient: 'linear-gradient(135deg,#a855f7,#6366f1)',
    skills: [
      {
        name: 'YOLOv8',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'YOLOv8n — real-time object localisation stage of the two-stage pipeline' },
        ],
      },
      {
        name: 'EfficientNet-B0',
        highlight: true,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Fine-tuned EfficientNet-B0 — classification stage, 85.41% accuracy on 17 classes' },
        ],
      },
      {
        name: 'ByteTrack',
        highlight: false,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Multi-object tracking — consistent ID assignment across video frames' },
        ],
      },
      {
        name: 'OpenCV',
        highlight: false,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Frame capture, webcam feed, bounding-box drawing, image pre-processing' },
        ],
      },
      {
        name: 'Random Forest',
        highlight: true,
        projects: [
          { id: 'credit-default', title: 'Credit Default', where: 'Primary model — 83.72% accuracy, 0.9131 ROC-AUC, deployed in production' },
        ],
      },
      {
        name: 'XGBoost',
        highlight: false,
        projects: [
          { id: 'credit-default', title: 'Credit Default', where: 'Comparison model — 82.68% accuracy, 0.9096 ROC-AUC' },
        ],
      },
      {
        name: 'scikit-learn',
        highlight: true,
        projects: [
          { id: 'credit-default', title: 'Credit Default', where: 'Train-test split, GridSearchCV, RobustScaler, metrics evaluation, joblib serialisation' },
        ],
      },
      {
        name: 'SMOTE',
        highlight: false,
        projects: [
          { id: 'credit-default', title: 'Credit Default', where: 'Class imbalance correction — balanced 78%/22% split for defaulter class' },
        ],
      },
      {
        name: 'Claude API',
        highlight: true,
        projects: [
          { id: 'innerforge', title: 'InnerForge', where: 'Powers journal analysis, psychological profile building, and personalised idea attacks' },
        ],
      },
      {
        name: 'Groq API',
        highlight: false,
        projects: [],
      },
      {
        name: 'Git / GitHub',
        highlight: false,
        projects: [
          { id: 'object-detection', title: 'Object Detection', where: 'Version control — github.com/itsmearundas/object-detection' },
          { id: 'credit-default',   title: 'Credit Default',   where: 'Version control — github.com/itsmearundas/credit-default' },
          { id: 'innerforge',       title: 'InnerForge',       where: 'Version control & deployment tracking' },
          { id: 'expense-tracker',  title: 'ExpenseTracker',   where: 'github.com/itsmearundas/ExpenseTracker' },
          { id: 'localdrop',        title: 'LocalDrop',        where: 'github.com/itsmearundas/LocalDrop' },
          { id: 'portfolio-site',   title: 'Portfolio Site',   where: 'github.com/itsmearundas/itsmearundas.github.io' },
        ],
      },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'fas fa-cloud',
    cols: 4,
    gradient: 'linear-gradient(135deg,#0ea5e9,#06b6d4)',
    skills: [
      {
        name: 'AWS (EC2, S3, IAM)',
        highlight: true,
        projects: [],
      },
      {
        name: 'Docker',
        highlight: false,
        projects: [],
      },
      {
        name: 'CI/CD Pipelines',
        highlight: false,
        projects: [],
      },
    ],
  },
];
