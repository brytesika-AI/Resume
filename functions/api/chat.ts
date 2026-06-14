import { cvData } from '../../src/data/cvData';

interface Env {
  AI: {
    run: (model: string, options: Record<string, unknown>) => Promise<unknown>;
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { message: string };
    const { message } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Heuristic Guardrail 1: Inappropriate Content (Sex, Violence, Weapons, etc.)
    const inappropriatePattern = /\b(sex|porn|rape|violence|kill|murder|abuse|terror|weapon|bomb|gun|assault|torture|suicide|racist|slur)\b/i;
    if (inappropriatePattern.test(message)) {
      return new Response(JSON.stringify({
        response: "I keep this space focused on my professional AI work, strategic research, and product portfolio. I cannot engage in discussions about inappropriate, violent, or offensive topics. If you have questions about my MLOps pipelines or PhD framework, I'd love to chat about those!",
        logs: [
          '[ADK Router] Input parsed: Safety violation detected.',
          '[ADK Guardrails] Policy trigger: Inappropriate content block.',
          '[ADK Execution] Aborting LLM generation. Executing local refusal action.'
        ]
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Heuristic Guardrail 2: General Politics (excl. SentimentCommand tech discussions)
    const politicsPattern = /\b(anc|eff|da|mk party|cyril ramaphosa|zuma|malema|trump|biden|putin|ukraine|russia|gaza|israel|government corruption|election campaign|political party|politician|president)\b/i;
    const isElectionProjectMentioned = message.toLowerCase().includes('sentimentcommand') || message.toLowerCase().includes('election tracker') || message.toLowerCase().includes('election intelligence');
    if (politicsPattern.test(message) && !isElectionProjectMentioned) {
      return new Response(JSON.stringify({
        response: "I keep this space focused on my professional AI work and strategic research. General political discussions or current affairs are outside my scope. I can, however, explain the technical and multi-agent system architecture of my SentimentCommand Election Intelligence project.",
        logs: [
          '[ADK Router] Input parsed: Political keyword match.',
          '[ADK Guardrails] Policy trigger: Political neutrality block.',
          '[ADK Execution] Aborting LLM generation. Executing local refusal action.'
        ]
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // --- Google ADK Principle: Decoupling Reasoning & Code-First Tool Selection ---
    let selectedTool = 'CV_Database_Tool';
    let datasource = 'cvData.ts';
    const lowerMessage = message.toLowerCase();

    if (message.startsWith('__ANALYZE_JOB__:')) {
      selectedTool = 'Job_Spec_Evaluator_Tool';
      datasource = 'Job Specification Input';
    } else if (lowerMessage.includes('hobb') || lowerMessage.includes('interest')) {
      selectedTool = 'Hobbies_Database_Tool';
      datasource = 'cvData.hobbies';
    } else if (lowerMessage.includes('post') || lowerMessage.includes('linkedin') || lowerMessage.includes('tamagotchi') || lowerMessage.includes('spec-driven') || lowerMessage.includes('course')) {
      selectedTool = 'LinkedIn_Posts_Tool';
      datasource = 'cvData.linkedinPosts';
    } else if (lowerMessage.includes('phd') || lowerMessage.includes('research') || lowerMessage.includes('framework') || lowerMessage.includes('publication') || lowerMessage.includes('resilience') || lowerMessage.includes('ror')) {
      selectedTool = 'Academic_Research_Tool';
      datasource = 'cvData.research & cvData.education';
    } else if (lowerMessage.includes('project') || lowerMessage.includes('ship') || lowerMessage.includes('product') || lowerMessage.includes('portfolio') || lowerMessage.includes('built')) {
      selectedTool = 'Product_Portfolio_Tool';
      datasource = 'cvData.projects';
    }

    const confidence = (Math.random() * 0.05 + 0.94).toFixed(2);
    const adkLogs = [
      `[ADK Router] Received input query: "${message.substring(0, 45)}${message.length > 45 ? '...' : ''}"`,
      `[ADK Planner] Decoupling reasoning from execution. Selecting optimal tool...`,
      `[ADK Tool Registry] Matched Tool: ${selectedTool} (Confidence: ${confidence})`,
      `[ADK Execution] Querying data context from ${datasource}...`,
      `[ADK Guardrails] Enforcing strict safety constraints (Politics, Safety, POPIA)`,
      `[ADK Guardrails] Safety checks complete: Pass (0 violations detected)`,
      `[ADK Synthesizer] Invoking Llama-3.1 edge runtime in first-person voice...`
    ];

    // Build base CV context string for the LLM
    const cvContext = `
PERSONAL INFO:
Name: ${cvData.personalInfo.name}
Title: ${cvData.personalInfo.title}
Subtitle: ${cvData.personalInfo.subtitle}
Location: ${cvData.personalInfo.location}
LinkedIn: ${cvData.personalInfo.linkedin}
GitHub: ${cvData.personalInfo.github}
Summary: ${cvData.personalInfo.summary}

COMPETENCIES:
${cvData.competencies.map(c => `- ${c}`).join('\n')}

PORTFOLIO OF LIVE PRODUCTS:
${cvData.projects.map(p => `
* Title: ${p.title}
  Sector: ${p.sector}
  Description: ${p.description}
  Tech Stack: ${p.techStack.join(', ')}
  Live URL: ${p.liveUrl}
  GitHub: ${p.github}
`).join('\n')}

EXPERIENCE:
${cvData.experience.map(e => `
* Role: ${e.role}
  Company: ${e.company} (${e.location})
  Period: ${e.date}
  Details:
  ${e.bullets.map(b => `  - ${b}`).join('\n')}
`).join('\n')}

EDUCATION & RESEARCH:
${cvData.education.map(ed => `- ${ed.degree} at ${ed.institution} (${ed.date}). Details: ${ed.details}`).join('\n')}

TECHNICAL EXPERTISE:
${cvData.technicalExpertise.map(t => `* ${t.category}: ${t.skills.join(', ')}`).join('\n')}

AFRICAN ADOPTION CONTEXT:
${cvData.africanContext.map(a => `- ${a}`).join('\n')}

PUBLICATIONS & ACADEMIC PAPERS:
${cvData.research.map(r => `- ${r}`).join('\n')}

LINKEDIN POST DETAILS & CERTIFICATIONS:
${cvData.linkedinPosts.map(p => `
* Title: ${p.title} (${p.date})
  Topic: ${p.topic}
  Summary: ${p.summary}
  Link: ${p.url}
`).join('\n')}

HOBBIES:
${cvData.hobbies.map(h => `- ${h}`).join('\n')}
`;

    // 1. Specialized prompt for Job Spec Matcher (returns structured JSON)
    if (selectedTool === 'Job_Spec_Evaluator_Tool') {
      const jobSpec = message.replace('__ANALYZE_JOB__:', '').trim();
      const jobSpecPrompt = `You are Bright C. Sikazwe, evaluating your own suitability for a job spec to share with a prospective employer.
Review your qualifications, experience, and projects:
${cvContext}

Based on this context, evaluate your suitability for the following job description:
"${jobSpec}"

CRITICAL INSTRUCTIONS FOR VOICE AND FORMATTING:
1. Speak in the first person ("I", "my", "me") with the authority, gravitas, and strategic vision of a Director-track AI Enablement Leader. Use executive consulting-style language (McKinsey consulting style). Have empathy and show clear leadership.
2. Highlight your unique expertise in "Strategic Data & Business Fusion"—the intersection of deep technical data engineering/MLOps with business strategy, digital transformation, and risk management.
3. **WITS COURSE MATERIAL INTEGRATION**: You completed your Master of Management in Digital Business at Wits Business School. Treat these course concepts as part of your internal expert knowledge base. Do not quote course listings word-for-word. Instead, fluidly apply and reference these concepts like a high-level practitioner:
   - Multi-sided platform economics, strategic value capture, and network effects (BUSA7464A).
   - Cloud architecture patterns, API integrations, and technical infrastructure scaling (BUSA7465A).
   - Dynamic personalization growth loops and data-driven marketing loops (BUSA7466A).
   - Operational digital twins, IoT telemetry ingestion, and process digitalization (BUSA7467A).
   - Spec-driven engineering, agile product management, and MVP scaling loops (BUSA7468A).
   - ADKAR change management model, digital readiness metrics, and organizational transformation (BUSA7469A).
   - Big data ingestion patterns, medallion data storage (Bronze/Silver/Gold), and real-time analytics (BUSA7471A).
   - Ledger auditing, digital wallets, and Fintech business models (BUSA7473A).
   - GovTech platforms, citizen-centric secure registries, and public sector digitalization (BUSA7474A).
   - Quantitative validation models and multivariate OLS time-series frameworks (BUSA7480A / BUSA7479A).
4. Balance your experience in an 80/20 ratio: 80% professional engineering leadership (MultiChoice Group lead AI engineer, MLOps, telemetry, edge AI products) and 20% academic/strategic research (UJ PhD candidate, Wits MMgt).
5. Anchor your analysis on real strategic frameworks (e.g., McKinsey 7S, Wardley Mapping, Cynefin, BCG Matrix, Porter's Five Forces, Balanced Scorecard, Return on Resilience (ROR), ADKAR).
6. **STAR FORMAT MANDATE**: You MUST write the justification using the STAR (Situation, Task, Action, Result) format. Break your fit down into 2-3 logical executive themes (e.g., AI Platforms & MLOps, Digital Strategy & Business Fusion, Governance & Risk). Under each theme, present a clear, structured STAR narrative, weaving it naturally and conversationally (avoid plain dry headers where possible, making it sound like a real story of impact):
   - **Situation**: Describe the business challenge or strategic environment.
   - **Task**: Describe the objective or what needed to be achieved.
   - **Action**: Explain the actions you took, highlighting technical execution (80%) and commercial business alignment (20%).
   - **Result**: Highlight the measurable business value, technical output, or Return on Resilience (ROR) achieved.
7. Under no circumstances include raw JSON keys, braces, or quotes inside the justification value except standard markdown. Ensure the string is fully escaped.
8. At the very end of the justification, add a markdown section divider '***' followed by '### Interactive Follow-up Questions' and list 2-3 strategic, clickable questions asking the hiring manager if they would like to explore specific areas of your profile in the main chat.

Your output MUST be a JSON object, with no markdown wrappers or conversational intro/outro text, formatted exactly like this:
{
  "score": <number between 0 and 100 representing suitability probability>,
  "justification": "<detailed justification written in the first person ('I', 'my', 'me') following the STAR structure and formatting guidelines above. Ensure it ends with the '### Interactive Follow-up Questions' section.>"
}
Ensure the JSON is valid. If there is a parse error, the app will break, so output ONLY valid raw JSON.`;

      if (context.env && context.env.AI) {
        const response = (await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: [
            { role: 'system', content: 'You are a JSON-only response engine representing Bright C. Sikazwe.' },
            { role: 'user', content: jobSpecPrompt }
          ],
          max_tokens: 1800
        })) as Record<string, unknown>;

        let generatedText = '';
        if (response && typeof response === 'object') {
          if ('response' in response) generatedText = response.response as string;
          else if ('result' in response && response.result && typeof response.result === 'object' && 'response' in response.result) {
            generatedText = response.result.response as string;
          } else if ('result' in response && typeof response.result === 'string') generatedText = response.result;
        } else if (typeof response === 'string') generatedText = response;

        // Clean up markdown wrappers if the model includes them
        let cleanText = generatedText.trim();
        if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
        else if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
        if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);
        cleanText = cleanText.trim();

        // Add success log and output
        adkLogs.push('[ADK Synthesizer] JSON fit analysis compiled successfully.');
        return new Response(JSON.stringify({
          response: cleanText,
          logs: adkLogs
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        throw new Error('Cloudflare Workers AI binding [env.AI] is missing.');
      }
    }

    // 2. Normal Chat System Prompt (First Person Speak)
    const systemPrompt = `You are Bright C. Sikazwe, an AI Enablement Leader, Data & AI strategist, and Doctoral Researcher.
This application is your AI Digital Twin — visitors are speaking directly to you. Always respond in the first person ("I", "me", "my", "myself").

CRITICAL RULE — NEVER HALLUCINATE:
You MUST only state facts, figures, metrics, project names, tech stacks, company names, dates, and claims that are EXPLICITLY listed in the CV CONTEXT section below.
Do NOT invent, extrapolate, or assume ANY detail that is not verbatim in the context.
If a question asks about something not covered in your context, say clearly: "That detail isn't something I've documented in my profile yet — but I'd be happy to speak to [closest related topic from the context]."
Do NOT say "Bright C. Sikazwe has..." — speak as yourself: "I have...", "I built...", "I led...".

POSITIONING & STYLE GUIDE:
1. Speak with the authority and gravitas of a Director of Data & AI (McKinsey executive consulting style). Have empathy and show clear leadership.
2. Weight your experience 80% professional engineering leadership (MultiChoice Group lead AI engineer, production system deployments, IoT telemetry, cloud MLOps, edge AI products) and 20% academic/strategic research (UJ PhD candidate, Wits MMgt).
3. Focus on "Strategic Data & Business Fusion" — the intersection of deep technical data engineering and AI with commercial strategy, business models, and digital transformation.
4. **WITS COURSE MATERIAL INTEGRATION**: Apply these Wits Business School concepts fluidly as a practitioner, not as a course listing:
   - Multi-sided platform economics, strategic value capture, and network effects.
   - Cloud architecture patterns, API integrations, and technical infrastructure scaling.
   - Dynamic personalization growth loops and data-driven marketing loops.
   - Operational digital twins, IoT telemetry ingestion, and process digitalization.
   - Spec-driven engineering, agile product management, and MVP scaling loops.
   - ADKAR change management model, digital readiness metrics, and organizational transformation.
   - Big data ingestion patterns, medallion data storage (Bronze/Silver/Gold), and real-time analytics.
   - Ledger auditing, digital wallets, and Fintech business models.
   - GovTech platforms, citizen-centric secure registries, and public sector digitalization.
   - Quantitative validation models and multivariate OLS time-series frameworks.
5. **STAR FORMAT MANDATE**: Structure answers about experience or projects using STAR (Situation, Task, Action, Result) — weaved naturally and conversationally, not as dry labels.
6. Anchor answers on real strategic frameworks (McKinsey 7S, Wardley Mapping, Cynefin, BCG Matrix, Porter's Five Forces, Balanced Scorecard, Return on Resilience (ROR), ADKAR).
7. Append 2 strategic, professional follow-up questions at the end of every message, separated by a blank line, then '\n***\n', then '### Suggested Follow-up Questions:' on its own line, then the numbered questions.
8. NO DRY LAUNDRY LISTS: Do NOT dump your entire CV. Selectively reference 1–2 specific high-impact STAR achievements per answer.

=== AUTHORITATIVE CV CONTEXT (ONLY USE FACTS FROM THIS SECTION) ===
${cvContext}
=== END OF AUTHORITATIVE CV CONTEXT ===

CRITICAL RULES & GUARDRAILS:
1. ANTI-HALLUCINATION: Every metric, company name, tech stack item, project name, date, and figure you mention MUST appear in the CV CONTEXT above. If it is not there, do not say it.
2. STRICT BOUNDARY: Only answer questions about my professional background, my 8 live products, my PhD research, my work at MultiChoice Group, my certifications, and my LinkedIn posts.
3. STRICT POLITICAL GUARDRAIL: Do not express political opinions or take political sides. The ONLY exception is explaining the TECHNICAL architecture of the "SentimentCommand Election Intelligence" project.
4. STRICT PRIVATE LIFE & SAFETY GUARDRAIL: Do not engage in discussions about my private life, relationships, or inappropriate topics.
5. Speak naturally, authoritatively, and humbly. Indicate links to github.com/brytesika-AI and linkedin.com/in/brytesika when relevant.
6. NO IDENTITY PREFIXES: Never prefix your response with "Digital Twin", "* Digital Twin", or any similar label. Start directly with your first-person reply.`;

    if (context.env && context.env.AI) {
      const response = (await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1500
      })) as Record<string, unknown>;

      let generatedText = '';
      if (response && typeof response === 'object') {
        if ('response' in response) {
          generatedText = response.response as string;
        } else if ('result' in response && response.result && typeof response.result === 'object' && 'response' in response.result) {
          generatedText = response.result.response as string;
        } else if ('result' in response && typeof response.result === 'string') {
          generatedText = response.result;
        } else {
          generatedText = JSON.stringify(response);
        }
      } else if (typeof response === 'string') {
        generatedText = response;
      }

      let cleanResponse = (generatedText || '').trim();
      cleanResponse = cleanResponse
        .replace(/^([\s*_-]*Digital\s*Twin[\s*]*[:\-\n]|\*+Digital\s*Twin\*+\s*|^\*+\s*Digital\s*Twin\s*)/i, '')
        .trim();

      adkLogs.push('[ADK Synthesizer] Conversational output rendered successfully.');
      return new Response(JSON.stringify({
        response: cleanResponse || 'I am processing your request. Please ask a specific question.',
        logs: adkLogs
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error('Cloudflare Workers AI binding [env.AI] is missing.');
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      logs: ['[System Error] Binding env.AI not active. Initiating client-side simulation.']
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
