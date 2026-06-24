export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  github: string;
  sector: string;
  techStack: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  date: string;
  details: string;
}

export interface LinkedInPost {
  title: string;
  date: string;
  topic: string;
  summary: string;
  url: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    location: string;
    email: string;
    emailWork: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  competencies: string[];
  projects: Project[];
  experience: WorkExperience[];
  education: EducationItem[];
  certifications: {
    category: string;
    items: string[];
  }[];
  technicalExpertise: {
    category: string;
    skills: string[];
  }[];
  africanContext: string[];
  research: string[];
  hobbies: string[];
  linkedinPosts: LinkedInPost[];
}

export const cvData: CVData = {
  personalInfo: {
    name: "Bright C. Sikazwe",
    title: "AI Strategist  •  Data Platforms & Engineering Leader  •  Enterprise Architecture",
    subtitle: "AI Strategist  •  Data Platforms & Engineering Leader  •  Enterprise Architecture",
    location: "Jackal Creek Estate, Honeydew, Johannesburg 2109, South Africa",
    email: "Bryte.sika@gmail.com",
    emailWork: "Bright.Sikazwe@canal-plus.com",
    phone: "+27 76 725 4353",
    linkedin: "https://www.linkedin.com/in/brytesika/",
    github: "https://github.com/brytesika-AI",
    summary: "Visionary AI Strategist and Data Platforms Engineering Leader with 13+ years translating complex data into strategic assets that drive business transformation across the media and technology sectors. Currently Acting Principal Engineer and Lead for Data Platforms & Engineering at MultiChoice Group (a Canal+ company) — Africa’s largest entertainment platform (20M+ subscribers across 50 countries) — where I own AI strategy and production ML from use-case identification through deployment, governance and value tracking, while architecting the data platforms behind the MultiChoice–Canal+ integration. Selected for the MultiChoice Executive Head Training Program. Equally credible setting AI strategy in the boardroom, presenting to the Group CTO, and resolving P1 production incidents in raw device logs. PhD candidate at the University of Johannesburg researching the AI-Augmented Strategic Reasoning Framework (AI-SRF) — agentic AI for strategic resilience in emerging markets — with a published preprint and a journal article under preparation. Sessional consultant at Wits Business School."
  },
  competencies: [
    "AI & Machine Learning — production GenAI/LLM deployment (Gemini, Qwen, Llama3, GPT-4 Vision), multi-agent systems, multimodal video AI, NLP/sentiment analysis, churn intelligence, anomaly detection (SageMaker), MLOps & drift detection, responsible-AI governance, AI-SRF framework.",
    "Executive Analytics & BI — C-suite and Group CTO reporting, KPI governance & data contracts, Power BI semantic models, DAX, MECE decision frameworks, VOC/CSAT/NPS analytics, cohort analysis, defensible data storytelling.",
    "Data Platform Architecture — Databricks, Azure (Synapse, Fabric, Blob, ML, Data Factory), PySpark, Apache Arrow, AWS (Kinesis, S3, SageMaker, Redshift), GCP, Cloudflare, medallion/lakehouse, real-time pipelines, ETL/ELT.",
    "Telemetry & Forensic Engineering — large-scale parallel log mining, fleet diagnostics across 4.5M+ devices, root-cause analysis under incident pressure, firmware risk governance.",
    "Strategic Leadership — enterprise AI roadmaps, technical-debt transformation, data governance & compliance, communities of practice, capability building, executive advisory, change management, emerging-market digitalisation."
  ],
  projects: [
    {
      id: "football-fan-segmentation",
      title: "Canal+ Football Fan Segmentation",
      description: "Designed and delivered a full-base football fan segmentation model across 7.81M South African subscribers for Canal+. Engineered the Football Affinity Score (FAS) weighted composite index calibrated against ~392K connected-decoder truth set.",
      liveUrl: "#",
      github: "#",
      sector: "Strategy & Politics",
      techStack: ["Databricks SQL", "Python", "Power BI", "FAS Model", "Nielsen/BRC Reconciliation"]
    },
    {
      id: "chicken-iq",
      title: "ChickenIQ Poultry App",
      description: "Vibrant, design-first poultry disease diagnosis and yield prediction app. Fully local-storage persisted, features multi-language support (English, Bemba, Nyanja) and interactive diagnosis questions.",
      liveUrl: "https://chicken-iq.pages.dev",
      github: "https://github.com/brytesika-AI/ChickenIQ",
      sector: "Agriculture & Health",
      techStack: ["React", "Vite", "Tailwind CSS", "Local Storage", "Internationalization"]
    },
    {
      id: "morupule-predictive",
      title: "Morupule Predictive Mining Intelligence",
      description: "Predictive scenario advisor for the Morupule coalfield. Forecasts coal yields, machinery duty cycles, and environmental compliance parameters using multivariate time-series models.",
      liveUrl: "https://morupule-predictive-intelligence.vercel.app/",
      github: "https://github.com/brytesika-AI/morupule-predictive-intelligence",
      sector: "Mining & Geology",
      techStack: ["Python", "pandas", "ARIMA", "Forecasting", "Streamlit"]
    },
    {
      id: "spectra",
      title: "SPECTRA.AI STB Digital Twin",
      description: "SORDI-inspired set-top-box (STB) fleet digital twin simulating a 98-smartcard cohort. 3D fault visualization and hardware fault injection (demod tuner, clock loop, thermal, CAS entitlement). Powered by Cloudflare Workers AI Llama 3.1.",
      liveUrl: "https://spectra-digital-twin.vercel.app",
      github: "https://github.com/brytesika-AI/digital-twin-media",
      sector: "Telco & IoT",
      techStack: ["Cloudflare Workers AI", "React 3D", "YOLO", "Synthetic Data", "FleetInsightsSpecialist"]
    },
    {
      id: "sentimentcommand",
      title: "SentimentCommand Election Intelligence",
      description: "Zambia 2026 AI election intelligence system. Implements a 5-Layer Decision Stack with 3 independent AI validation agents (Oracle, Strategis, Sentinex). Processes an 8.7M voter register with a 10 province breakdown.",
      liveUrl: "https://zambia-election-app.vercel.app",
      github: "https://github.com/brytesika-AI/Election-Tracker",
      sector: "Strategy & Politics",
      techStack: ["Next.js", "LangChain", "Multi-Agent System", "NLP", "Social APIs"]
    },
    {
      id: "geo-explorer-ai",
      title: "GeoExplorer AI Copper Prospectivity",
      description: "AI-driven geospatial copper prospectivity model mapping a 12,100-cell prediction grid in the Kalahari Copperbelt. Achieved a 0.903 ROC-AUC score using scikit-learn random forests and geological-rulebook scoring.",
      liveUrl: "https://geo-explorer-ai.bryte-sika.workers.dev",
      github: "https://github.com/brytesika-AI/geo-explorer-ai",
      sector: "Mining & Geology",
      techStack: ["Python", "scikit-learn", "GeoPandas", "Shapely", "Geospatial ML"]
    },
    {
      id: "abfagri",
      title: "abfAgri SADC Agricultural Intelligence",
      description: "Consequence-aware AI for SADC farmers. Integrates live SAFEX commodity prices, satellite field monitoring, AI-powered crop diagnosis, and Omnia product recommendations to address food security.",
      liveUrl: "https://abfagri.pages.dev",
      github: "https://github.com/brytesika-AI/abf_agriculture_intelligience",
      sector: "Agriculture & Health",
      techStack: ["React", "FastAPI", "SAFEX API", "Satellite Imagery API", "Llama 3.1"]
    },
    {
      id: "betcopilot-ai",
      title: "BetCopilot AI Sports Showcase",
      description: "Sports forecasting and predictive analytics dashboard. Renders match-outcome probabilities using local ML modeling engines.",
      liveUrl: "https://betcopilot-ai-showcase.pages.dev",
      github: "https://github.com/brytesika-AI/BetCopilot-AI",
      sector: "Strategy & Politics",
      techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "ML Modeling"]
    },
    {
      id: "tiny-tamagotchi",
      title: "Tiny Tamagotchi MVP",
      description: "Gamified simulation showcase designed using strict spec-driven development. Features interactive micro-animations, local state persistence, and responsive controls.",
      liveUrl: "https://tiny-tamagotchi-mvp.pages.dev",
      github: "https://github.com/brytesika-AI/Tiny-Tamagotchi-MVP",
      sector: "Strategy & Politics",
      techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Jest"]
    },
    {
      id: "hustle-ai-platforms",
      title: "Hustle AI Platforms Suite",
      description: "Multi-tenant business intelligence dashboards (CX, Fraud, Inventory, Revenue, Risk, Workforce) optimized for side-hustle business owners to sync operations.",
      liveUrl: "https://hustle-revenue-intelligence.pages.dev",
      github: "https://github.com/brytesika-AI/hustle-ai-platforms",
      sector: "Retail & Strategy",
      techStack: ["React", "Vite", "Tailwind CSS", "Recharts", "Multi-Tenant"]
    },
    {
      id: "africare",
      title: "AfriCare Pan-African Health",
      description: "AI-powered health intelligence platform active across 15 African nations, covering 47,310 facilities and reaching 8.2M patients. Real-time clinic telemetry, outbreak detection, and 60-day resource forecasting.",
      liveUrl: "https://africare.pages.dev",
      github: "https://github.com/brytesika-AI/africare",
      sector: "Agriculture & Health",
      techStack: ["Cloudflare Workers AI", "Llama 3.1", "LangChain ReAct", "FastAPI", "MLflow", "FHIR/DHIS2"]
    },
    {
      id: "dischem",
      title: "Dis-Chem Omni-Channel Inventory & GeoAI",
      description: "Medallion-architecture data platform with real-time inventory prediction and GeoAI site-selection framework for Dis-Chem's FY2026 expansion using demographic density and store-location ROI forecasts.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Data-Engineering-and-Architecture-project-Dischem-Mockup-",
      sector: "Retail & Strategy",
      techStack: ["Medallion Architecture", "Python", "GeoPandas", "ML Scoring", "PMO"]
    },
    {
      id: "aisrf",
      title: "AI-SRF PhD Thesis Artifact",
      description: "A 9-agent AI governance system for strategic resilience in emerging markets. Features African-archetype personas (The Tracker, The Induna, The Auditor) across five iterative stages. Implements ROR metrics and GEPA/DSPy.",
      liveUrl: "https://ai-srf-dashboard.pages.dev",
      github: "https://github.com/brytesika-AI/1PhD-Thesis---AI-in-strategic-Decision-making",
      sector: "Strategy & Politics",
      techStack: ["Cloudflare Workers", "Cloudflare D1/KV", "DSPy/GEPA", "Groq", "FastAPI", "Python", "Streamlit"]
    },
    {
      id: "kaggriculture",
      title: "Kaggriculture Farming Simulation",
      description: "Autonomous multi-agent farming simulation modelling agricultural decision-making through cooperative and competitive AI agents — demonstrating agentic AI applied to food-security and climate-resilience challenges.",
      liveUrl: "https://kagriculture.vercel.app",
      github: "https://github.com/brytesika-AI/Kaggriculture",
      sector: "Agriculture & Health",
      techStack: ["Next.js", "Vercel", "Multi-Agent Simulation", "Agricultural AI", "Game Theory"]
    },
    {
      id: "geoai-aquaculture",
      title: "GeoAI Aquaculture Pond Detection",
      description: "ITU/FAO AI for Good GeoAI Challenge entry using satellite imagery and machine learning to identify and map aquaculture ponds at scale. Live interactive map application for geospatial visualization.",
      liveUrl: "https://app-six-nu-23.vercel.app",
      github: "https://github.com/brytesika-AI/GeoAI-Aquaculture-Pond-Identification-Challenge-by-FAO-and-ITU",
      sector: "Agriculture & Health",
      techStack: ["Satellite Imagery", "GeoAI", "Geospatial ML", "Next.js", "Vercel", "Interactive Mapping"]
    },
    {
      id: "mosaic",
      title: "MOSAIC Enterprise Architecture Cockpit",
      description: "Cloudflare-native multi-agent Enterprise Architecture decision board and governance cockpit. Implements Executive Dashboard, Decision Studio, TIME Portfolio, Tech Debt Register, and Risk Heatmap.",
      liveUrl: "https://mosaic.bryte-sika.workers.dev",
      github: "https://github.com/brytesika-AI/MOSAIC-Merchant-OS-Architecture-Investment-Cockpit-v3.0-",
      sector: "Retail & Strategy",
      techStack: ["Cloudflare Workers", "Cloudflare D1", "Next.js", "React", "Multi-Agent AI", "TOGAF", "TIME Portfolio"]
    },
    {
      id: "geospatial-analysis-minerals",
      title: "Geospatial Analysis of Minerals",
      description: "Spatial analytics pipeline for mineral deposits in SADC regions. Integrates multi-spectral GIS mapping and deposit risk scoring.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Geospatial-Analysis-of-Minerals",
      sector: "Mining & Geology",
      techStack: ["Python", "Streamlit", "GeoPandas", "Shapely", "GIS Mapping"]
    },
    {
      id: "critical-minerals-intelligence",
      title: "Critical Minerals Intelligence Africa",
      description: "Analytical supply chain risk-scoring dashboard for critical mineral deposits across SADC regions.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Critical-Minerals-Intelligience-Africa",
      sector: "Mining & Geology",
      techStack: ["Python", "Streamlit", "Pandas", "Risk Modeling"]
    },
    {
      id: "ai-srf-streamlit-app",
      title: "AI-SRF Streamlit Portal",
      description: "Python Streamlit deployment of the AI-Augmented Strategic Reasoning Framework (AI-SRF) for corporate consultants.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/ai_srf_streamlit_app",
      sector: "Strategy & Politics",
      techStack: ["Python", "Streamlit", "LangChain", "Multi-Agent System"]
    },
    {
      id: "powerbi-fleet-mining",
      title: "Mining Power BI Fleet Analytics",
      description: "Developed Power BI-based fleet-management analytics for the mining industry, delivering operational visibility, vehicle telemetry, and predictive maintenance metrics.",
      liveUrl: "#",
      github: "#",
      sector: "Mining & Geology",
      techStack: ["Power BI", "Azure", "Mining Analytics", "Fleet Management"]
    },
    {
      id: "digital-strategy-coursebook",
      title: "Digital Strategy African Case Studies",
      description: "Authored 'Digital Strategy in the Era of AI' — a 12-case-study course book (Wharton-structured) across mining, media, and fintech, grounded in POPIA, King IV, and B-BBEE.",
      liveUrl: "#",
      github: "#",
      sector: "Strategy & Politics",
      techStack: ["Instructional Design", "African Regulatory Frameworks", "AI Governance"]
    },
    {
      id: "fsu",
      title: "FSU Telemetry IoT Analytics",
      description: "Multi-terabyte parallel telemetry pipeline with ProcessPoolExecutor (32 workers) for CPU decompression and Azure Blob mapping. Surfaced ~50% decoder failure rates across 4.5M+ devices.",
      liveUrl: "#",
      github: "#",
      sector: "Telco & IoT",
      techStack: ["Azure Blob SDK", "Python", "ProcessPoolExecutor", "ThreadPoolExecutor", "pandas", "T-SQL", "Power BI"]
    }
  ],
  experience: [
    {
      role: "Acting Principal Engineer — Data Analytics & Lead, Data Platforms & Engineering",
      company: "MultiChoice Group (a Canal+ Company)",
      location: "Johannesburg, South Africa",
      date: "Feb 2024 – Present",
      bullets: [
        "Selected for the **MultiChoice Executive Head Training Program** (April 2024). Own enterprise AI strategy and production ML across telecommunications, content delivery, and customer operations.",
        "**[SIGNATURE ACHIEVEMENT]** Designed and delivered a full-base football fan segmentation model across 7.81M South African subscribers for Canal+. Engineered the Football Affinity Score (FAS) composite index from 4 signals (package tier, geography, device class, subscription event bonus) calibrated against a ~392K connected-decoder truth set (AUC >=0.75) and reconciled to Nielsen Sports SA / BRC TAMS panels.",
        "**[ARTIFICIAL INTELLIGENCE]** Architected and deployed a production GenAI ensemble (Gemini 2.5 Flash + Qwen2.5-7B) processing 10K+ daily call-centre interactions aligned to the Customer, Hardware, Account, Programming (CHAP) framework, achieving a ~92% error reduction.",
        "**[ARTIFICIAL INTELLIGENCE]** Built a real-time AI churn-intelligence pipeline on Databricks converting voice logs into Churn Risk and CSAT metrics, enabling proactive churn intervention and revenue protection.",
        "**[ARTIFICIAL INTELLIGENCE]** Engineered a multimodal AI video-analytics pipeline (Gemini 2.5 Flash, base64 payload, AzureML, JSON-schema guards, Azure Blob) automating advert detection for the Addressable TV field trial.",
        "**[ARTIFICIAL INTELLIGENCE]** Enhanced DStv Shorts user experience through a GPT-4 Vision-powered automated video quality classification and verification pipeline.",
        "**[ARTIFICIAL INTELLIGENCE]** Delivered LLM call-classification systems for payment intelligence (Gemini 2.5 Flash batched structured JSON) and technical triage (Qwen2.5-7B via HuggingFace InferenceClient and Groq).",
        "**[ARTIFICIAL INTELLIGENCE]** Deployed a local 5-agent call classifier on Llama3.1 via Ollama, processing 106,761 call records end-to-end to establish a privacy-preserving, on-prem classification capability.",
        "**[ARTIFICIAL INTELLIGENCE]** Implemented AI-powered predictive maintenance and anomaly detection for set-top boxes (Python, AWS SageMaker) and piloted AI agents to analyze STB logs for early fault identification.",
        "**[ARTIFICIAL INTELLIGENCE]** Prototyped an autonomous agentic AI ecosystem for enterprise workflows (LangChain, CrewAI, OpenClaw) to resolve integration challenges in African digital-transformation contexts.",
        "**[EXECUTIVE ANALYTICS & BI]** Reframed DStv Stream as a ~9x growth opportunity by programmatically engineering a 13-slide executive report from ~12.89M active devices, correcting a material 17x -> ~9x data error and elevating the app to a flagged growth priority.",
        "**[EXECUTIVE ANALYTICS & BI]** Delivered weekly product-performance reporting to the Group CTO and C-suite using Power BI dashboards covering product activations, Box Office rentals, and feature utilization.",
        "**[EXECUTIVE ANALYTICS & BI]** Provided strategic data and connected-decoder usage analysis (~28% penetration, ~123K users) to support SuperSport App platform changes and API transition decisions.",
        "**[EXECUTIVE ANALYTICS & BI]** Led strategic technical-debt transformation: quantified 2,400+ issues (58% unresolved >1 year, ~700 launch-critical), developing Power BI backlog categorisation dashboards and securing executive sponsorship.",
        "**[EXECUTIVE ANALYTICS & BI]** Established enterprise KPI definitions and data-contract governance (T+1 SLAs, >=99% completeness checks) for cross-platform reporting across CII/Databricks and Amplitude.",
        "**[EXECUTIVE ANALYTICS & BI]** Built a real-time PMO synergy dashboard for the MultiChoice-Canal+ integration using dynamic Power BI semantic models and stakeholder-input simulations.",
        "**[EXECUTIVE ANALYTICS & BI]** Produced MECE executive analyses (scenario/sensitivity, CSat/NPS, site-downtime analytics) informing high-stakes platform and DTT network investment decisions.",
        "**[EXECUTIVE ANALYTICS & BI]** Authored an enterprise analytics-maturity roadmap (descriptive -> diagnostic -> predictive -> prescriptive) with reliability KPIs and a phased 12-month+ plan.",
        "**[TELEMETRY & DATA ENGINEERING]** Governed the safe shipment of 4.5M devices, enabling ~R710M in projected cost savings by building real-time log-ingestion and exception-monitoring pipelines that detected kernel failures across 27M+ endpoints, enforcing a 'No-Go' on Firmware Build B15.2.",
        "**[TELEMETRY & DATA ENGINEERING]** Built a multi-terabyte parallel telemetry pipeline (ProcessPoolExecutor 32 workers + ThreadPoolExecutor 50 threads) to parse Azure Blob logs and surface ~50% decoder failure rates fleet-wide.",
        "**[TELEMETRY & DATA ENGINEERING]** Engineered a distributed PySpark log-intelligence platform (pandas UDFs, Apache Arrow vectorisation (WASBS), pre-compiled regex bank) to extract exception stack traces.",
        "**[TELEMETRY & DATA ENGINEERING]** Authored a fleet-wide forensic RCA for the Explora 3B reboot crisis (~80% reboot loop): parsed ~72K lines of raw Irdeto IMW logs, isolated tuner BER spikes and OTA scheduler Unix epoch bugs, and delivered a 6-item prioritized remediation plan.",
        "**[TELEMETRY & DATA ENGINEERING]** Contributed to a P1 RCA on Explora Ultra reboot loop failures after a Secure Core FSU rollout, scoping mitigations across 24h / 72h / 2-3 week horizons.",
        "**[TELEMETRY & DATA ENGINEERING]** Delivered zero-downtime data migration and platform integration across the MultiChoice-Canal+ transition, ensuring reporting integrity.",
        "**[TELEMETRY & DATA ENGINEERING]** Optimised IoT costs via cloud-based data architecture and scalable infrastructure, reducing costs as the connected base scaled.",
        "**[TELEMETRY & DATA ENGINEERING]** Expanded African market reach through 3G integration for non-internet decoders, enabling access to select online services.",
        "**[AI STRATEGY, GOVERNANCE & LEADERSHIP]** Defined enterprise AI strategy, managed the AI demand pipeline, established an AI governance community of practice, POPIA compliance controls, and built cloud-native ML platforms."
      ]
    },
    {
      role: "Senior Engineer (Lead) — Data Analytics",
      company: "MultiChoice Group Technology",
      location: "Johannesburg, South Africa",
      date: "Feb 2017 – Jan 2024",
      bullets: [
        "**[COST OPTIMISATION]** Led IoT system refactoring and cloud cost optimisation, saving ~ZAR30M annually by implementing a data-archive lifecycle leveraging AWS S3 and Azure Data Lake Gen2 storage.",
        "**[CLOUD MIGRATION]** Collaborated on the Showmax streaming-app migration from AWS infrastructure to NBCUniversal's Peacock platform, successfully delivering the app to all devices.",
        "**[PERFORMANCE DASHBOARDS]** Designed and deployed cloud-based performance dashboards (Power BI, Azure Synapse, AWS Kinesis, Metrics Advisor, SageMaker Ground Truth) tracking IoT data, boosting CSat by 20% and reducing service calls by 15%.",
        "**[REAL-TIME PIPELINES]** Architected real-time data pipelines (Azure Stream Analytics, AWS Kinesis) for proactive identification of potential issues (missing assets, E48s, E16s) and faster incident response.",
        "**[ANOMALY DETECTION]** Implemented Azure Metrics Advisor for multivariate time-series anomaly detection, proactively identifying anomalies in real time.",
        "**[CONVERSATIONAL AI]** Created an Engineers Support Bot using GPT-4 and OpenAI Studio, improving customer-service efficiency and reducing resolution times.",
        "**[KNOWLEDGE MANAGEMENT]** Led rollout of knowledge-management systems incorporating Confluence and LLM integration, improving operational efficiency and knowledge sharing.",
        "**[EXECUTIVE INTERFACE]** Acted as a pivotal link between Technology Executives and data teams, and developed decoder swaps monitoring reports for MAH Executives in Nigeria."
      ]
    },
    {
      role: "Senior Customer Insights Lead / Senior Data Analyst Lead",
      company: "MultiChoice Group Analytics",
      location: "Johannesburg, South Africa",
      date: "Jan 2014 – Jan 2017",
      bullets: [
        "**[RETENTION STRATEGY]** Drove data-driven retention strategy: conducted cohort and behavioural analyses showing PVR customers had ~12.4% higher stickiness and on-demand services increased activity by ~6.4% for Premium subscribers.",
        "**[PREDICTIVE MODELLING]** Pioneered churn-prediction models using SAS, RapidMiner, and Python, improving marketing effectiveness by 2% and reducing customer churn by 7%.",
        "**[DATA AVAILABILITY]** Maintained 99.5% data availability for critical analytical systems by designing automated data-quality checks and streamlining ETL processes.",
        "**[CROSS-BORDER ANALYTICS]** Built SSIS/Spark data pipelines and Power BI reports supporting strategic decision-making across 43 African countries.",
        "**[DATA GOVERNANCE]** Implemented data governance frameworks using Data Vault, ensuring high data quality and consistency across Africa.",
        "**[BUDGET & PEOPLE]** Managed departmental budgets for analytics tools and provided mentorship and capability building to junior analysts."
      ]
    },
    {
      role: "Sessional Consultant — Digital Business",
      company: "Wits Business School, University of the Witwatersrand",
      location: "Johannesburg, South Africa",
      date: "Oct 2024 – Jan 2025",
      bullets: [
        "Collaborated with senior professors to develop digital business case studies, analysing real-world challenges and contributing to curriculum advancement in data strategy, cloud computing, big data analytics, and AI."
      ]
    },
    {
      role: "BI Operations Team Lead",
      company: "UTI (DSV)",
      location: "Johannesburg, South Africa",
      date: "Jan 2012 – Dec 2013",
      bullets: [
        "Led a global team to design, develop, and manage a Microsoft BI-based enterprise data warehouse and reporting suite, significantly improving BI efficiency and reliability.",
        "Successfully piloted a Hadoop-based data warehouse, demonstrating strategic foresight in big-data technologies."
      ]
    }
  ],
  education: [
    {
      degree: "PhD Candidate — Applied Artificial Intelligence",
      institution: "University of Johannesburg, College of Business & Economics",
      date: "2025 – Present",
      details: "Designing AI-SRF — a novel agentic AI governance framework for strategic resilience in emerging markets. Specified 22 functional requirements with safety constraints and a layered Sensing/Reasoning/Alignment/Self-Learning architecture. Built a nine-agent system with African-archetype personas (The Tracker, The Induna, The Auditor) across five iterative stages (Sense & Frame, Analyse & Understand, Ideate & Innovate, Evaluate & Decide, Act & Learn). Defined Return on Resilience (ROR) metrics, Digital Gauntlet, Silicon Sampling and GEPA/DSPy self-learning loop. Working prototype (WIP); ~26,000-word PhD proposal through supervisor review, arXiv preprint published, and a Design-Science journal article prepared for a top-tier IS venue."
    },
    {
      degree: "Master of Management, Digital Business (MMgt)",
      institution: "Wits Business School, University of the Witwatersrand",
      date: "2021 – 2023",
      details: "Coursework: Digital Business Fundamentals, Strategy for a Digital Age, Applied Big Data Analytics, Digital Transformation & Change Management, Innovation & Entrepreneurship, Fintech, Digital Marketing, e-Government. Thesis: Quantified the relationship between digitalisation and GDP in Botswana via multivariate time-series and OLS regression (R² = 0.995) using Python and Power BI (ARIMA modelling, Granger causality, correlation analysis, regression techniques)."
    },
    {
      degree: "Honours in Business Systems — Computer Science",
      institution: "Monash University (Australia)",
      date: "2009",
      details: "Specialized in software engineering, distributed systems, and computer science foundations."
    },
    {
      degree: "BSc, Computer Science",
      institution: "Copperbelt University (Zambia)",
      date: "2006",
      details: "Foundation degree in Computer Science."
    }
  ],
  certifications: [
    {
      category: "Microsoft Certifications",
      items: [
        "Microsoft Certified Fabric Analytics Engineer (DP-600)",
        "Microsoft Certified Azure Data Engineer Associate (DP-203)",
        "Microsoft Certified Data Analyst — Power BI (PL-300)",
        "Microsoft Certified Azure Fundamentals (AZ-900)",
        "Microsoft Certified BI Professional",
        "Microsoft Certified SharePoint Professional",
        "In progress: Azure Solutions Architect Expert; AWS Certified Solutions Architect Associate; AWS Certified Data Engineer"
      ]
    },
    {
      category: "AI, Cloud & Data",
      items: [
        "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
        "IBM Applied AI Engineer Professional Certificate",
        "Data Engineering with Google Cloud Professionals Certificate",
        "Google Certified Digital Marketing",
        "Prompt Engineering for ChatGPT (LLM)"
      ]
    },
    {
      category: "Product & Business Strategy",
      items: [
        "McKinsey Product Academy 2023 Alumni",
        "Product Analytics Certification",
        "Engineer AI Agents with Agent Development Kit (ADK) — Google Cloud (2026)",
        "Create Your First Gemini Enterprise Application — Google Cloud (2026)",
        "Build a Data Warehouse with BigQuery — Google Cloud (2026)"
      ]
    }
  ],
  technicalExpertise: [
    {
      category: "Languages & Query",
      skills: ["Python (pandas, scikit-learn, NumPy, PyTorch)", "T-SQL", "JavaScript / TypeScript", "R", "Java", "LaTeX"]
    },
    {
      category: "Data & Cloud Platforms",
      skills: ["Databricks", "Azure (Synapse, Fabric, Blob, ML, Data Factory, Metrics Advisor, Stream Analytics)", "PySpark", "Apache Arrow", "AWS (Kinesis, S3, SageMaker, Redshift)", "GCP (BigQuery, Dataflow)", "Cloudflare (Workers, D1, KV, Pages)", "SSIS", "Medallion/Lakehouse Architecture"]
    },
    {
      category: "Generative AI & Agents",
      skills: ["Gemini 2.5 Flash", "Qwen2.5-7B", "Llama3 (Ollama)", "GPT-4/4o Vision", "OpenAI Studio", "Groq", "HuggingFace InferenceClient", "LangChain", "CrewAI", "OpenClaw", "DSPy/GEPA", "Multi-Agent Architecture", "RAG Systems", "Multimodal Video AI"]
    },
    {
      category: "Analytics & BI",
      skills: ["Power BI (DAX, Semantic Models)", "Tableau", "Amplitude (Segment)", "SAS", "RapidMiner", "pptxgenjs", "MECE Frameworks", "Dynamics 365 Customer Voice"]
    },
    {
      category: "ML & Data Science",
      skills: ["scikit-learn", "PyTorch", "XGBoost", "Random Forest", "Forecasting (ARIMA)", "Anomaly Detection (SageMaker)", "Spatial ML (GeoPandas, Shapely)", "NLP Sentiment Analysis", "Churn Modelling", "Multivariate OLS Regression"]
    },
    {
      category: "Telemetry & Forensic Engineering",
      skills: ["Parallel Log Mining (ProcessPoolExecutor, ThreadPoolExecutor)", "Irdeto IMW Log Forensics", "IoT Fleet Telemetry", "Firmware Risk Governance", "Azure Blob SDK", "Boot-sequence State Machine Analysis"]
    },
    {
      category: "Frontend & Geospatial",
      skills: ["Next.js", "React", "Mapbox", "deck.gl", "GeoPandas", "FastAPI", "Streamlit"]
    },
    {
      category: "Governance & Collaboration",
      skills: ["Confluence", "Data Vault", "POPIA Compliance", "King IV", "B-BBEE", "Responsible AI Frameworks", "Data Contracts", "MLOps & Drift Detection"]
    }
  ],
  africanContext: [
    "Acting Principal Engineer & Lead, Data Platforms & Engineering at MultiChoice Group (a Canal+ company) — Africa's largest entertainment platform spanning 50 countries and 20M+ subscribers. Selected for the MultiChoice Executive Head Training Program.",
    "Fleet diagnostics and telemetry governance across 4.5M+ managed devices; governed safe shipment of 4.5M devices enabling ~R710M in projected technology cost savings (Home Ultra VIP trial).",
    "Authored a fleet-wide forensic RCA for the Explora 3B reboot crisis, isolating a three-layer root cause (Si2183 tuner BER ~1,800x median, NTP epoch bug, OTA/CAS trigger) across ~72,000 lines of raw Irdeto IMW debug logs.",
    "Pan-African deployment footprint: MultiChoice (50 countries), AfriCare (15 nations), abfAgri (SADC), SentimentCommand (Zambia 2026 election), Kavango mineral intelligence (SADC), Morupule predictive intelligence (Botswana).",
    "Designed AI-optimised for African infrastructure constraints: load-shedding resilience, intermittent edge connectivity, varied device capacities, and SADC regulatory spaces (POPIA, ECZ compliance Zambia, BoZ financial standards, Botswana/SA mining rules).",
    "AI applied to SADC's defining challenges: healthcare access (AfriCare), food security (abfAgri), mineral sovereignty (Kavango/GeoExplorer), electoral integrity (SentimentCommand), cloud cost optimisation (~ZAR30M annually saved), and digital education (Wits Business School coursebook)."
  ],
  research: [
    "Sikazwe B. (2025–Present). AI-Augmented Strategic Reasoning Framework (AI-SRF): Agentic AI for Strategic Resilience in Emerging Markets. University of Johannesburg (PhD). Preprint published on arXiv.",
    "Agentic AI Workforce Design for SMEs in Emerging Markets — Design Science Research methodology, under preparation.",
    "Digitalisation and GDP Growth: A Multivariate Time Series Analysis (Botswana case study) — Master's thesis, Wits Business School, OLS R²=0.995, Python + Power BI (ARIMA, Granger causality, correlation analysis, regression techniques).",
    "Digital Strategy in the Era of AI — Authored a 12-case-study course book (Wharton-structured) across mining, media and fintech, grounded in POPIA, King IV and B-BBEE."
  ],
  hobbies: [
    "Reading academic literature in AI safety, multi-agent frameworks, evolutionary economics, and strategic resilience — directly informs my PhD research at UJ.",
    "Tinkering with serverless edge runtimes, custom embedding vector pipelines, local LLMs (Ollama), and home-automation IoT.",
    "Mentoring data scientists and engineering students through African AI hackathons and capability-building programmes.",
    "Exploring high-altitude hiking, distance running, and authoring emerging-tech articles and digital business case studies."
  ],
  linkedinPosts: [
    {
      title: "Google Agentic AI & ADK Principles Certification",
      date: "May 2026",
      topic: "Agentic AI & Google ADK",
      summary: "Completed Google Cloud's 'Engineer AI Agents with Agent Development Kit (ADK)' certification. Key takeaway: building production AI agents requires moving away from monolithic, brittle prompting towards code-first modular systems — decoupling reasoning (the LLM planner) from execution (registered tools and skills) for predictable, auditable enterprise behaviour.",
      url: "https://www.linkedin.com/in/brytesika/"
    },
    {
      title: "Spec-Driven Development: Tiny Tamagotchi MVP",
      date: "May 2026",
      topic: "Spec-Driven AI Development",
      summary: "Tested spec-driven development by building 'Tiny Tamagotchi MVP' — writing precise markdown specifications first, then letting coding agents generate a modular, local-storage-persisted React pet simulation complete with Jest unit tests and GitHub Actions CI. Code is live on my GitHub (github.com/brytesika-AI).",
      url: "https://github.com/brytesika-AI"
    },
    {
      title: "PhD Research: AI-SRF & Return on Resilience (ROR)",
      date: "April 2026",
      topic: "PhD Research & Strategic AI",
      summary: "Traditional ROI metrics fail for enterprise AI in emerging markets because they ignore infrastructural shocks (load-shedding, network volatility). My UJ PhD presents the AI-SRF framework — a 9-agent system evaluating organisational Return on Resilience (ROR) using agentic simulations, bridging academic multi-agent theory with real-world enterprise strategy. arXiv preprint published.",
      url: "https://www.linkedin.com/in/brytesika/"
    },
    {
      title: "Behind the Screens: Explora 3B Reboot Loop Forensics",
      date: "March 2026",
      topic: "Log Forensics & Telemetry",
      summary: "Isolated a fleet-wide reboot loop crisis on Explora 3B satellite decoders: parsed ~72,000 lines of raw Irdeto IMW logs and a 674-row telemetry export, isolating three reinforcing layers — Si2183 tuner BER spikes (~1,800x median), OTA scheduler computing against 1970 Unix epoch, and a synchronised 58%→80% fleet spike. Delivered a 6-item P1/P2 remediation plan.",
      url: "https://www.linkedin.com/in/brytesika/"
    },
    {
      title: "Governing Safe Shipment of 4.5M Devices: ~R710M Cost Savings",
      date: "Feb 2026",
      topic: "Telemetry Governance & Risk",
      summary: "During the Home Ultra VIP firmware trial, built real-time log-ingestion and exception-monitoring pipelines detecting kernel-level failures across 27M+ endpoints. The evidence surfaced led to a data-driven 'No-Go' on Firmware Build B15.2, governing the safe shipment of 4.5M devices and enabling ~R710M in projected technology cost savings.",
      url: "https://www.linkedin.com/in/brytesika/"
    }
  ]
};
