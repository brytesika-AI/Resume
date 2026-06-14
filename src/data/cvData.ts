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
    title: "AI and Data Analytics Leader in AI Enablement",
    subtitle: "AI Strategist • Data Platforms & Engineering Leader • Enterprise Architecture",
    location: "Jackal Creek Estate, Honeydew, Johannesburg 2109, South Africa",
    email: "Bryte.sika@gmail.com",
    emailWork: "Bright.Sikazwe@canal-plus.com",
    phone: "+27 76 725 4353",
    linkedin: "https://www.linkedin.com/in/brytesika/",
    github: "https://github.com/brytesika-AI",
    summary: "Visionary AI Strategist and Data Platforms Engineering Leader with 13+ years translating complex data into strategic assets that drive business transformation across the media and technology sectors. Currently Acting Principal Engineer and Lead for Data Platforms & Engineering at MultiChoice Group (a Canal+ company) — Africa's largest entertainment platform (20M+ subscribers across 50 countries) — where I own AI strategy and production ML from use-case identification through deployment, governance and value tracking, while architecting the data platforms behind the MultiChoice–Canal+ integration. Selected for the MultiChoice Executive Head Training Program. Equally credible setting AI strategy in the boardroom, presenting to the Group CTO, and resolving P1 production incidents in raw device logs. PhD candidate at the University of Johannesburg researching the AI-Augmented Strategic Reasoning Framework (AI-SRF) — agentic AI for strategic resilience in emerging markets — with a published preprint and a journal article under preparation. Sessional consultant at Wits Business School."
  },
  competencies: [
    "AI & Machine Learning — production GenAI/LLM deployment (Gemini, Qwen, Llama3, GPT-4 Vision), multi-agent systems, multimodal video AI, NLP/sentiment analysis, churn intelligence, anomaly detection (SageMaker), MLOps & drift detection, responsible-AI governance, AI-SRF framework",
    "Executive Analytics & BI — C-suite and Group CTO reporting, KPI governance & data contracts, Power BI semantic models, DAX, MECE decision frameworks, VOC/CSAT/NPS analytics, cohort analysis, defensible data storytelling",
    "Data Platform Architecture — Databricks, Azure (Synapse, Fabric, Blob, ML, Data Factory), PySpark, Apache Arrow, AWS (Kinesis, S3, SageMaker, Redshift), GCP, Cloudflare, medallion/lakehouse, real-time pipelines, ETL/ELT",
    "Telemetry & Forensic Engineering — large-scale parallel log mining, fleet diagnostics across 4.5M+ devices, root-cause analysis under incident pressure, firmware risk governance",
    "Strategic Leadership — enterprise AI roadmaps, technical-debt transformation, data governance & compliance, communities of practice, capability building, executive advisory, change management, emerging-market digitalisation"
  ],
  projects: [
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
      title: "SPECTRA.AI Decoder Digital Twin",
      description: "SORDI-inspired set-top-box (STB) fleet digital twin simulating a 98-smartcard cohort. 3D fault visualization and hardware fault injection (demod tuner, clock loop, thermal, CAS entitlement). Synthesizes 148K YOLO/COCO frames/month. Powered by Cloudflare Workers AI Llama 3.1 and a multi-agent FleetInsightsSpecialist.",
      liveUrl: "https://spectra-digital-twin.vercel.app",
      github: "https://github.com/brytesika-AI/digital-twin-media",
      sector: "Telecommunications & Media",
      techStack: ["Cloudflare Workers AI", "React 3D", "YOLO", "Synthetic Data", "FleetInsightsSpecialist"]
    },
    {
      id: "sentimentcommand",
      title: "SentimentCommand Election Intelligence",
      description: "Zambia 2026 AI election intelligence system. Implements a 5-Layer Decision Stack with 3 independent AI validation agents (Oracle, Strategis, Sentinex). Processes an 8.7M voter register with a 10 province breakdown, integrating live SAFEX/BoZ/ECZ data. Operating at 72% model confidence with full audit trail.",
      liveUrl: "https://zambia-election-app.vercel.app",
      github: "https://github.com/brytesika-AI/Election-Tracker",
      sector: "Politics & Public Sector",
      techStack: ["Next.js", "LangChain", "Multi-Agent System", "NLP", "Social APIs"]
    },
    {
      id: "geo-explorer-ai",
      title: "GeoExplorer AI Copper Prospectivity",
      description: "AI-driven geospatial copper prospectivity model mapping a 12,100-cell prediction grid in the Kalahari Copperbelt. Achieved a 0.903 ROC-AUC score using scikit-learn random forests, shapefiles, and geological-rulebook scoring to highlight prospective drill zones.",
      liveUrl: "https://geo-explorer-ai.bryte-sika.workers.dev",
      github: "https://github.com/brytesika-AI/geo-explorer-ai",
      sector: "Mining & Geology",
      techStack: ["Python", "scikit-learn", "GeoPandas", "Shapely", "Geospatial ML"]
    },
    {
      id: "critical-minerals-intelligence",
      title: "Critical Minerals Intelligence Africa",
      description: "Macro-level SADC critical mineral deposits exploration and risk advisory framework. Modelled on KoBold's TerraShed, offering automated geological scoring and resource readiness assessments.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Critical-Minerals-Intelligience-Africa",
      sector: "Mining & Geology",
      techStack: ["SADC Data", "Risk Analysis", "Geology Scoring", "Strategic Planning"]
    },
    {
      id: "geospatial-analysis-minerals",
      title: "Geospatial Analysis of Minerals",
      description: "Geospatial data processing and visualization library containing custom converters for mining shapefiles, spatial interpolation, and resource density mapping across SADC target zones.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Geospatial-Analysis-of-Minerals",
      sector: "Mining & Geology",
      techStack: ["Python", "GeoPandas", "GIS", "Shapefiles", "Spatial Statistics"]
    },
    {
      id: "abfagri",
      title: "abfAgri SADC Agricultural Intelligence",
      description: "Consequence-aware AI for SADC farmers. Integrates live SAFEX commodity prices, satellite field monitoring, AI-powered crop diagnosis, and Omnia product recommendations. Directly addresses food security in Africa through precision AI.",
      liveUrl: "https://abfagriculturenext.vercel.app",
      github: "https://github.com/brytesika-AI/abf_agriculture_intelligience",
      sector: "Agriculture",
      techStack: ["React", "FastAPI", "SAFEX API", "Satellite Imagery API", "Llama 3.1"]
    },
    {
      id: "africare",
      title: "AfriCare Pan-African Health",
      description: "AI-powered health intelligence platform active across 15 African nations, covering 47,310 facilities and reaching 8.2M patients. Real-time clinic telemetry, outbreak detection, and 60-day resource forecasting. Employs Cloudflare Workers AI Llama 3.1 edge inference (<50ms global latency) and LangChain ReAct agents.",
      liveUrl: "https://africare.pages.dev",
      github: "https://github.com/brytesika-AI/africare",
      sector: "Healthcare",
      techStack: ["Cloudflare Workers AI", "Llama 3.1", "LangChain ReAct", "FastAPI", "MLflow", "FHIR/DHIS2"]
    },
    {
      id: "dischem",
      title: "Dis-Chem Omni-Channel Inventory & GeoAI",
      description: "Designed a medallion-architecture data platform with real-time inventory prediction (PMO charter: Gantt, RACI, risk register, ~R9.2M budget, 12-month timeline). GeoAI site-selection framework for FY2026 store expansion using demographic density and store-location ROI forecasts.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Data-Engineering-and-Architecture-project-Dischem-Mockup-",
      sector: "Retail & Strategy",
      techStack: ["Medallion Architecture", "Python", "GeoPandas", "ML Scoring", "PMO"]
    },
    {
      id: "aisrf",
      title: "AI-SRF PhD Thesis Artifact",
      description: "A 9-agent AI governance system for strategic resilience in emerging markets. Features African-archetype personas (The Tracker, The Induna, The Auditor) across five iterative stages. Implements Return on Resilience (ROR) metrics, Digital Gauntlet, Silicon Sampling and a GEPA/DSPy self-learning loop. arXiv preprint published.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/1PhD-Thesis---AI-in-strategic-Decision-making",
      sector: "Academic Research & Strategy",
      techStack: ["Cloudflare Workers", "Cloudflare D1/KV", "DSPy/GEPA", "Groq", "FastAPI", "Python", "Streamlit"]
    },
    {
      id: "ai-srf-streamlit",
      title: "AI-SRF Streamlit Dashboard",
      description: "Interactive board simulation companion app for the AI-SRF framework. Computes Return on Resilience (ROR) and lets stakeholders run 'Silicon Sampling' simulations under macro-economic shocks.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/ai_srf_streamlit_app",
      sector: "Academic Research & Strategy",
      techStack: ["Python", "Streamlit", "Gradio", "Visualisation", "API Integration"]
    },
    {
      id: "betcopilot",
      title: "BetCopilot AI Platforms",
      description: "Enterprise operations and predictive analytics copilot designed for African entertainment platforms. Provides workforce productivity insights, automated query categorization, and customer lifetime value forecasts.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/BetCopilot-AI",
      sector: "Fintech & Strategy",
      techStack: ["TypeScript", "React", "Next.js", "FastAPI", "Telemetry", "Fraud Detection"]
    },
    {
      id: "hustle-ai",
      title: "Hustle AI Business Orchestration",
      description: "AI product suite for African businesses: workforce, CX, revenue, inventory, risk, and fraud intelligence. Employs light edge models to manage inventories and run ledger audits.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/hustle-ai-platforms",
      sector: "Fintech & Strategy",
      techStack: ["TypeScript", "React", "Ledger Auditing", "Dynamic Personalisation"]
    },
    {
      id: "tamagotchi",
      title: "Tiny Tamagotchi Spec-Driven MVP",
      description: "Interactive state-persisted digital pet simulation demonstrating spec-driven engineering. Persisted in localStorage with robust Jest unit testing and automated GitHub Actions CI/CD workflows.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Tiny-Tamagotchi-MVP",
      sector: "Spec-Driven Product & Strategy",
      techStack: ["React", "TypeScript", "Vite", "Jest", "GitHub Actions"]
    },
    {
      id: "fsu",
      title: "FSU Telemetry IoT Analytics",
      description: "Multi-terabyte parallel telemetry pipeline with ProcessPoolExecutor (32 workers) for CPU-bound gzip decompression and ThreadPoolExecutor (50 threads) for Azure Blob. Tracks 12+ crash indicators across 4.5M+ devices; detected ~50% decoder failure rates. Delivered Power BI executive operations dashboards.",
      liveUrl: "#",
      github: "#",
      sector: "IoT & Telecommunications",
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
        "Selected for the Executive Head Training Program (April 2024). Own enterprise AI strategy and production ML across telecommunications, content delivery and customer operations.",
        "Architected and deployed a production GenAI ensemble (Gemini 2.5 Flash + Qwen2.5-7B) processing 10K+ daily call-centre interactions with automated accuracy monitoring, fallback routing and real-time dashboards aligned to the CHAP framework. Achieved ~92% error reduction.",
        "Built a real-time AI churn-intelligence pipeline on Databricks converting unstructured voice logs into quantifiable Churn Risk and CSAT metrics; complemented by VOC analysis identifying Push VOD CSAT running ~10% below target.",
        "Engineered a multimodal AI video-analytics pipeline (Gemini 2.5 Flash, base64 image payloads, AzureML Workspace, exponential-backoff retry, JSON-schema guards) for the Addressable TV field trial — automating advert detection and delivering QA intelligence dashboards.",
        "Built a GPT-4 Vision–powered classification and verification pipeline improving content quality controls and user experience on DStv Shorts.",
        "Delivered LLM call-classification systems for payment intelligence (6-category sub-classification: failed payments, auto-reconnection failures, short payments) and technical triage (Qwen2.5-7B via HuggingFace InferenceClient and Groq).",
        "Stood up a local 5-agent pipeline on Llama3.1 via Ollama, processing 106,761 call records end-to-end — demonstrating sovereign, privacy-preserving on-prem agentic classification at scale.",
        "Governed the safe shipment of 4.5M devices by building real-time log-ingestion and exception-monitoring pipelines that detected kernel-level failures across 27M+ endpoints, surfacing the evidence behind a data-driven 'No-Go' on Firmware Build B15.2 — enabling ~R710M in projected cost savings.",
        "Architected a hybrid-parallel Python telemetry pipeline (ProcessPoolExecutor 32 workers + ThreadPoolExecutor 50 threads) over Azure Blob Storage, tracking 12+ crash indicators and surfacing ~50% decoder failure rates across 4.5M+ managed devices.",
        "Engineered a distributed PySpark log-intelligence platform with pandas UDFs, Apache Arrow vectorisation (WASBS), pre-compiled regex bank, gzip UDF and dynamic pivot aggregation partitioned by DecoderModel and Date.",
        "Authored a fleet-wide forensic RCA for the Explora 3B reboot crisis (~80% of 98 monitored smartcards rebooting): analysed ~72,000 lines of raw Irdeto IMW debug logs and a 674-row telemetry export; isolated three reinforcing layers — (1) Si2183 tuner BER spikes ~735K (~1,800x median); (2) OTA scheduler computing against 1970 Unix epoch before NTP sync; (3) synchronised 58%→80% fleet spike. Delivered a 6-item P1/P2-prioritised remediation plan.",
        "Reframed DStv Stream as a ~9x growth opportunity: programmatically engineered a 13-slide executive report from ~12.89M active devices (SA + Nigeria ~74%), caught and corrected a material data error (inflated 17x → defensible ~9x runway). Elevated DStv Stream to a flagged strategic growth priority.",
        "Produced weekly/monthly Power BI dashboards for the Group CTO covering product activations (~4.15K monthly active Streama users), app usage (67,000 unique smartcards renting Box Office over 4 months) and feature utilisation (~20% of connected base using timeshift daily).",
        "Led technical-debt transformation: quantified 2,400+ issues (58% unresolved >1 year, ~700 jeopardising a strategic launch), developed Power BI dashboards and an executive business case; secured commendation from Exec Head Rudolf Kogler.",
        "Established enterprise KPI definitions and data-contract governance (T+1 SLAs, ≥99% completeness checks) for cross-platform reporting across CII/Databricks and Amplitude, creating a single defensible source of truth.",
        "Built a real-time PMO synergy dashboard for the MultiChoice–Canal+ integration; restructured fragmented Excel matrices into dynamic Power BI semantic models with stakeholder-input simulations.",
        "Delivered zero-downtime data migration across the MultiChoice–Canal+ integration with full continuity of data access and reporting integrity.",
        "AI Strategy & Roadmap: defined enterprise AI strategy, prioritised use cases by value-to-effort, managed AI demand pipeline, and secured executive buy-in through ROI narratives to C-suite forums.",
        "AI Governance & Responsible AI: established AI governance community of practice; defined responsible-AI principles, ethics frameworks and POPIA compliance controls.",
        "MLOps & Platform Architecture: built cloud-native ML platform with medallion patterns, model-deployment pipelines, monitoring and drift detection; enabled self-service AI."
      ]
    },
    {
      role: "Senior Engineer (Lead) — Data Analytics",
      company: "MultiChoice Group Technology",
      location: "Johannesburg, South Africa",
      date: "Feb 2017 – Jan 2024",
      bullets: [
        "Led IoT system refactoring and cloud cost optimisation, delivering ~30% cost reduction (~ZAR30M annually) by implementing a data-archive lifecycle leveraging S3 and Azure (Blob, Data Lake Gen2).",
        "Collaborated with global senior engineers and architects on the Showmax streaming-app migration from AWS to NBCUniversal's Peacock platform — app successfully delivered to all devices.",
        "Designed and deployed cloud-based performance dashboards (Power BI, Azure Synapse, AWS Kinesis, Metrics Advisor, SageMaker Ground Truth) increasing customer satisfaction by 20% and reducing service calls by 15%.",
        "Architected real-time data pipelines (Azure Stream Analytics, AWS Kinesis) enabling proactive identification of potential issues (missing assets, E48s, E16s) and faster incident response.",
        "Implemented Azure Metrics Advisor for multivariate time-series anomaly detection, proactively identifying anomalies in real time.",
        "Created an Engineers Support Bot using GPT-4 and OpenAI Studio, improving customer-service efficiency and reducing resolution times.",
        "Led rollout of knowledge-management systems incorporating Confluence and LLM integration, improving operational efficiency and knowledge sharing.",
        "Acted as pivotal link between Technology Executives and data teams, architecting tailored data pipelines to meet divisional requirements.",
        "Developed executive-level decoder swaps monitoring report for MAH Executives in Nigeria."
      ]
    },
    {
      role: "Senior Customer Insights Lead / Senior Data Analyst Lead",
      company: "MultiChoice Group Analytics",
      location: "Johannesburg, South Africa",
      date: "Jan 2014 – Jan 2017",
      bullets: [
        "Drove data-driven retention strategy: demonstrated PVR customers had ~12.4% higher stickiness and on-demand services increased activity by ~6.4% for Premium subscribers.",
        "Pioneered churn-prediction models using SAS, RapidMiner and Python; increased marketing-campaign effectiveness by 2% and reduced customer churn by 7%.",
        "Maintained 99.5% data availability for critical analytical systems through rigorous automated data-quality checks and streamlined ETL processes.",
        "Led a team developing data pipelines (Apache Spark/Databricks, SSIS, Power BI dataflow) and an operational data warehouse supporting strategic decisions across 43 African countries.",
        "Conceived and executed VOC, VAS, daily Customer Tracker, last-mile analysis, annual performance review and cohort report dashboards.",
        "Implemented data governance frameworks using Data Vault, ensuring high data quality and consistency across Africa.",
        "Played key role in initial development of IoT reporting for connected devices, informing product-development strategies.",
        "Managed departmental budgets for analytics tools and provided mentorship to junior analysts."
      ]
    },
    {
      role: "Sessional Consultant — Digital Business",
      company: "Wits Business School, University of the Witwatersrand",
      location: "Johannesburg, South Africa",
      date: "Oct 2024 – Jan 2025",
      bullets: [
        "Collaborated with senior professors to develop digital business case studies analysing real-world challenges in data strategy, cloud computing, big data analytics and AI.",
        "Contributed to curriculum advancement in digital business at one of Africa's leading business schools."
      ]
    },
    {
      role: "BI Operations Team Lead",
      company: "UTI (DSV)",
      location: "Johannesburg, South Africa",
      date: "Jan 2012 – Dec 2013",
      bullets: [
        "Led a global team to design, develop and manage a Microsoft BI–based enterprise data warehouse and reporting suite, significantly improving BI efficiency and reliability.",
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
    "Sikazwe B. (2025–Present). AI-Augmented Strategic Reasoning Framework (AI-SRF): Agentic AI for Strategic Resilience in Emerging Markets. University of Johannesburg (PhD). ~26,000-word proposal through supervisor review; arXiv preprint published; Design-Science journal article prepared for a top-tier IS venue.",
    "Agentic AI Workforce Design for SMEs in Emerging Markets — Design Science Research methodology, MISQ-standard format, under preparation.",
    "Digitalisation and GDP Growth: A Multivariate Time Series Analysis (Botswana case study) — Master's thesis, Wits Business School, OLS R²=0.995, Python + Power BI (ARIMA, Granger causality, correlation analysis).",
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
