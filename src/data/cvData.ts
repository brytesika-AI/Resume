export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  github: string;
  sector: string;
  techStack: string[];
  status?: "Live in production" | "Client engagement" | "Delivered" | "Prototype";
  client?: string;
  period?: string;
  outcomes?: string[];
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

export interface ConsultingOffer {
  practice: string;
  headline: string;
  pitch: string;
  services: { name: string; outcome: string; deliverables: string }[];
  caseStudies: { client: string; context: string; result: string }[];
  engagementModels: string[];
  cta: { label: string; mailto: string };
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    subtitle: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    credly: string;
    summary: string;
  };
  consulting: ConsultingOffer;
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
    title: "Fractional Head of Data & AI | Growth Analytics · AI Agents · Data Platforms",
    subtitle: "Founder & Principal, brytesika-AI  •  Acting Principal Engineer, MultiChoice Group (a Canal+ company)",
    location: "Johannesburg, South Africa",
    email: "Bryte.sika@gmail.com",
    linkedin: "https://www.linkedin.com/in/brytesika/",
    github: "https://github.com/brytesika-AI",
    credly: "https://www.credly.com/users/bright-sikazwe",
    summary: "I help growing businesses stop arguing about their numbers and start acting on them. I join remotely, find where the data and the decisions are out of step, and ship working systems within weeks: a tested data warehouse, direct marketing feeds, machine-learning models in production, and executive reports leaders actually use to decide spend, pricing and retention. I deliver as one senior person directing a small team of AI agents under strict guardrails — read-only by default, cost-capped, additive changes only, human approval before anything reaches people — so clients get a consulting team's output at a contractor's cost, with an audit trail. Seventeen years in data and AI, eleven of them leading platforms for a ~20M-subscriber, 46-market business at MultiChoice Group (a Canal+ company). Based in Johannesburg, working remotely with clients in the US, UK, Europe and the Middle East: full overlap with UK and EU hours, and mornings for US East."
  },
  consulting: {
    practice: "brytesika-AI — independent data & AI consultancy",
    headline: "Fractional Head of Data & AI",
    pitch: "I help growing businesses stop arguing about their numbers and start acting on them. I join remotely, find where the data and decisions are out of step, and ship working systems within weeks: a tested data warehouse, direct marketing feeds, machine-learning models in production, and executive reports leaders actually use to decide spend, pricing and retention.",
    services: [
      {
        name: "Data Foundation Sprint (4–6 weeks)",
        outcome: "A reconciled warehouse matching source to the penny.",
        deliverables: "Reconciled warehouse (BigQuery, Fabric or Databricks), direct feeds from Meta, Google Ads, GA4, Klaviyo and payments, and nightly checks that match the source to the penny."
      },
      {
        name: "Marketing Truth Fix (2–3 weeks)",
        outcome: "True CAC, ROAS and channel attribution without agency misfiling.",
        deliverables: "Find where GA4 and agency tagging misfile buyers; a rules engine that restates channels nightly; VAT-correct cost per new customer and payback by channel."
      },
      {
        name: "Retention & Churn Model (3–4 weeks)",
        outcome: "Calibrated churn scoring and commercial levers sized in your currency.",
        deliverables: "Calibrated churn scoring, value at risk, and the payment and renewal levers sized in your currency."
      },
      {
        name: "AI Agents for Operations (4–8 weeks)",
        outcome: "Production agents with human approval, evaluation and cost limits.",
        deliverables: "Agents that monitor, classify, triage and draft — with human approval, evaluation and cost limits designed in."
      },
      {
        name: "Fractional Head of Data (ongoing)",
        outcome: "2–3 days a month senior data & AI leadership.",
        deliverables: "Roadmap, executive reporting, agency oversight, data governance and hiring support."
      },
      {
        name: "Data & AI Health Check (1 week)",
        outcome: "Fixed-price diagnostic: what to trust, what to fix, what to build, and what it will cost.",
        deliverables: "Diagnostic report: what to trust, what to fix, what to build, and what it will cost."
      }
    ],
    caseStudies: [
      {
        client: "Raffle House — UK prize-draw and subscription business (~£9m revenue)",
        context: "Move from manual, person-dependent reporting to an automated, tested analytics platform leadership trusts. Direct work with founders, COO, CMO and agencies.",
        result: "Rebuilt BigQuery warehouse alongside production: £23.9m revenue, 1.38m orders, 81.7k subscriptions; 24 automated nightly checks matching source to penny. Direct Meta, Klaviyo, Google Ads and GA4 feeds on Cloud Run at no tool cost. Channel rules engine corrected 30% of buyers' channels (34% → 2.7% organic; recovered 10,400 email buyers). Calibrated churn model sizing ~£49k/mo likely to lapse; forecast at 16.5% error. Sized ~£56k/mo in failed payments; VAT-correct CAC; seven executive reports running for pennies a day."
      },
      {
        client: "MultiChoice Group (a Canal+ company) — enterprise data & AI leadership",
        context: "Enterprise data & AI leadership for a ~20M-subscriber, 46-market business running a 14-million-device transformation programme.",
        result: "Led the Technical Calls Intelligence Platform (140,798 calls, 12 value streams, migrated from Microsoft Fabric to AWS, live) and five-agent incident-triage pipeline. Guided fix for ~1.4M devices; cut security exposure from 52% to under 1%."
      }
    ],
    engagementModels: [
      "Data Foundation Sprint (4–6 weeks) — warehouse, direct feeds, nightly penny-level reconciliation.",
      "Marketing Truth Fix (2–3 weeks) — channel attribution cleanup, rules engine, VAT-correct CAC.",
      "Retention & Churn Model (3–4 weeks) — calibrated ML scoring, value at risk, payment levers.",
      "AI Agents for Operations (4–8 weeks) — monitoring, triage, classification with human-in-the-loop guardrails.",
      "Fractional Head of Data (ongoing) — 2–3 days a month roadmap, reporting, governance & hiring.",
      "Data & AI Health Check (1 week) — fixed-price diagnostic on trust, fixes, builds and costs."
    ],
    cta: {
      label: "Book a discovery call",
      mailto: "mailto:Bryte.sika@gmail.com?subject=Consulting%20enquiry%20via%20AI%20Digital%20Twin"
    }
  },
  competencies: [
    "Enterprise AI, Data & Digital Strategy — define and execute data/AI strategy tied to business priorities; strategic roadmaps and investment prioritisation; drive AI adoption from concept through scaling to value realisation across a 46-market enterprise.",
    "Business Value Realisation — AI and analytics delivering measurable outcomes (a 52%→<1% risk reduction, segmentation driving marketing addressability across ~5.5M customers, VAT-correct CAC/ROAS reshaping spend decisions); value tracking and benefits reporting built in.",
    "Capability Enablement & Industrialisation — define data/AI architecture, platform standards, governance and lifecycle management; secure, reliable, cost-effective solutions (pennies-a-day builds, 97%+ query-cost reductions).",
    "AI & Data Governance (ethics, risk, privacy) — authored an enterprise responsible-AI standard (Build→Secure→Evaluate→Ship); data-quality registers with sign-off; PII protection, least-privilege IAM; doctoral specialism in ethical and responsible AI.",
    "Workforce Enablement & Stakeholder Partnership — build data/AI literacy and standards consumed by teams of engineers; mentor analysts and engineers; partner directly with CEOs, senior VPs and business leaders on commercial value."
  ],
  projects: [
    {
      id: "raffle-house",
      title: "Raffle House | Growth Analytics & ML Platform",
      description: "UK subscription brand (~£9m). Six weeks: tested BigQuery warehouse (24 nightly checks), direct Meta/Klaviyo/Google Ads/GA4 feeds, channel engine correcting 30% of buyers' channels (34% → 2.7% organic), calibrated churn model (~£49k/month at risk), forecast at 16.5% error, seven executive reports, all running for pennies a day.",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI",
      sector: "Growth & Commerce",
      techStack: ["BigQuery", "BigQuery ML", "Cloud Run", "Secret Manager", "GA4", "Meta Marketing API", "Klaviyo", "Google Ads", "Claude MCP"],
      status: "Client engagement",
      client: "Raffle House",
      period: "Sept 2026 – present",
      outcomes: [
        "Rebuilt BigQuery warehouse alongside production: £23.9m all-time revenue, 1.38m orders, 81.7k subscriptions; 24 automated checks matching source to penny.",
        "Direct Meta, Klaviyo, Google Ads and GA4 feeds on Cloud Run with secrets in Secret Manager at no tool cost.",
        "Channel rules engine corrected 30% of buyers' channels: GA4 showed organic social at 34%, true was 2.7%; recovered 10,400 email buyers filed as 'Unassigned'.",
        "Calibrated churn model (2.9× lift in riskiest 10%; held on unseen month) sizing ~£49k/month likely to lapse; forecast back-tested at 16.5% error (vs 24% baseline)."
      ]
    },
    {
      id: "strategylab-ai",
      title: "StrategyLab AI | McKinsey-Grade Business Strategy Decision Engine",
      description: "McKinsey-grade business strategy decision engine providing analytical frameworks, structured MECE problem-solving, and automated strategic validation of business initiatives using agentic LLM workflows.",
      liveUrl: "https://strategylab-ai.bryte-sika.workers.dev/",
      github: "https://github.com/brytesika-AI/AI-Strategy-tools",
      sector: "Strategy & Politics",
      techStack: ["Cloudflare Workers", "React", "AI Decision Engine", "McKinsey Frameworks", "MECE"]
    },
    {
      id: "merchant-gameboard",
      title: "Merchant Gameboard | Informal-Merchant Health Intelligence",
      description: "Live, explainable view of informal-merchant health built from payment-terminal signals, modelled on a South African fintech environment (100k+ terminals, ~3M daily transactions across spaza shops in Soweto, Khayelitsha, Umlazi, Tembisa and Mitchells Plain). Gemini 2.5 Flash explainability chips (source · reasoning · confidence + recommended action), zero-shot merchant-pattern classification, and World Bank macro indicators — on synthetic PaySim data with SASSA grant surges and load-shedding dips.",
      liveUrl: "https://merchant-gameboard.pages.dev",
      github: "https://github.com/brytesika-AI/Merchant-Gameboard",
      sector: "Fintech",
      techStack: ["Cloudflare Pages Functions", "Hono", "Gemini 2.5 Flash", "Hugging Face Zero-Shot", "World Bank API", "PaySim Synthetic Data"]
    },
    {
      id: "brytesika-fintech",
      title: "BryteSika Fintech Platform",
      description: "AI-driven financial-services ecosystem consolidating three platforms: an Autonomous Field Ops engine (agent routing, geotagged offline collection, agent wallets), a Proactive Credit Co-Pilot (real-time credit-risk scoring, dynamic limits, automated recovery alerts), and a Zero-Touch onboarding engine (KYC/AML, document OCR, fraud screening, instant account provisioning).",
      liveUrl: "#",
      github: "https://github.com/brytesika-AI/Fintech",
      sector: "Fintech",
      techStack: ["Python", "FastAPI", "Node.js", "scikit-learn", "Redis", "PostgreSQL"]
    },
    {
      id: "agroresilience-africa",
      title: "AgroResilience Africa | Continental Crop Monitoring & AI Forecasting",
      description: "Edge-computed geospatial platform tracking crop health and forecasting yields across Africa using Digital Earth Africa's Open Data Cube (STAC API). Computes Sentinel-2 Enhanced Vegetation Index (EVI) with SCL cloud masking directly in Cloudflare Workers, with Workers AI yield narratives — grounded in Zambia's Mkushi Farm Block, Southern Province drought early-warning and SUA Tanzania field validation.",
      liveUrl: "https://agro-resilience-africa.pages.dev",
      github: "https://github.com/brytesika-AI/AgroResilience-Africa---Continental-Crop-Monitoring-AI-Forecasting-System",
      sector: "Agriculture & Health",
      techStack: ["Cloudflare Workers AI", "Digital Earth Africa STAC", "Sentinel-2 EVI", "React", "Leaflet", "Cloudflare KV"]
    },
    {
      id: "fan-segmentation",
      title: "Canal+ Smartcard Fan Segmentation",
      description: "Classified 489,425 connected smartcards from decoder telemetry into four validated activation cohorts (298,772 activatable), surviving three independent validation tests and adopted cross-border with Canal+; extended by proxy modelling to the ~5.5M unconnected base — commercial AI driving marketing addressability at scale.",
      liveUrl: "#",
      github: "#",
      sector: "Telco & IoT",
      techStack: ["Databricks SQL", "Python", "Power BI", "Decoder Telemetry", "Proxy Modelling"]
    },
    {
      id: "chicken-iq",
      title: "ChickenIQ Poultry App",
      description: "Vibrant, design-first poultry disease diagnosis and yield prediction app. Fully local-storage persisted, features multi-language support (English, Bemba, Nyanja) and interactive diagnosis questions.",
      liveUrl: "https://chicken-iq.pages.dev",
      github: "#",
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
      role: "Founder & Principal — Independent Data & AI Consultant",
      company: "brytesika-AI (independent data & AI consultancy)",
      location: "Johannesburg, South Africa (remote, UK, US & Africa clients)",
      date: "2025 – Present",
      bullets: [
        "Data, analytics and AI engagements for clients in the UK and Africa, including Raffle House; ~10 production AI systems; 18+ public repositories at github.com/brytesika-AI.",
        "**[RAFFLE HOUSE]** Rebuilt the BigQuery warehouse alongside production: £23.9m all-time revenue, 1.38m orders, 81.7k subscriptions; 24 automated checks every morning matching source to the penny. Direct Meta, Klaviyo, Google Ads and GA4 feeds on Cloud Run with secrets in Secret Manager at no tool cost.",
        "**[MARKETING TRUTH]** Channel rules engine corrected 30% of buyers' channels: GA4 showed organic social at 34% of buyers; true figure was 2.7%. Recovered 10,400 email buyers filed as 'Unassigned'.",
        "**[MACHINE LEARNING]** Calibrated churn model (2.9× lift in riskiest 10%; held up on unseen month) sizing ~£49k a month likely to lapse; caught raw probabilities overstated more than four times. New-customer forecast back-tested at 16.5% error against 24% for baseline.",
        "**[COMMERCIAL IMPACT]** Sized ~£56k a month in failed or unapproved payments; made paid efficiency VAT-correct; seven executive reports with scenario planner for price, retention and spend running for pennies a day."
      ]
    },
    {
      role: "Acting Principal Engineer & Lead, Data Platforms & Engineering",
      company: "MultiChoice Group (a Canal+ Company)",
      location: "Johannesburg, South Africa",
      date: "2025 – Present",
      bullets: [
        "Lead the enterprise data and AI capability for a ~20M-subscriber business across 46 markets — strategy, architecture, platform standards, governance, and the industrialisation of AI across markets; formal team lead with matrixed leadership across engineering, analytics, security and marketing; daily executive engagement with senior VP leadership on value and investment.",
        "**[EXECUTIVE ANALYTICS]** Designed and operate the executive analytics platform (Azure Data Lake → Fabric → Power BI, Databricks) steering a 14-million-device transformation programme across 46 markets — the daily insight update is the single source of truth senior VP leadership uses to steer remediation.",
        "**[PRODUCTION AI]** Designed and operate a five-agent classification pipeline that triages priority incidents automatically, governed under a written lifecycle; plus a 12-category MECE AI taxonomy that isolated a contact-centre surge's root cause across 94,490 contacts (89.8% resolved to account level).",
        "**[GOVERNANCE]** Authored the Build→Secure→Evaluate→Ship responsible-AI standard applied across all AI and data work; ran a portfolio-wide audit surfacing and remediating four critical findings.",
        "Selected for the **MultiChoice Executive Head Training Program** (April 2024).",
        "**[ARTIFICIAL INTELLIGENCE]** Architected and deployed a production GenAI ensemble (Gemini 2.5 Flash + Qwen2.5-7B) processing 10K+ daily call-centre interactions aligned to the Customer, Hardware, Account, Programming (CHAP) framework, achieving a ~92% error reduction.",
        "**[ARTIFICIAL INTELLIGENCE]** Built a real-time AI churn-intelligence pipeline on Databricks converting voice logs into Churn Risk and CSAT metrics, enabling proactive churn intervention and revenue protection.",
        "**[ARTIFICIAL INTELLIGENCE]** Engineered a multimodal AI video-analytics pipeline (Gemini 2.5 Flash, AzureML, JSON-schema guards, Azure Blob) automating advert detection for the Addressable TV field trial.",
        "**[ARTIFICIAL INTELLIGENCE]** Deployed a local 5-agent call classifier on Llama3.1 via Ollama, processing 106,761 call records end-to-end to establish a privacy-preserving, on-prem classification capability.",
        "**[EXECUTIVE ANALYTICS & BI]** Reframed DStv Stream as a ~9x growth opportunity by programmatically engineering a 13-slide executive report from ~12.89M active devices, correcting a material 17x -> ~9x data error.",
        "**[EXECUTIVE ANALYTICS & BI]** Led strategic technical-debt transformation: quantified 2,400+ issues (58% unresolved >1 year, ~700 launch-critical), developing Power BI backlog categorisation dashboards and securing executive sponsorship.",
        "**[EXECUTIVE ANALYTICS & BI]** Established enterprise KPI definitions and data-contract governance (T+1 SLAs, >=99% completeness checks) for cross-platform reporting across Databricks and Amplitude, and built a real-time PMO synergy dashboard for the MultiChoice–Canal+ integration."
      ]
    },
    {
      role: "Senior Engineer: Infield Insights (Engineering Analytical)",
      company: "MultiChoice Group (a Canal+ Company)",
      location: "Johannesburg, South Africa",
      date: "2019 – 2025",
      bullets: [
        "Built and owned the subscriber-telemetry, secure-core, and entitlement analytics estate.",
        "**[AI SEGMENTATION]** Classified 489,425 connected smartcards from decoder telemetry into four validated activation cohorts (298,772 activatable), surviving three independent validation tests and adopted cross-border with Canal+; extended by proxy modelling to the ~5.5M unconnected base.",
        "**[RISK REDUCTION]** Led Secure Core integrity analytics cutting a critical device-integrity exposure from 52% to under 1% of fleet; forensic analytics isolated a fault affecting ~1.6M devices and guided a fix that resolved ~1.4M.",
        "**[TELEMETRY & DATA ENGINEERING]** Governed the safe shipment of 4.5M devices, enabling ~R710M in projected cost savings by building real-time log-ingestion and exception-monitoring pipelines that detected kernel failures across 27M+ endpoints, enforcing a 'No-Go' on Firmware Build B15.2.",
        "**[TELEMETRY & DATA ENGINEERING]** Built a multi-terabyte parallel telemetry pipeline (ProcessPoolExecutor 32 workers + ThreadPoolExecutor 50 threads) to parse Azure Blob logs and surface ~50% decoder failure rates fleet-wide; engineered a distributed PySpark log-intelligence platform (pandas UDFs, Apache Arrow vectorisation).",
        "**[TELEMETRY & DATA ENGINEERING]** Authored a fleet-wide forensic RCA for the Explora 3B reboot crisis (~80% reboot loop): parsed ~72K lines of raw Irdeto IMW logs, isolated tuner BER spikes and OTA scheduler Unix epoch bugs, and delivered a 6-item prioritized remediation plan.",
        "**[COST OPTIMISATION]** Led IoT system refactoring and cloud cost optimisation, saving ~ZAR30M annually by implementing a data-archive lifecycle leveraging AWS S3 and Azure Data Lake Gen2 storage.",
        "**[PERFORMANCE DASHBOARDS]** Designed and deployed cloud-based performance dashboards (Power BI, Azure Synapse, AWS Kinesis, Metrics Advisor, SageMaker) tracking IoT data, boosting CSat by 20% and reducing service calls by 15%.",
        "**[REAL-TIME PIPELINES]** Architected real-time data pipelines (Azure Stream Analytics, AWS Kinesis) and Azure Metrics Advisor anomaly detection for proactive identification of issues (missing assets, E48s, E16s).",
        "**[CLOUD MIGRATION]** Collaborated on the Showmax streaming-app migration from AWS infrastructure to NBCUniversal's Peacock platform.",
        "**[CONVERSATIONAL AI]** Created an Engineers Support Bot using GPT-4 and OpenAI Studio and led rollout of Confluence + LLM knowledge-management, reducing resolution times."
      ]
    },
    {
      role: "Senior Analytics Lead, Group Analytics (2015–2019) · Senior Data Analyst (2014–2015)",
      company: "MultiChoice Group",
      location: "Johannesburg, South Africa",
      date: "Jan 2014 – 2019",
      bullets: [
        "Progressive analytics leadership from analyst to group analytics lead — group-wide subscriber, sales and marketing analytics; built the segmentation and reporting foundations the enterprise now runs on.",
        "**[RETENTION STRATEGY]** Cohort and behavioural analyses showing PVR customers had ~12.4% higher stickiness and on-demand services increased activity by ~6.4% for Premium subscribers.",
        "**[PREDICTIVE MODELLING]** Pioneered churn-prediction models using SAS, RapidMiner, and Python, improving marketing effectiveness by 2% and reducing customer churn by 7%.",
        "**[CROSS-BORDER ANALYTICS]** Built SSIS/Spark data pipelines and Power BI reports supporting decision-making across African markets; maintained 99.5% data availability with automated data-quality checks; implemented Data Vault governance."
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
      role: "BI Operations Lead",
      company: "UTi Worldwide",
      location: "Johannesburg, South Africa",
      date: "2012 – 2014",
      bullets: [
        "Led a global team to design, develop, and manage a Microsoft BI-based enterprise data warehouse and reporting suite for logistics operations; piloted a Hadoop-based data warehouse."
      ]
    },
    {
      role: "BI Consultant",
      company: "Standard Bank Group",
      location: "Johannesburg, South Africa",
      date: "2011 – 2012",
      bullets: [
        "ETL and reporting in regulated financial services."
      ]
    },
    {
      role: "Junior Lecturer",
      company: "Monash University",
      location: "South Africa",
      date: "2009 – 2010",
      bullets: [
        "Teaching and research in computing and AI."
      ]
    }
  ],
  education: [
    {
      degree: "PhD Candidate — Ethical & Responsible AI for Strategic Decision-Making",
      institution: "University of Johannesburg, College of Business & Economics",
      date: "2025 – Present",
      details: "Designing AI-SRF — an agentic AI governance framework for strategic resilience in emerging markets. Specified 22 functional requirements with safety constraints and a layered Sensing/Reasoning/Alignment/Self-Learning architecture. Built a nine-agent system with African-archetype personas (The Tracker, The Induna, The Auditor) across five iterative stages (Sense & Frame, Analyse & Understand, Ideate & Innovate, Evaluate & Decide, Act & Learn). Defined Return on Resilience (ROR) metrics, Digital Gauntlet, Silicon Sampling and GEPA/DSPy self-learning loop. ~26,000-word PhD proposal through supervisor review, arXiv preprint published, and a Design-Science journal article prepared for a top-tier IS venue."
    },
    {
      degree: "Master of Management, Digital Business (MMgt)",
      institution: "Wits Business School, University of the Witwatersrand",
      date: "2021 – 2023",
      details: "Coursework: Digital Business Fundamentals, Strategy for a Digital Age, Applied Big Data Analytics, Digital Transformation & Change Management, Innovation & Entrepreneurship, Fintech, Digital Marketing, e-Government. Thesis: Quantified the relationship between digitalisation and GDP in Botswana via multivariate time-series and OLS regression (R² = 0.995) using Python and Power BI (ARIMA modelling, Granger causality, correlation analysis, regression techniques)."
    },
    {
      degree: "BSc Honours, Computing",
      institution: "Monash University",
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
      category: "Professional Certifications (2026)",
      items: [
        "AWS Certified AI Business Strategist (Oct 2026)",
        "Google Cloud Professional Data Engineer (Sept 2026)",
        "Microsoft Certified Azure Data Engineer Associate (DP-203)",
        "Microsoft Certified Fabric Analytics Engineer Associate (DP-600)",
        "Microsoft Certified Power BI Data Analyst Associate (PL-300)",
        "Oracle Cloud Infrastructure Generative AI Professional",
        "Anthropic — Claude API, MCP, Agent Skills",
        "In progress: GCP Professional Cloud Architect; AWS Data Engineer; AWS Generative AI Developer Professional"
      ]
    },
    {
      category: "AI, Agents & Responsible AI",
      items: [
        "Google Cloud AI-agent path — Agent Development Kit (ADK), A2A protocol, Model Context Protocol (MCP), Agent Engine, multi-agent orchestration",
        "Google Responsible AI series — Fairness & Bias; Interpretability & Transparency; Privacy & Safety",
        "MLOps for Generative AI (Google Cloud)",
        "Google Skills Diamond League — 28,700+ points, 45+ badges",
        "IBM Applied AI Engineer Professional Certificate"
      ]
    },
    {
      category: "Anthropic (2026)",
      items: [
        "Claude with Google Cloud Vertex AI",
        "Model Context Protocol — Advanced Topics",
        "Building with the Claude API",
        "Introduction to Agent Skills",
        "AI Fluency: Framework & Foundations"
      ]
    },
    {
      category: "Product & Business Strategy",
      items: [
        "McKinsey Product Academy 2023 Alumni",
        "Product Analytics Certification"
      ]
    },
    {
      category: "In Progress",
      items: [
        "Google Cloud Professional Cloud Architect",
        "AWS Data Engineer Associate",
        "AWS Generative AI Developer Professional",
        "Full transcripts: credly.com/users/bright-sikazwe"
      ]
    }
  ],
  technicalExpertise: [
    {
      category: "Languages & Query",
      skills: ["SQL (BigQuery, Databricks SQL, T-SQL)", "Python (pandas, scikit-learn, NumPy, PyTorch)", "JavaScript / TypeScript", "R", "LaTeX"]
    },
    {
      category: "Data & Cloud Platforms",
      skills: ["Google BigQuery", "Databricks / Spark", "Azure (Data Lake, Fabric, Synapse, ML, Data Factory, Stream Analytics)", "AWS (Kinesis, S3, SageMaker, Redshift)", "Cloudflare (Workers, D1, KV, Pages)", "Medallion/Lakehouse & Star-Schema Architecture"]
    },
    {
      category: "Growth & Marketing Analytics",
      skills: ["GA4", "Meta Marketing API", "Google Ads Connectors", "Cohort LTV", "CAC & Payback", "Survival / Churn Curves", "Attribution", "Scenario Modelling", "Reconciliation Testing"]
    },
    {
      category: "Generative AI & Agents",
      skills: ["Claude API", "Gemini 2.5 Flash", "Qwen2.5-7B", "Llama3 (Ollama)", "GPT-4/4o Vision", "Groq", "Model Context Protocol (MCP)", "A2A", "Google ADK", "LangChain", "CrewAI", "DSPy/GEPA", "Multi-Agent Architecture", "RAG Systems", "Multimodal Video AI"]
    },
    {
      category: "Analytics & BI",
      skills: ["Power BI (DAX, Semantic Models)", "Executive Dashboards", "Tableau", "Amplitude", "SAS", "RapidMiner", "MECE Frameworks"]
    },
    {
      category: "ML & Data Science",
      skills: ["scikit-learn", "PyTorch", "XGBoost", "Random Forest", "Forecasting (ARIMA)", "Anomaly Detection", "Spatial ML (GeoPandas, Shapely)", "NLP Sentiment Analysis", "Churn Modelling", "Multivariate OLS Regression"]
    },
    {
      category: "Telemetry & Forensic Engineering",
      skills: ["Parallel Log Mining (ProcessPoolExecutor, ThreadPoolExecutor)", "Irdeto IMW Log Forensics", "IoT Fleet Telemetry", "Firmware Risk Governance", "Azure Blob SDK"]
    },
    {
      category: "Governance, Security & Collaboration",
      skills: ["Responsible AI (Build→Secure→Evaluate→Ship)", "IAM & Least-Privilege", "Secret Manager", "PII Protection", "POPIA Compliance", "Data-Validity Registers", "Data Contracts", "MLOps & Drift Detection", "King IV"]
    }
  ],
  africanContext: [
    "Acting Principal Engineer & Lead, Data Platforms & Engineering at MultiChoice Group (a Canal+ company) — a ~20M-subscriber business across 46 markets. Selected for the MultiChoice Executive Head Training Program.",
    "Executive analytics platform steering a 14-million-device transformation programme across 46 markets; Secure Core analytics cut a critical device-integrity exposure from 52% to under 1% of fleet.",
    "Governed safe shipment of 4.5M devices enabling ~R710M in projected technology cost savings; authored a fleet-wide forensic RCA for the Explora 3B reboot crisis across ~72,000 lines of raw Irdeto IMW debug logs.",
    "Pan-African deployment footprint: MultiChoice (46 markets), AfriCare (15 nations), abfAgri & AgroResilience Africa (SADC crop intelligence), Merchant Gameboard (South African informal-merchant fintech), SentimentCommand (Zambia 2026 election), Morupule predictive intelligence (Botswana).",
    "Designed AI for African infrastructure constraints: load-shedding resilience, intermittent edge connectivity, varied device capacities, and SADC regulatory spaces (POPIA, ECZ compliance Zambia, BoZ financial standards, Botswana/SA mining rules).",
    "AI applied to SADC's defining challenges: healthcare access (AfriCare), food security (abfAgri, AgroResilience), financial inclusion (Merchant Gameboard, Fintech platform), mineral sovereignty (GeoExplorer), electoral integrity (SentimentCommand), and digital education (Wits Business School coursebook)."
  ],
  research: [
    "Sikazwe B. (2025–Present). AI-Augmented Strategic Reasoning Framework (AI-SRF): Ethical and Responsible Agentic AI for Strategic Decision-Making in Emerging Markets. University of Johannesburg (PhD). Preprint published on arXiv.",
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
