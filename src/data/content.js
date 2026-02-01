export const SITE = {
  name: "Rohan Jain",
  location: "Vista, CA",
  emailPrimary: "jainrohanj@gmail.com",
  phone: "+1 720-819-0419",
  links: {
    github: "https://github.com/rohanjain11",
    linkedin: "https://www.linkedin.com/in/rohan-jain11",
  },
  roleTargets: [
    "Data Scientist",
    "Data Engineer",
    "Data Analyst",
  ],
  valueProp: "Builds reproducible forecasting and data quality workflows with measurable evaluation.",
  ctas: {
    resumeMaster: { label: "Resume (Master)", href: `${import.meta.env.BASE_URL}assets/docs/resume-master.pdf`.replace(/\/+/g, '/') },
    resumeDE: { label: "Resume (Data Engineer)", href: `${import.meta.env.BASE_URL}assets/docs/resume-de.pdf`.replace(/\/+/g, '/') },
    resumeDA: { label: "Resume (Data Analyst)", href: `${import.meta.env.BASE_URL}assets/docs/resume-da.pdf`.replace(/\/+/g, '/') },
    resumeML: { label: "Resume (ML)", href: `${import.meta.env.BASE_URL}assets/docs/resume-ml.pdf`.replace(/\/+/g, '/') },
  },
};

export const EDUCATION = [
  {
    school: "University of Colorado, Boulder",
    degree: "Master's in Data Science",
    details: "GPA: 3.9/4.0",
    dates: "Aug 2024 to May 2026",
    location: "Boulder, USA",
    coursework: "Statistical Methods and Applications; Methods in Statistical Learning; Data Center Scale Computing; Cybersecurity for Data Science; Introduction to Data Mining.",
  },
  {
    school: "Mumbai University, Rajiv Gandhi Institute of Technology",
    degree: "Bachelor's of Engineering in Computer Engineering",
    details: "GPA: 3.7/4",
    dates: "Jul 2020 to May 2024",
    location: "Mumbai, India",
    coursework: "Machine Learning; Artificial Intelligence; Data Warehousing; Database Management Systems; Python Programming; Mobile Communication and Computing; Theory of Computer Science; Operating System; Computer Network; Image Processing.",
  },
];

export const SKILLS = {
  "Languages": ["Python", "R", "SQL (MySQL, PostgreSQL)", "MongoDB", "JavaScript", "HTML", "CSS", "Go", "PHP"],
  "Data and ML": [
    "pandas", "NumPy", "scikit-learn",
    "Random Forest", "SVR", "GBRT", "XGBoost", "MLP",
    "Train-test splits", "Model selection", "Hyperparameter tuning",
    "Error analysis", "Baseline comparisons",
    "Evaluation: MAE, MSE, CRPS",
  ],
  "Deep Learning": ["TensorFlow", "PyTorch", "Keras", "Sequence models", "Custom loss experimentation"],
  "Data Quality and Reproducibility": [
    "Schema, unit, and range validation gates",
    "Reproducible run artifacts, plots, and documentation",
    "Logging and reviewable outputs",
  ],
  "Visualization and BI": ["Tableau", "Power BI", "Excel", "Matplotlib", "Plotly", "Seaborn"],
  "Engineering and Cloud": ["FastAPI", "REST APIs", "Git/GitHub", "Docker (basics)", "Apache Spark", "AWS (Lambda, S3)", "Azure", "LangChain", "FAISS"],
};

export const EXPERIENCE = [
  {
    org: "Nexus Weather & Climate",
    title: "Data Science & Engineering Intern",
    dates: "May 2025 to Present",
    location: "Boulder, CO (remote-first)",
    tags: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "CRPS", "MAE", "MSE"],
    icon: "cloud",
    bullets: [
      "Replaced a legacy SVM bias-correction step with a tuned Random Forest and validated results for rollout notes; reduced temperature MAE from 0.73 to 0.39 (47%) and humidity MAE from 4.68 to 2.37 (49%).",
      "Built a probabilistic CNN-LSTM with a custom CRPS loss and packaged verification plots plus short decision notes; best reported CRPS was 0.1787 for ensemble calibration.",
      "Created a reproducible training and benchmarking workflow with schema, unit, and range checks; compared SVR, RF, tuned RF, GBRT, XGBoost, and MLP under consistent evaluation and artifacts.",
      "Implemented an inference quality gate that only accepts a model when post-ML MAE beats the pre-ML baseline; reduced failed runs by 90% by automatically rejecting regressions.",
      "Ran controlled loss-function experiments (CRPS vs hybrid CRPS+MSE with alpha 0.80 vs Huberized CRPS) and logged runtime plus delta CRPS outcomes for practical tradeoff notes.",
    ],
  },
  {
    org: "Kopf Lab, University of Colorado Boulder",
    title: "Graduate Research Assistant",
    dates: "Dec 2025 to Present",
    location: "Boulder, CO",
    tags: ["R", "Parsing", "Validation", "Reproducibility", "Testing", "Keycloak", "ShinyProxy"],
    icon: "beaker",
    bullets: [
      "Standardized parsing outputs across vendor formats with consistent field names, units, and schemas so the same file yields the same structure across platforms and package versions.",
      "Added fail-fast validation for corruption and edge cases using type, bounds, and structural checks (missing blocks, wrong ordering, truncation) to prevent silent data integrity issues.",
      "Decoded legacy Thermo Isodat scan (.scn) files stored via MFC CArchive Serialize patterns by mapping class layouts and field order, then implemented R readers that follow the same read sequence.",
      "Improved auditability by attaching file IDs, format signals, parsing paths, and assumptions to outputs, plus regression tests with golden outputs and corruption fixtures.",
      "Supported secure multi-user access planning by separating authentication from app execution using Keycloak OIDC and ShinyProxy session isolation (one container per user).",
    ],
  },
];

export const PROJECTS = [
  {
    name: "SaferRide (Risk-Aware Bicycle Routing)",
    dates: "Sep 2025 to Dec 2025",
    stack: ["Python", "FastAPI", "SQL", "PostgreSQL", "PostGIS", "GeoPandas", "OSRM"],
    problem: "Help riders compare route time versus safety using crash and hazard signals.",
    built: "A routing service that requests OSRM routes, returns alternatives, and assigns route-level risk scores computed with spatial joins and proximity features.",
    impact: "Served routes and risk metrics via FastAPI with map overlays so riders can compare safety versus time tradeoffs.",
    links: [{ label: "GitHub", href: "https://github.com/Simrann020/Saferide" }],
    icon: "bicycle",
  },
  {
    name: "Denver International Airport Analytics",
    dates: "Oct 2024",
    stack: ["Python", "Power BI", "Tableau"],
    problem: "Make SLA, queue time, and bottleneck reporting easier to refresh and interpret.",
    built: "Pipelines that integrate ServiceNow and Azure DevOps data, plus KPI definitions and dashboards with drill-downs.",
    impact: "Reduced manual reporting by 40% and earned 3rd place in a hackathon for dashboard impact.",
    links: [{ label: "GitHub", href: "https://github.com/rohanjain11/Denver-Airport-Dashboard" }],
    icon: "plane",
  },
  {
    name: "AI PDF Chatbot",
    dates: "Jan 2025",
    stack: ["Python", "FastAPI", "React", "LangChain", "FAISS"],
    problem: "Answer questions from scanned and digital PDFs with consistent retrieval behavior.",
    built: "A PDF question-answering tool combining OCR, embeddings, and FAISS retrieval behind a FastAPI and React UI, with standardized chunking and prompt templates.",
    impact: "Added usage logging for query analytics and ran labeled spot checks to refine retrieval quality.",
    links: [{ label: "GitHub", href: "https://github.com/rohanjain11/AI-PDF-ChatBot" }],
    icon: "document",
  },
  {
    name: "Isoverse Readers for Legacy Instrument Files",
    dates: "Dec 2025 to Present",
    stack: ["R", "Testing", "Validation"],
    problem: "Make legacy stable isotope instrument files readable and reliable for analysis.",
    built: "Deterministic parsing and validation for Thermo Isodat scan (.scn) files by mirroring serialized write order and returning analysis-ready outputs with provenance.",
    impact: "Reduced silent parsing failures by returning clear errors and maintaining regression tests with golden outputs plus corruption fixtures.",
    links: [{ label: "GitHub", href: "https://github.com/isoverse" }],
    icon: "beaker",
  },
];

export const CERTIFICATIONS = [
  {
    name: "Neural Networks and Deep Learning",
    issuer: "Coursera",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera",
  },
];

export const PUBLICATION = {
  title: "Yoga Posture Detection and Correction",
  note: "Technical paper published in Journal of Operating Systems Development & Trends (2024).",
  link: "https://journals.stmjournals.com/joosdt/article=2024/view=161704/",
};
