# Working Projects: Detailed Write-ups (October 2026)

Each project below has five parts:
- a status line
- the problem it solved
- what you built
- the results
- the tools and platforms it runs on

At the end of each project there is a short version for a website project card or a CV. Every figure comes from your own documents or from what you've told me. Section 9 lists figures that disagree between sources, so you can confirm them before publishing.

---

## 1. Raffle House — Growth Analytics & ML Platform
**Status:** Client engagement, live · **Client:** Raffle House (UK prize-draw and subscription business, ~£9m revenue a year) · **Period:** Sept 2026 – present · **Role:** Independent Data, AI & Analytics Consultant (Fractional Head of Data & AI), through brytesika-AI · **Mode:** Remote

**Problem.** Reporting was manual and depended on individual people. GA4, the agencies and finance disagreed on which channels were driving new customers. Leadership had no tested numbers to decide spend, pricing or retention.

**What I built (in six weeks)**
- **Warehouse:** a parallel BigQuery star schema, built alongside production so nothing live changed. It covers £23.9m of all-time revenue, 1.38m orders, 136m tickets and 81.7k subscriptions.
- **Nightly checks:** 24 automated checks every morning match revenue, rows, tickets and subscriptions to the source, to the penny. They also catch duplicates, orphan keys, stale data, double-counted spend, VAT inconsistencies and tagging errors.
- **Direct feeds, at no tool cost:**
  - Meta Marketing API and Klaviyo, nightly on Cloud Run
  - the Google Ads transfer
  - the GA4 export
  - Secrets sit in Secret Manager and run on a company-owned service account, with no key files.
  - A planned paid tool was replaced with a direct API feed.
- **Channel rules engine:** seven priority rules stored as data. It keeps GA4's original channel next to every row for audit, plus a nightly check for mis-tagged links and a link-tagging standard for the agencies.
- **Churn model:** a BigQuery ML boosted tree trained on 250k monthly snapshots, with separate training and test months and no leakage from the outcome. It won against logistic regression.
- **New-customer forecast:** a 90-day forecast using bank holidays, paydays, Black Friday, draw closes and planned spend. It retrains weekly.
- **Anomaly alerts:** explainable alerts on revenue, new customers and spend, with known causes labelled automatically.
- **Reports:** seven executive reports (Daily, Weekly, Monthly, Draw cycle, Quarterly, Leadership, Marketing) and a scenario planner for price, retention and spend.
- **Metadata layer:** a column dictionary and metric definitions, so people and AI agents query one version of the truth.

**Results**
- **Channels:** 30% of buyers' channels corrected. GA4 showed organic social at 34% of buyers; the true figure was 2.7%. 10,400 email buyers had been filed as "Unassigned" and were recovered.
- **Churn:** the riskiest 10% of subscriptions lapse at 2.9× the average rate and hold about half the value that lapses. AUC is 0.68 on a month the model never saw. About £49k a month is likely to lapse within 45 days.
- **Calibration catch:** I found that raw probabilities were inflated more than four times (44% predicted against an 8% true rate). Calibrating them cut value at risk from £227k to £49k a month.
- **Forecast:** back-tested at 16.5% error, against 24% for a simple baseline.
- **Commercial levers sized:**
  - ~£56k a month in failed or unapproved payments
  - one point of renewal retention is worth ~£4k a month
  - customers whose first purchase was a subscription earn back their acquisition cost within 90 days 77% of the time, against 15% for one-off buyers
- **Paid efficiency:** made VAT-correct. The true cost per new customer is ~20% above the platform figure. It fell from ~£57 to £34 (inc VAT) in a year, on 43% less spend.
- **Subscriber count:** fixed to include multi-month plans, adding ~1,000 paying subscriptions (29,390 on 30 Sept).
- **2-for-1 launch:** success measures were fixed before launch. On launch day the read flagged a new pattern: 51 free subscription starts, against 58 across the previous three weeks.
- **Running cost:** pennies a day. The whole churn build scanned under 0.5 GB.

**How I delivered it.** I worked as one senior person directing AI agents:
- a planner and reviewer (Claude)
- a build agent (a local coding agent using gcloud)
- scheduled monitoring agents
- machine learning that runs inside the warehouse

Guardrails: read-only by default, dry run and cost cap before every build step, additive changes only, and my approval before anything reached people. Independent re-checks caught four errors before release.

**Stack:** BigQuery, BigQuery ML (ARIMA_PLUS, TimesFM, boosted trees, logistic regression, anomaly detection), Cloud Run, Secret Manager, IAM, GA4, Google Ads, Meta Marketing API, Klaviyo, Claude with MCP connectors, HTML/SVG/Chart.js reports.

**Card version:** *UK subscription brand (~£9m). Six weeks: tested BigQuery warehouse (24 nightly checks), direct Meta/Klaviyo/Google Ads/GA4 feeds, channel engine correcting 30% of buyers' channels (34% → 2.7% organic), calibrated churn model (~£49k/month at risk), forecast at 16.5% error, seven executive reports, all running for pennies a day.*

---

## 2. Technical Calls Strategic & Operational Intelligence Platform — MultiChoice
**Status:** Live in production on AWS · **Client:** MultiChoice Group (a Canal+ company) · **Period:** 2026 · **Role:** Technical Lead, AI & Data Engineering

**Problem.** Operations could count technical calls but couldn't explain them. They couldn't see which business decision had failed, who owned it, or which calls could have been prevented.

**What I built**
- **The question it answers:** I turned an AI-agent experiment into a company-wide capability. Every call is mapped to:
  - an enterprise outcome (customer experience, service reliability, revenue protection, retention, digital adoption or efficiency)
  - one of 12 customer value streams
  - the upstream decision that failed
  - an accountable owner
  - a preventive intervention
- **Data foundation:** a medallion lakehouse over 140,798 call records (140,796 unique after removing duplicates), with protected keys, masked identifiers and zero validation failures.
- **AI layer:** a classification taxonomy covering 12 areas, with 60+ structured output fields.
  - Cheap models handle routine calls; stronger models or people handle low-confidence cases.
  - A quality-judge model checks the output, and every step is logged for audit.
- **Moved from Microsoft Fabric to AWS:** the value was proved on Fabric, then the platform moved to serverless AWS (S3, Glue, Step Functions, EventBridge, Athena and Bedrock batch inference). Cost now rises and falls with use.

**Results**
- An intervention portfolio ranked by value, strategic fit, feasibility, data readiness, risk and time to value.
- KPIs ready for reporting:
  - preventable calls
  - calls moved to digital channels
  - potential for automation
  - repeat contacts
  - revenue and retention at risk
  - customer effort
- It covers financial processes too: payment allocation, financial suspension versus technical reauthorisation, and reconnection.

**Stack:** Microsoft Fabric, AWS (S3, Glue, Step Functions, EventBridge, Athena, QuickSight, Bedrock batch), PySpark, LLM structured outputs, personal-data masking (POPIA).

**Card version:** *140,798 customer calls mapped to 12 value streams, failed decisions and owners; proved on Fabric, now live on serverless AWS with Bedrock batch inference; ranked intervention portfolio with agreed KPIs.*

---

## 3. Five-Agent Incident Triage Pipeline — MultiChoice
**Status:** Live in production · **Client:** MultiChoice Group

**Problem.** First-line triage of priority incidents was manual and slow.

**What I built.** A five-agent classification pipeline that runs on live operational data. The agents use tools and reason through each incident, a person takes over when needed, and the pipeline must pass evaluation checks before each release. It runs under my written Build → Secure → Evaluate → Ship standard, which a portfolio-wide audit validated: the audit found four critical (P0) issues, and all were fixed.

**Card version:** *Five-agent triage of priority incidents in production, with human escalation and evaluation gates before release.*

---

## 4. Support Call Transcript Classifier (Decoder Error Codes) — MultiChoice
**Status:** Completed and validated (Sept 2026) · **Client:** MultiChoice Group

**Problem.** Support conversations needed classifying by decoder error code, so that network faults and billing blockers reach the right team first time.

**What I built.** An automated classification engine using local LLMs (Ollama, LangChain) and the Claude API. Personal data is masked with pattern rules before any model sees it. An earlier version, a local five-agent classifier on Llama 3.1, processed 106,761 call records end to end without the data leaving MultiChoice's own systems.

**Card version:** *LLM classification of support calls by decoder error code, with personal data masked before any model call; separates network faults from billing blockers.*

---

## 5. FSU/CCA Fleet Upgrade Analytics — CANAL+ and MultiChoice
**Status:** Delivered and ongoing · **Client:** MultiChoice and CANAL+ · **Role:** Data lead, and primary data partner to Platform Operations & Broadcast leadership

**Problem.** A security software rollout across 14M+ devices in 46 countries needed daily evidence to steer the fixes.

**What I built**
- The daily analytics leadership uses to steer the programme.
- Adoption tracking on trial groups.
- Root-cause analysis.
- After enforcement in South Africa on 8 Sept 2026, an analysis of the incident surge: contact-centre calls classified into clear, non-overlapping categories, with the affected smartcards identified individually.

**Results**
- Adoption in trial groups went from 28% to 55%+ in six days.
- A fault affecting ~1.6M devices was isolated, and the fix was guided for ~1.4M.
- Security-integrity exposure fell from 52% of devices to under 1%.

**Card version:** *Data lead for a 14M-device, 46-country rollout with CANAL+: daily executive view, adoption 28% → 55%+ in six days, fault isolated on ~1.6M devices, exposure cut from 52% to under 1%.*

---

## 6. EPL Viewer Cohorts and Football Fan Segmentation — CANAL+ and MultiChoice
**Status:** Delivered · **Client:** CANAL+ (via MultiChoice Advanced Analytics)

**Problem.** CANAL+ needed to know who actually watches the English Premier League, and how intensely, so it could target retention and win-back offers.

**What I built**
- Classified connected smartcards by live EPL viewing intensity, using CANAL+'s cumulative-minute bands from decoder telemetry. The earlier phase covered ~231K smartcards; the latest covered 489,425.
- Four campaign-ready cohorts: Retain, Win-Back, Upsell and Awareness.
- A Football Affinity Score estimate for the ~5.5M subscribers whose decoders aren't connected.

**Results**
- 298,772 activatable customers fed to marketing-automation platforms.
- An 8× gap against CANAL+'s viewing-panel benchmark was resolved with the Paris team. The gap came from different definitions, not an error, and the agreed definition became a joint standard.
- The cohorts passed three independent validation tests before marketing used them.

**Stack:** Databricks SQL, Python, Power BI, Excel; decks in CANAL+ branding.

**Card version:** *489,425 smartcards classified by EPL viewing intensity into four campaign cohorts; 298,772 activatable customers sent to marketing automation; 8× gap with the Paris team resolved into a joint standard.*

---

## 7. Enterprise Telemetry Platform — MultiChoice
**Status:** Operational and actively maintained · **Client:** MultiChoice Group

**What it is.** The pipelines that process decoder telemetry for 20M subscribers and 14M connected devices across 46 markets. They run on GCP BigQuery, Microsoft Fabric, Databricks and dbt. Log mining was rebuilt to filter data on the server and ingest in parallel, which cut processing time and compute cost across markets.

**Card version:** *Telemetry pipelines for 14M connected devices across 46 markets on BigQuery, Fabric, Databricks and dbt; re-engineered log mining cut processing time and compute cost.*

---

## 8. brytesika-AI Products (applied AI practice)
- **ChickenIQ:** Live at chicken-iq.pages.dev. A poultry advice app that works offline. It detects disease using Cloudflare Workers AI, with a ResNet-50 filter before a Llama vision model, and is benchmarked against the Hy-Line Brown breed standard. It includes a Test Lab and supports English, Bemba and Nyanja.
- **MOSAIC v3:** A tool for deciding whether to build, buy or integrate technology, built on Cloudflare (Workers AI, D1, Vectorize), with multiple agents that improve over time.
- **Kavango / GeoExplorer:** Critical-minerals intelligence built on Cloudflare, using H3 hexagonal mapping and an open geological rulebook. The copper prospectivity model scored 0.903 ROC-AUC across a 12,100-cell grid.
- **SentimentCommand:** Zambia election intelligence using real ECZ data, Monte Carlo forecasting and a scenario lab. Describe it on technical terms only.
- **AfriCare:** Pan-African health intelligence. Describe it as an applied research project deployed as a real application, not commercial work.
- **AI-SRF (PhD artefact):** A multi-agent governance framework built on Google ADK. An arXiv preprint is published.

---

## 9. Figures to confirm before publishing
1. **Raffle House:** your earlier notes say "11.8× attribution discrepancy resolved" and "attributable revenue raised from under 1% to ~36%". Your October CV document doesn't use either figure, and its cost per new customer differs from an older version (£47 → £28 there, against £57 → £34 inc-VAT now). I've used the October figures. Add the older ones back only if they're still correct.
2. **EPL:** the smartcard count changed from ~231K to 489,425 between phases. Use 489,425 for the latest phase.
3. **Five-agent pipelines:** the triage pipeline and the call classifier on Llama 3.1 (106,761 calls) are both five-agent systems. Keep them as two separate items so a reader doesn't take them as the same system.
4. **Permission:** check that Raffle House is happy to be named with its figures. If not, use "a UK prize-draw and subscription business" and give results as percentages.
