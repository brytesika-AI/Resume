import { useState, useEffect, useRef, type FormEvent } from 'react';
import { 
  MessageSquare, 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  Globe, 
  Send, 
  Check, 
  Shield, 
  TrendingUp,
  MapPin,
  Award,
  Volume2,
  VolumeX,
  StopCircle,
  Mic,
  Sparkles,
  Monitor,
  Settings
} from 'lucide-react';
import { cvData, type Project } from './data/cvData';

// Custom inline SVG components for robust cross-version rendering
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Message {
  sender: 'user' | 'agent';
  text: string;
}

interface LogLine {
  type: 'info' | 'warn' | 'success' | 'agent-log' | 'input-echo';
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: `Hello! I'm Bright C. Sikazwe — AI Strategist, Data Platforms & Engineering Leader, and Acting Principal Engineer at MultiChoice Group (a Canal+ company). Welcome to my AI Digital Twin.

Ask me about my 13+ years of experience in AI, data platforms, telemetry forensics, executive analytics, or my PhD research on the AI-SRF framework at the University of Johannesburg.

Alternatively, paste a job specification in the 'Job Matcher' tab on the right so I can give you a probability score of my match, explain my reasoning, and answer any follow-up questions you have!`
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [logs, setLogs] = useState<LogLine[]>([
    { type: 'info', text: 'Initializing Digital Twin framework...' },
    { type: 'success', text: 'Digital Twin online.' },
    { type: 'info', text: 'Cloudflare Workers AI Llama-3.1 connection established. Ready for queries.' }
  ]);

  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'competencies' | 'certifications' | 'african-context' | 'research' | 'hobbies' | 'linkedin-posts' | 'job-matcher'>('summary');
  const [portfolioFilter, setPortfolioFilter] = useState<'All' | 'Agriculture & Health' | 'Mining & Resources' | 'Telco & IoT' | 'Strategy & Politics'>('All');

  // Job Spec Matcher States
  const [jobSpecText, setJobSpecText] = useState('');
  const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);
  const [jobAnalysis, setJobAnalysis] = useState<{ score: number; justification: string } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // ── Voice / TTS — real voice cloning (MisoTTS-ready) ───────────────────
  // Engine stack:
  //   1. Coqui XTTS-v2 via /api/tts (open-source, HF Spaces)  — when sample recorded
  //   2. Web Speech API fallback                               — always available
  //   3. MisoTTS swap-in                                       — change /api/tts target

  const [isTtsEnabled,   setIsTtsEnabled]   = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bright_tts_enabled');
      return stored !== 'false'; // Defaults to true
    }
    return true;
  });
  const [isSpeaking,     setIsSpeaking]     = useState(false);
  const [ttsEngine,      setTtsEngine]      = 
    useState<'webspeech' | 'cloned_f5' | 'cloudflare_ai' | 'elevenlabs_deep_african' | 'elevenlabs_cloned' | 'elevenlabs_custom'>(() => {
      if (typeof window !== 'undefined') {
        const storedEngine = localStorage.getItem('bright_tts_engine');
        if (storedEngine === 'webspeech' || storedEngine === 'cloned_f5' || storedEngine === 'cloudflare_ai' || storedEngine === 'elevenlabs_deep_african' || storedEngine === 'elevenlabs_cloned' || storedEngine === 'elevenlabs_custom') {
          return storedEngine;
        }
      }
      return 'cloned_f5';
    });
  const [voiceSample,    setVoiceSample]    = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bright_voice_sample');
    }
    return null;
  }); // base64 data-URL (local preview)
  const [voiceId,        setVoiceId]        = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bright_voice_id');
    }
    return null;
  }); // ElevenLabs voice_id
  const [customVoiceId,  setCustomVoiceId]  = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bright_custom_voice_id') || '';
    }
    return '';
  });          // custom ElevenLabs voice_id
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isCloning,      setIsCloning]      = useState(false);               // voice upload in progress
  const [isRecording,    setIsRecording]    = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [recordingSecs,  setRecordingSecs]  = useState(0);
  const [cloneError,     setCloneError]     = useState<string | null>(null);

  // Sync voice selection settings to localStorage
  useEffect(() => {
    localStorage.setItem('bright_tts_engine', ttsEngine);
  }, [ttsEngine]);

  useEffect(() => {
    localStorage.setItem('bright_tts_enabled', String(isTtsEnabled));
  }, [isTtsEnabled]);

  useEffect(() => {
    if (customVoiceId) {
      localStorage.setItem('bright_custom_voice_id', customVoiceId);
    } else {
      localStorage.removeItem('bright_custom_voice_id');
    }
  }, [customVoiceId]);

  const synthRef          = useRef<SpeechSynthesis | null>(null);
  const voicesRef         = useRef<SpeechSynthesisVoice[]>([]);
  const mediaRecRef       = useRef<MediaRecorder | null>(null);
  const audioChunksRef    = useRef<Blob[]>([]);
  const recTimerRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const clonedAudioRef    = useRef<HTMLAudioElement | null>(null);

  // Initialise Web Speech
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
      load();
      window.speechSynthesis.onvoiceschanged = load;
    }
    return () => { if (synthRef.current) synthRef.current.cancel(); };
  }, []);

  // Strip markdown → plain speech
  const stripMarkdown = (t: string) =>
    t.replace(/#{1,6}\s+/g, '')
     .replace(/\*\*([^*]+)\*\*/g, '$1')
     .replace(/\*([^*]+)\*/g, '$1')
     .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
     .replace(/^\s*[-*]\s+/gm, '')
     .replace(/^\s*\d+\.\s+/gm, '')
     .replace(/\*\*\*/g, '.').replace(/---/g, '.')
     .replace(/\n{2,}/g, '. ').replace(/\n/g, ' ')
     .trim();

  // Web Speech fallback
  const speakText = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const plain = stripMarkdown(text);
    if (!plain) return;
    const utt = new SpeechSynthesisUtterance(plain);
    const vs  = voicesRef.current;
    const pick =
      vs.find(v => v.lang === 'en-ZA') ||
      vs.find(v => v.lang.startsWith('en-GB') && v.name.toLowerCase().includes('male')) ||
      vs.find(v => v.lang.startsWith('en-GB')) ||
      vs.find(v => v.lang.startsWith('en-US') && v.name.toLowerCase().includes('male')) ||
      vs.find(v => v.lang.startsWith('en'));
    if (pick) utt.voice = pick;
    utt.rate = 0.92; utt.pitch = 0.95; utt.volume = 1;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utt);
  };

  // Server-side text-to-speech (F5-TTS, MeloTTS, ElevenLabs presets, or cloned voice)
  const speakWithServerTTS = async (text: string) => {
    setCloneError(null);
    setIsSynthesizing(true);
    setIsSpeaking(true);
    
    let activeVoiceId: string | undefined = undefined;
    if (ttsEngine === 'cloned_f5') {
      activeVoiceId = 'f5_clone';
    } else if (ttsEngine === 'elevenlabs_deep_african') {
      activeVoiceId = 'l9tGNEOXywIMjpp2p3gN';
    } else if (ttsEngine === 'elevenlabs_cloned') {
      activeVoiceId = voiceId || undefined;
      if (!activeVoiceId) {
        setIsSynthesizing(false);
        setCloneError('No cloned voice sample found. Please record one first.');
        speakText(text);
        return;
      }
    } else if (ttsEngine === 'elevenlabs_custom') {
      activeVoiceId = customVoiceId.trim() || undefined;
      if (!activeVoiceId) {
        setIsSynthesizing(false);
        setCloneError('Please enter a custom ElevenLabs Voice ID.');
        speakText(text);
        return;
      }
    }

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: activeVoiceId }),
      });
      const data: { audioData?: string; fallback?: boolean; error?: string; provider?: string } =
        await res.json();

      if (data.audioData && !data.fallback) {
        if (clonedAudioRef.current) { clonedAudioRef.current.pause(); }
        const audio = new Audio(data.audioData);
        clonedAudioRef.current = audio;
        audio.onended = () => { setIsSpeaking(false); setIsSynthesizing(false); };
        audio.onerror = () => { setIsSynthesizing(false); speakText(text); };
        await audio.play();
      } else {
        setIsSynthesizing(false);
        setCloneError(data.error ?? 'Synthesis failed — using Web Speech fallback');
        speakText(text);
      }
    } catch {
      setIsSynthesizing(false);
      speakText(text);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) synthRef.current.cancel();
    if (clonedAudioRef.current) { clonedAudioRef.current.pause(); clonedAudioRef.current.currentTime = 0; }
    setIsSpeaking(false);
    setIsSynthesizing(false);
  };

  // Auto-speak on new agent messages
  useEffect(() => {
    if (!isTtsEnabled || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.sender === 'agent') {
      const t = setTimeout(() => {
        if (ttsEngine !== 'webspeech') speakWithServerTTS(last.text);
        else speakText(last.text);
      }, 200);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isTtsEnabled]);

  // ── Voice recording (MediaRecorder API) ─────────────────────────────────
  const startRecording = async () => {
    setCloneError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecRef.current  = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const b64 = reader.result as string;
          setVoiceSample(b64);
          localStorage.setItem('bright_voice_sample', b64);
          // Upload sample to ElevenLabs Instant Voice Clone
          setIsCloning(true);
          setCloneError(null);
          try {
            const res = await fetch('/api/voice-clone', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ voiceSample: b64 }),
            });
            const data = await res.json() as { voiceId?: string; error?: string };
            if (data.voiceId) {
              setVoiceId(data.voiceId);
              setTtsEngine('elevenlabs_cloned');
              localStorage.setItem('bright_voice_id', data.voiceId);
            } else {
              setCloneError(data.error ?? 'Voice cloning failed — Web Speech fallback active');
            }
          } catch {
            setCloneError('Voice upload failed — check your connection and try again');
          } finally {
            setIsCloning(false);
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      mr.start(100);
      setIsRecording(true);
      setRecordingSecs(0);
      recTimerRef.current = setInterval(() => {
        setRecordingSecs(s => {
          if (s >= 15) { stopRecording(); return s; }
          return s + 1;
        });
      }, 1000);
    } catch {
      setCloneError('Microphone access denied. Please allow mic access and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecRef.current && isRecording) {
      mediaRecRef.current.stop();
      setIsRecording(false);
      if (recTimerRef.current) { clearInterval(recTimerRef.current); recTimerRef.current = null; }
    }
  };

  const clearVoiceSample = () => {
    stopSpeaking();
    localStorage.removeItem('bright_voice_sample');
    localStorage.removeItem('bright_voice_id');
    setVoiceSample(null);
    setVoiceId(null);
    setTtsEngine('cloned_f5');
    setCloneError(null);
  };

  const cloneFromReferenceFile = async () => {
    setIsCloning(true);
    setCloneError(null);
    try {
      const res = await fetch('/api/voice-clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useReferenceFile: true }),
      });
      const data = await res.json() as { voiceId?: string; error?: string };
      if (data.voiceId) {
        setVoiceId(data.voiceId);
        setTtsEngine('elevenlabs_cloned');
        localStorage.setItem('bright_voice_id', data.voiceId);
        setVoiceSample('reference_file');
        localStorage.setItem('bright_voice_sample', 'reference_file');
      } else {
        setCloneError(data.error ?? 'Voice cloning failed — Web Speech fallback active');
      }
    } catch {
      setCloneError('Voice upload failed — check your connection and try again');
    } finally {
      setIsCloning(false);
    }
  };
  // ── End Voice / TTS ──────────────────────────────────────────────────────





  // Filter projects
  const filteredProjects = cvData.projects.filter(project => {
    if (portfolioFilter === 'All') return true;
    if (portfolioFilter === 'Agriculture & Health') return project.sector === 'Agriculture' || project.sector === 'Healthcare';
    if (portfolioFilter === 'Mining & Resources') return project.sector.includes('Mining') || project.sector.includes('Geology');
    if (portfolioFilter === 'Telco & IoT') return project.sector.includes('Telecommunications') || project.sector.includes('IoT');
    if (portfolioFilter === 'Strategy & Politics') return project.sector.includes('Politics') || project.sector.includes('Research') || project.sector.includes('Strategy');
    return true;
  });

  // Deep dive asks about a project
  const handleProjectAsk = (project: Project) => {
    setInputText(`Tell me about your ${project.title} project, its tech stack, and what role you played in shipping it.`);
    setLogs(prev => [
      ...prev,
      { type: 'info', text: `Auto-routing queries to Digital Twin for deep dive into "${project.title}"...` }
    ]);
  };

  // Parse inline bold (**bold**) and links ([text](url))
  const parseInlineStyle = (lineText: string) => {
    const parts: (string | React.ReactNode)[] = [];
    const regex = /(\*\*([\s\S]+?)\*\*|\[([\s\S]+?)\]\(([\s\S]+?)\))/g;
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(lineText)) !== null) {
      const textBefore = lineText.substring(lastIndex, match.index);
      if (textBefore) {
        parts.push(textBefore);
      }
      
      if (match[2]) {
        // Bold match
        parts.push(<strong key={match.index} style={{ color: '#fff', fontWeight: 600 }}>{match[2]}</strong>);
      } else if (match[3] && match[4]) {
        // Link match
        parts.push(
          <a 
            key={match.index} 
            href={match[4]} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--color-orchestrator)', textDecoration: 'underline' }}
          >
            {match[3]}
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }
    
    const textAfter = lineText.substring(lastIndex);
    if (textAfter) {
      parts.push(textAfter);
    }
    
    return parts.length > 0 ? parts : lineText;
  };

  // Helper to render basic markdown elements (headers, bold, lists, dividers, links)
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed === '***' || trimmed === '---') {
        return <hr key={idx} style={{ border: '0', borderTop: '1px solid var(--border-mute)', margin: '0.65rem 0' }} />;
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h5 key={idx} style={{ color: '#fff', marginTop: '0.65rem', marginBottom: '0.35rem', fontSize: '0.88rem', fontFamily: 'var(--font-heading)', wordBreak: 'break-word' }}>
            {parseInlineStyle(line.trim().substring(4))}
          </h5>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h4 key={idx} style={{ color: '#fff', marginTop: '0.85rem', marginBottom: '0.45rem', fontSize: '0.98rem', fontFamily: 'var(--font-heading)', wordBreak: 'break-word' }}>
            {parseInlineStyle(line.trim().substring(3))}
          </h4>
        );
      }
      if (trimmed.startsWith('* ')) {
        return (
          <li key={idx} style={{ marginLeft: '1rem', listStyleType: 'square', marginBottom: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
            {parseInlineStyle(line.trim().substring(2))}
          </li>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} style={{ marginLeft: '1rem', listStyleType: 'disc', marginBottom: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
            {parseInlineStyle(line.trim().substring(2))}
          </li>
        );
      }
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <li key={idx} style={{ marginLeft: '1rem', listStyleType: 'decimal', marginBottom: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
            {parseInlineStyle(numMatch[2])}
          </li>
        );
      }
      if (!trimmed) {
        return <div key={idx} style={{ height: '0.35rem' }} />;
      }
      return (
        <p key={idx} style={{ marginBottom: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.45', wordBreak: 'break-word' }}>
          {parseInlineStyle(line)}
        </p>
      );
    });
  };

  // Helper to parse message suggestions separated by '***' or follow-up headers
  const parseMessage = (text: string) => {
    // 1. Only match follow-up headers when they appear as standalone section headers.
    //    Require them to be preceded by '###', '**', or a '***' separator on a line boundary.
    //    This prevents splitting the welcome message which contains "follow-up questions" mid-sentence.
    const headerRegex = /(?:^|\n)(?:#{1,3}\s*|\*{1,3}\s*)?(?=Suggested Follow-up Questions|Interactive Follow-up Questions|Follow-up Questions to explore)(?:Suggested Follow-up Questions|Interactive Follow-up Questions|Follow-up Questions to explore)[:\s]*/im;
    const match = text.match(headerRegex);

    let body = text;
    let rest = '';

    if (match && match.index !== undefined) {
      body = text.substring(0, match.index).trim();
      rest = text.substring(match.index + match[0].length).trim();
    } else {
      // Fallback: search for standard '***' separator (only a standalone line of three asterisks)
      const separatorMatch = text.match(/\n\*{3}\n|\n---\n/);
      if (separatorMatch && separatorMatch.index !== undefined) {
        body = text.substring(0, separatorMatch.index).trim();
        rest = text.substring(separatorMatch.index + separatorMatch[0].length).trim();
      }
    }

    // Clean up trailing asterisks or line breaks from the body
    let cleanBody = body.trim();
    if (cleanBody.endsWith('***')) {
      cleanBody = cleanBody.substring(0, cleanBody.length - 3).trim();
    }

    const suggestions: string[] = [];
    if (rest) {
      const lines = rest.split('\n');
      lines.forEach(line => {
        // Strip out leading/trailing markdown bold/italic tags and headers (e.g. *, #, **)
        let cleanLine = line
          .replace(/\*+$/, '')
          .replace(/^\*+/, '')
          .replace(/^#+\s*/, '')
          .trim();

        if (!cleanLine) return;

        // Try to match bullet/numbered patterns (e.g. "1. Question?", "- Question?")
        const matchNum = cleanLine.match(/^\d+\.\s*(.*)/);
        if (matchNum) {
          cleanLine = matchNum[1].trim();
        } else {
          const matchBullet = cleanLine.match(/^[-*]\s*(.*)/);
          if (matchBullet) {
            cleanLine = matchBullet[1].trim();
          }
        }

        // Final strip of markdown symbols inside the line
        cleanLine = cleanLine
          .replace(/\*+$/, '')
          .replace(/^\*+/, '')
          .trim();

        if (cleanLine.length > 5 && !cleanLine.includes('###') && !cleanLine.includes('***')) {
          suggestions.push(cleanLine);
        }
      });
    }

    return { body: cleanBody, suggestions };
  };

  // Helper to determine visual styles based on match score
  const getScoreColor = (score: number) => {
    if (score >= 85) return { primary: '#10b981', rgb: '16, 185, 129', label: 'High Match', bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.15)' };
    if (score >= 70) return { primary: '#f59e0b', rgb: '245, 158, 11', label: 'Strong Fit', bg: 'rgba(245, 158, 11, 0.04)', border: 'rgba(245, 158, 11, 0.15)' };
    return { primary: '#ef4444', rgb: '239, 68, 68', label: 'Development Fit', bg: 'rgba(239, 68, 68, 0.04)', border: 'rgba(239, 68, 68, 0.15)' };
  };

  // Click handler for suggestion chips
  const handleSuggestionClick = (question: string) => {
    submitChatQuestion(question);
  };

  // Submit chat question to Workers API or simulated engine
  const submitChatQuestion = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setIsTyping(true);
    setMessages(prev => [...prev, { sender: 'user', text }]);
    
    setLogs(prev => [
      ...prev,
      { type: 'input-echo', text: `> user@brytesika-ai: ${text}` },
      { type: 'info', text: '[ADK Router] Input parsed: Message received.' },
      { type: 'info', text: '[ADK Planner] Decoupling reasoning from execution. Matching optimal tool...' }
    ]);

    setTimeout(() => {
      const lowercaseText = text.toLowerCase();
      let toolName = 'CV_Database_Tool';
      if (lowercaseText.includes('hobb') || lowercaseText.includes('interest')) toolName = 'Hobbies_Database_Tool';
      else if (lowercaseText.includes('post') || lowercaseText.includes('linkedin') || lowercaseText.includes('tamagotchi') || lowercaseText.includes('spec-driven') || lowercaseText.includes('course')) toolName = 'LinkedIn_Posts_Tool';
      else if (lowercaseText.includes('phd') || lowercaseText.includes('research') || lowercaseText.includes('framework')) toolName = 'Academic_Research_Tool';
      else if (lowercaseText.includes('project') || lowercaseText.includes('ship') || lowercaseText.includes('product')) toolName = 'Product_Portfolio_Tool';

      setLogs(prev => [
        ...prev,
        { type: 'agent-log', text: `[ADK Tool Registry] Selected Tool: ${toolName}` },
        { type: 'agent-log', text: '[ADK Execution] Formatting response under safety guardrails in first-person...' }
      ]);
    }, 400);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      if (data.logs && Array.isArray(data.logs)) {
        setLogs(prev => [
          ...prev,
          ...data.logs.map((log: string) => ({ type: 'agent-log' as const, text: log }))
        ]);
      }

      setLogs(prev => [...prev, { type: 'success', text: '[ADK Runtime] Response synthesized successfully.' }]);
      let cleanResponse = (data.response || '').trim();
      cleanResponse = cleanResponse
        .replace(/^([\s*_-]*Digital\s*Twin[\s*]*[:\-\n]|\*+Digital\s*Twin\*+\s*|^\*+\s*Digital\s*Twin\s*)/i, '')
        .trim();

      setMessages(prev => [...prev, { sender: 'agent', text: cleanResponse }]);
    } catch (error) {
      console.error(error);
      
      setLogs(prev => [
        ...prev,
        { type: 'warn', text: '[Network] Cloudflare Edge AI binding unavailable. Running edge simulation locally...' }
      ]);

      setTimeout(() => {
        let simulatedReply = '';
        const lowercaseText = text.toLowerCase();

        const inappropriatePattern = /\b(sex|porn|rape|violence|kill|murder|abuse|terror|weapon|bomb|gun|assault|torture|suicide|racist|slur)\b/i;
        const politicsPattern = /\b(anc|eff|da|mk party|cyril ramaphosa|zuma|malema|trump|biden|putin|ukraine|russia|gaza|israel|government corruption|election campaign|political party|politician|president)\b/i;
        const isElectionProjectMentioned = lowercaseText.includes('sentimentcommand') || lowercaseText.includes('election tracker') || lowercaseText.includes('election intelligence');

        if (inappropriatePattern.test(text)) {
          simulatedReply = "I keep this space focused on my professional AI work, strategic research, and product portfolio. I cannot engage in discussions about inappropriate or offensive topics.";
        } else if (politicsPattern.test(text) && !isElectionProjectMentioned) {
          simulatedReply = "I keep this space focused on my professional AI work and strategic research. General political discussions are outside my scope. I can, however, explain the technical and multi-agent architecture of my SentimentCommand Election Intelligence project.";
        } else if (lowercaseText.includes('hobb') || lowercaseText.includes('interest')) {
          simulatedReply = `Outside of my professional work, I stay cognitively sharp through deliberate habits.

I read widely across AI safety literature, multi-agent frameworks, and evolutionary economics — it directly informs my PhD research at the University of Johannesburg on the AI-SRF framework for strategic resilience in emerging markets.

I enjoy tinkering with serverless edge runtimes (Cloudflare Workers, D1), local LLMs via Ollama, custom embedding vector pipelines, and home-automation IoT. Giving back matters to me — I actively mentor data scientists and engineering students through African AI hackathons and capability-building programmes. I also authored a **12-case-study digital business course book** (Wharton-structured) for African corporate training. When away from screens, you'll find me doing high-altitude hiking or distance running.

\n***\n
### Suggested Follow-up Questions:
1. How does your AI safety reading influence your PhD research on the AI-SRF framework?
2. Tell me about mentoring at African AI hackathons — what outcomes have you seen?`;
        } else if (lowercaseText.includes('post') || lowercaseText.includes('linkedin') || lowercaseText.includes('tamagotchi') || lowercaseText.includes('spec-driven') || lowercaseText.includes('course')) {
          simulatedReply = `One of my recent LinkedIn milestones was completing Google Cloud's **"Engineer AI Agents with Agent Development Kit (ADK)"** certification in May 2026.

The core takeaway: production AI agents require moving away from monolithic prompting towards **code-first modular systems** — decoupling the LLM planner (reasoning) from registered tools and skills (execution), so you get predictable, auditable enterprise behaviour rather than brittle one-shot prompts.

I put this directly into practice by building **Tiny Tamagotchi MVP** using strict spec-driven development — writing precise markdown specifications first, then letting coding agents generate a fully modular, local-storage-persisted React pet simulation, complete with Jest unit tests and GitHub Actions CI. The code is live at [github.com/brytesika-AI](https://github.com/brytesika-AI).

\n***\n
### Suggested Follow-up Questions:
1. How does spec-driven development compare to traditional prompt engineering in your experience?
2. How are you applying the Google ADK principles to your production work at MultiChoice?`;
        } else if (lowercaseText.includes('project') || lowercaseText.includes('shipped') || lowercaseText.includes('product') || lowercaseText.includes('built') || lowercaseText.includes('portfolio') || lowercaseText.includes('kavango') || lowercaseText.includes('dischem') || lowercaseText.includes('mineral')) {
          simulatedReply = `I have 15 live and prototype systems deployed across diverse domains — each solving a real problem in the African and emerging market context.

**Kavango & Mineral Intelligence** is a CEO-facing critical-minerals exploration platform for Africa, modelled on KoBold's TerraShed — with geological-rulebook scoring, an 'Induna' geologist agent, copper prospectivity mapping achieving a **0.903 ROC-AUC** over a 12,100-cell prediction grid, and Morupule Predictive Intelligence for coal mine equipment scenario advisory (browser-based Transformers.js).

**AfriCare** is live across 15 African nations, covering 47,310 facilities and 8.2M patients, with real-time outbreak detection and 60-day resource forecasting via LangChain ReAct agents and sub-50ms global latency via Cloudflare Workers AI edge inference.

**abfAgri** integrates live SAFEX commodity prices, satellite field monitoring, and AI crop diagnosis to address food security across the SADC region.

**Dis-Chem** — I designed a medallion-architecture data platform with a ~R9.2M PMO budget and GeoAI site-selection for FY2026 store expansion.

\n***\n
### Suggested Follow-up Questions:
1. Tell me more about the Kavango mineral intelligence platform and how it compares to KoBold's TerraShed.
2. How does AfriCare achieve sub-50ms latency at continental scale across 15 nations?`;
        } else if (lowercaseText.includes('phd') || lowercaseText.includes('research') || lowercaseText.includes('framework') || lowercaseText.includes('resilience') || lowercaseText.includes('ror') || lowercaseText.includes('ai-srf')) {
          simulatedReply = `My PhD research at the **University of Johannesburg** (College of Business & Economics) centres on a fundamental limitation of standard enterprise strategy: traditional ROI metrics cannot capture the infrastructural volatilities that define emerging markets — load-shedding, network drops, device fragmentation, and regulatory patchworks.

My dissertation proposes the **AI-Augmented Strategic Reasoning Framework (AI-SRF)** — a **9-agent system** with African-archetype personas (The Tracker, The Induna, The Auditor) structured across five iterative stages: Sense & Frame, Analyse & Understand, Ideate & Innovate, Evaluate & Decide, and Act & Learn. It is built on Cloudflare Workers, D1, KV, DSPy/GEPA optimisation and Groq, evaluating organisational **Return on Resilience (ROR)** through agentic simulations of real-world shocks.

I have a **~26,000-word PhD proposal** through supervisor review, an **arXiv preprint published**, and a **Design-Science journal article** prepared for a top-tier IS venue. This complements my **Wits Business School MMgt thesis** — a multivariate time-series OLS regression model achieving **R²=0.995** to quantify digitalisation's impact on GDP (Botswana case study).

\n***\n
### Suggested Follow-up Questions:
1. How do you quantify Return on Resilience (ROR) — what are the measurement inputs and agent interactions?
2. How does the AI-SRF's nine-agent architecture differ from standard multi-agent orchestration frameworks?`;
        } else if (lowercaseText.includes('multichoice') || lowercaseText.includes('explora') || lowercaseText.includes('fsu') || lowercaseText.includes('telemetry') || lowercaseText.includes('decoder') || lowercaseText.includes('canal')) {
          simulatedReply = `At **MultiChoice Group (a Canal+ company)**, I serve as Acting Principal Engineer & Lead for Data Platforms & Engineering — responsible for AI strategy and production ML across Africa's largest entertainment platform — **20M+ subscribers across 50 countries**. I was selected for the **Executive Head Training Program** in April 2024.

One of the most demanding challenges I've faced was the **Explora 3B reboot loop crisis** — ~80% of 98 monitored smartcards were rebooting multiple times daily. I analysed **~72,000 lines of raw Irdeto IMW debug logs** and a 674-row telemetry export, isolating three reinforcing layers: (1) **Si2183 tuner BER spikes ~735K (~1,800x the median)**; (2) OTA scheduler computing against the **1970 Unix epoch before NTP sync**; (3) a synchronised 58%→80% fleet spike pointing to an upstream OTA/CAS trigger. I delivered a **6-item P1/P2-prioritised remediation plan** for Broadcast, Middleware, Field and CAS teams.

I also **governed the safe shipment of 4.5M devices** during the Home Ultra VIP firmware trial — building real-time log-ingestion pipelines that detected kernel-level failures across **27M+ endpoints** and provided the evidence for a data-driven 'No-Go' on Firmware Build B15.2, enabling **~R710M in projected technology cost savings**.

On the AI side, I deployed a production **GenAI ensemble (Gemini 2.5 Flash + Qwen2.5-7B)** handling **10K+ daily call-centre interactions** with ~92% error reduction, and a multimodal video AI pipeline for the **Addressable TV field trial**.

\n***\n
### Suggested Follow-up Questions:
1. How did you architect the parallel telemetry pipeline detecting ~50% decoder failure rates across 4.5M+ devices?
2. What does the AI governance community of practice at MultiChoice look like in practice?`;
        } else if (lowercaseText.includes('momentum') || lowercaseText.includes('job') || lowercaseText.includes('fit') || lowercaseText.includes('hire') || lowercaseText.includes('role')) {
          const matchResult = simulateJobAnalysis(text);
          simulatedReply = `### Fit Analysis: ${matchResult.score}% Match Probability\n\n${matchResult.justification}`;
        } else {
          simulatedReply = `I'm Bright C. Sikazwe — AI and Data Analytics Leader in AI Enablement, currently Acting Principal Engineer & Lead for Data Platforms & Engineering at MultiChoice Group (a Canal+ company), and PhD Candidate at the University of Johannesburg.

I have **13+ years** translating complex data into strategic assets across media, telecommunications, healthcare, agriculture, mining and financial services. My work spans the full AI value chain: from enterprise AI strategy, use-case prioritisation and C-suite buy-in, through to production GenAI/LLM deployment, telemetry forensics, responsible AI governance, and measurable value delivery.

I was **selected for the MultiChoice Executive Head Training Program** in April 2024. I'm equally credible presenting to the Group CTO and resolving P1 production incidents in raw device logs.

I have **15 live and prototype AI systems** deployed on cloud infrastructure — including the Kavango mineral intelligence platform, AfriCare (pan-African health AI across 15 nations), abfAgri (SADC agricultural intelligence), SentimentCommand (Zambia 2026 election intelligence), and MOSAIC (Enterprise Architecture decision board). You can explore them all in the portfolio panel.

What would you like to explore?

\n***\n
### Suggested Follow-up Questions:
1. Tell me about the Explora 3B reboot loop crisis and how you resolved it at MultiChoice.
2. What is the AI-SRF framework and how does it measure Return on Resilience?`;
        }

        setLogs(prev => [...prev, { type: 'success', text: '[Simulation] Local analysis compiled successfully.' }]);
        setMessages(prev => [...prev, { sender: 'agent', text: simulatedReply }]);
      }, 1200);
    } finally {
      setIsTyping(false);
    }
  };

  // Job Spec Matcher Analysis Handler (Google ADK Observability logging)
  const handleAnalyzeJobSpec = async () => {
    if (!jobSpecText.trim() || isAnalyzingJob) return;

    setIsAnalyzingJob(true);
    setJobAnalysis(null);

    setLogs(prev => [
      ...prev,
      { type: 'input-echo', text: `> system@brytesika-ai: Initiated Job Spec Analysis Fit check...` },
      { type: 'info', text: '[ADK Router] Input parsed: __ANALYZE_JOB__ request.' },
      { type: 'info', text: '[ADK Planner] Decoupling reasoning. Selecting Tool: Job_Spec_Evaluator_Tool...' }
    ]);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        { type: 'agent-log', text: '[ADK Tool: Job_Spec_Evaluator_Tool] Loading CV context & aligning weights...' },
        { type: 'agent-log', text: '[ADK Tool: Job_Spec_Evaluator_Tool] Evaluating requirements against 10+ years experience...' }
      ]);
    }, 400);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `__ANALYZE_JOB__:\n${jobSpecText}`
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      if (data.logs && Array.isArray(data.logs)) {
        setLogs(prev => [
          ...prev,
          ...data.logs.map((log: string) => ({ type: 'agent-log' as const, text: log }))
        ]);
      }

      let score = 85;
      let justification = '';
      let cleanText = data.response.trim();
      
      if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
      else if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
      if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);
      cleanText = cleanText.trim();

      try {
        const parsed = JSON.parse(cleanText);
        score = parsed.score || 85;
        justification = parsed.justification || '';
      } catch (err) {
        console.warn('Standard JSON.parse failed. Executing smart JSON repair regex...', err);
        
        const scoreMatch = cleanText.match(/"score"\s*:\s*(\d+)/i);
        if (scoreMatch) {
          score = parseInt(scoreMatch[1], 10);
        }
        
        const keyword = '"justification"';
        const keyIndex = cleanText.indexOf(keyword);
        if (keyIndex !== -1) {
          const colonIndex = cleanText.indexOf(':', keyIndex + keyword.length);
          if (colonIndex !== -1) {
            const openQuoteIndex = cleanText.indexOf('"', colonIndex + 1);
            if (openQuoteIndex !== -1) {
              const closeQuoteIndex = cleanText.lastIndexOf('"');
              if (closeQuoteIndex > openQuoteIndex) {
                justification = cleanText.substring(openQuoteIndex + 1, closeQuoteIndex);
              }
            }
          }
        }
      }

      let finalJustification = justification.trim();
      if (!finalJustification) {
        finalJustification = cleanText;
      }

      finalJustification = finalJustification
        .replace(/^\{\s*"score"\s*:\s*\d+\s*,\s*/i, '')
        .replace(/^\s*"justification"\s*:\s*"/i, '')
        .replace(/^\s*"score"\s*:\s*\d+\s*,\s*/i, '')
        .replace(/^\{\s*"/i, '')
        .replace(/^\{\s*/i, '')
        .replace(/"\s*,\s*"score"\s*:\s*\d+\s*\}$/i, '')
        .replace(/"\s*,\s*"score"\s*:\s*\d+\s*$/i, '')
        .replace(/"\s*\}$/, '')
        .replace(/\}$/, '')
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .trim();

      setJobAnalysis({
        score,
        justification: finalJustification
      });
      setLogs(prev => [...prev, { type: 'success', text: '[ADK Tool: Job_Spec_Evaluator_Tool] Analysis completed successfully.' }]);

      // Direct Link: Post the results of the evaluation into the main chat window so the user gets follow-up buttons!
      setMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: `I have evaluated the job specification you provided against my profile and calculated a **${score}% Match Probability**.\n\n### Strategic Justification\n${finalJustification}`
        }
      ]);

    } catch (error) {
      console.error(error);
      
      setLogs(prev => [
        ...prev,
        { type: 'warn', text: '[Network] Cloudflare Edge AI unavailable. Initiating local match compiler...' }
      ]);

      setTimeout(() => {
        const result = simulateJobAnalysis(jobSpecText);
        setJobAnalysis(result);
        setLogs(prev => [...prev, { type: 'success', text: '[Simulation] Local analysis compiled successfully.' }]);

        // Post results of simulated evaluation into the main chat window
        setMessages(prev => [
          ...prev,
          {
            sender: 'agent',
            text: `I have evaluated the job specification you provided against my profile and calculated a **${result.score}% Match Probability**.\n\n### Strategic Justification\n${result.justification}`
          }
        ]);
      }, 1500);
    } finally {
      setIsAnalyzingJob(false);
    }
  };

  const simulateJobAnalysis = (jobSpec: string) => {
    const lowercase = jobSpec.toLowerCase();
    let score = 78;
    
    if (lowercase.includes('ai') || lowercase.includes('artificial intelligence')) score += 5;
    if (lowercase.includes('strategy') || lowercase.includes('strateg')) score += 5;
    if (lowercase.includes('ml') || lowercase.includes('machine learning') || lowercase.includes('deep learning')) score += 5;
    if (lowercase.includes('lead') || lowercase.includes('head') || lowercase.includes('manager') || lowercase.includes('director')) score += 5;
    if (lowercase.includes('data') || lowercase.includes('analytics') || lowercase.includes('platform')) score += 3;
    if (lowercase.includes('emerging') || lowercase.includes('africa') || lowercase.includes('sadc')) score += 2;
    
    if (score > 98) score = 98;
    if (score < 50) score = 55;
    
    let justification = `### Theme 1: Strategic AI Leadership & Enterprise Data Platform
With 13+ years at MultiChoice Group — Africa's largest entertainment platform (20M+ subscribers, 50 countries) — I operate as Acting Principal Engineer & Lead, Data Platforms & Engineering, selected for the Executive Head Training Program in April 2024.

* **Situation**: MultiChoice Group needed to transform from reactive analytics into a proactive AI-first enterprise, amid SADC infrastructural challenges and the complexity of the MultiChoice–Canal+ integration.
* **Task**: As AI and Data Analytics Leader in AI Enablement, my task was to own enterprise AI strategy, production ML deployment, data platform architecture, and executive alignment — end to end.
* **Action**: I deployed a production GenAI ensemble (Gemini 2.5 Flash + Qwen2.5-7B) processing 10K+ daily call-centre interactions aligned to the CHAP framework; built a multimodal video AI pipeline for the Addressable TV trial; architected a hybrid-parallel telemetry pipeline (32 ProcessPoolExecutor workers + 50 ThreadPoolExecutor threads) detecting ~50% decoder failure rates across 4.5M+ devices; and established a Responsible AI governance community of practice with POPIA compliance controls.
* **Result**: Achieved ~92% error reduction in call classification; governed the safe shipment of 4.5M devices enabling ~R710M in projected cost savings; elevated DStv Stream to a flagged growth priority by catching a material 17x data error and correcting it to a defensible ~9x runway.

### Theme 2: Data & Business Fusion at Executive Level
* **Situation**: MultiChoice's Canal+ integration and C-suite decision-making required a single defensible source of truth and rigorous MECE analytical frameworks.
* **Task**: Deliver executive-grade analytics, KPI governance, and PMO synergy dashboards that directly inform product strategy and boardroom decisions.
* **Action**: Produced weekly/monthly Power BI dashboards for the Group CTO; established data contracts (T+1 SLAs, ≥99% completeness) across CII/Databricks and Amplitude; built a real-time PMO synergy dashboard for the MultiChoice–Canal+ integration; and led technical-debt transformation quantifying 2,400+ issues, securing commendation from Exec Head Rudolf Kogler.
* **Result**: Created a single defensible source of truth feeding executive KPIs, Canal+ App rollout planning, and churn modelling — while grounding AI investment in measurable Return on Resilience (ROR) from my UJ PhD framework.

***

### Suggested Follow-up Questions:
1. How does your Wits Business School background and PhD research influence your approach to AI product strategy and executive alignment?
2. Can you walk me through the STAR narrative of the Explora 3B reboot loop forensics and the ~R710M cost-saving firmware governance?`;

    if (lowercase.includes('momentum') || lowercase.includes('financial') || lowercase.includes('insurance') || lowercase.includes('bank')) {
      justification = `### Theme 1: Digital Strategy & AI-First Financial Services
With 13+ years spanning enterprise AI strategy, C-suite analytics, and production data platform architecture at MultiChoice Group, I bring a proven track record of translating complex data into boardroom-level strategic value.

* **Situation**: Financial services require a leader who can bridge AI engineering execution with digital business strategy, regulatory compliance (POPIA), and customer-centric insight delivery.
* **Task**: Formulate and deliver an AI-first digital strategy integrating diverse customer data touchpoints, with strict information-security risk governance and measurable business outcomes.
* **Action**: Applying Wits Digital Business Strategy and MMgt frameworks, I established MultiChoice's Responsible AI governance community of practice, deployed Gemini 2.5 Flash + Qwen2.5-7B ensemble systems for call-centre intelligence, and built an AI churn-intelligence pipeline on Databricks converting voice logs into quantifiable Churn Risk and CSAT metrics — identifying Push VOD CSAT running ~10% below target for proactive intervention.
* **Result**: Secured Group CTO-level executive buy-in for multi-market GenAI customer support ensembles; enabled proactive churn intervention and revenue protection from previously invisible customer-sentiment patterns.

### Theme 2: Data Platform & Telemetry Governance at Scale
* **Situation**: Modern financial services need to transform complex, high-volume data into actionable boardroom strategies with governance and risk controls.
* **Task**: Establish robust MLOps platforms and telemetry-grade data engineering that directly impact bottom-line metrics, customer experience and regulatory compliance.
* **Action**: Engineered a hybrid-parallel Python telemetry pipeline (32 ProcessPoolExecutor workers + 50 ThreadPoolExecutor threads) over Azure Blob Storage, tracking 12+ crash indicators across 4.5M+ managed devices; governed the safe shipment of 4.5M devices enabling ~R710M in projected cost savings.
* **Result**: Delivered fleet-wide risk mitigation at continental scale, proving readiness to lead a digital and AI-first agenda in a regulated financial services environment.

***

### Suggested Follow-up Questions:
1. Would you like me to detail how my PhD framework's Return on Resilience (ROR) metrics apply to financial services digital transformation?
2. Shall I explain the churn-intelligence pipeline and CSAT analytics I built for MultiChoice's 10K+ daily customer interactions?`;
    }

    return { score, justification };
  };

  // Chat submit handler
  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    const userText = inputText;
    setInputText('');
    await submitChatQuestion(userText);
  };

  return (
    <div className="app-container">
      
      {/* HEADER / HERO PANEL */}
      <header className="glass-panel main-header">
        <div className="header-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img 
              src="/profile.png" 
              alt="Bright C. Sikazwe" 
              className="profile-avatar" 
            />
            <div className="header-info">
              <h1 className="gradient-text">{cvData.personalInfo.name}</h1>
              <div className="header-subtitle">
                <span />
                {cvData.personalInfo.title}
              </div>
              <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <MapPin size={14} color="var(--color-orchestrator)" />
                {cvData.personalInfo.location}
                <span style={{ color: 'var(--text-muted)' }}>|</span>
                <span style={{ color: 'var(--text-secondary)' }}>PhD Candidate</span>
              </p>
            </div>
          </div>
          
          <div className="header-cta">
            <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* THREE-COLUMN DASHBOARD WORKSPACE */}
      <main className="dashboard-grid">
        
        {/* COLUMN 1: DIGITAL TWIN CHAT & TERMINAL CONSOLE */}
        <div className="dashboard-col left-col">
          
          {/* INTERACTIVE CHAT PANEL */}
          <section className="glass-panel chat-workspace">
            <div className="workspace-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                <MessageSquare size={18} color="var(--color-orchestrator)" />
                Digital Twin Chat
                <span style={{ 
                  display: 'inline-block', 
                  width: '6px', 
                  height: '6px', 
                  backgroundColor: '#10b981', 
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #10b981',
                  marginLeft: '0.25rem'
                }}></span>
              </h3>

              {/* Voice Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>

                {/* Voice Studio button */}
                <button
                  onClick={() => setShowVoiceModal(true)}
                  className={`voice-record-trigger ${ttsEngine !== 'webspeech' ? 'has-sample' : ''}`}
                  title={isTtsEnabled
                    ? `Voice active · Configured via Voice Studio`
                    : 'Open AI Voice Studio'}
                >
                  <Settings size={12} />
                  <span>Voice Studio</span>
                </button>

                {/* Synthesizing spinner */}
                {isSynthesizing && (
                  <span className="synth-spinner" title="Synthesizing audio…">
                    <span />
                  </span>
                )}

                {/* Speaking waveform */}
                {isSpeaking && !isSynthesizing && (
                  <div className="voice-waveform" aria-label="Speaking">
                    <span /><span /><span /><span /><span />
                  </div>
                )}

                {/* Stop button */}
                {(isSpeaking || isSynthesizing) && (
                  <button onClick={stopSpeaking} className="voice-stop-btn" title="Stop">
                    <StopCircle size={13} />
                  </button>
                )}

                {/* TTS toggle */}
                <button
                  onClick={() => { const n = !isTtsEnabled; setIsTtsEnabled(n); if (!n) stopSpeaking(); }}
                  className={`voice-toggle-btn ${isTtsEnabled ? 'active' : ''}`}
                  title={isTtsEnabled
                    ? `Voice ON · ${
                        ttsEngine === 'cloned_f5' ? "Bright's F5-TTS Voice"
                        : ttsEngine === 'cloudflare_ai' ? 'Cloudflare AI'
                        : ttsEngine === 'elevenlabs_deep_african' ? 'Deep African'
                        : ttsEngine === 'elevenlabs_cloned' ? 'Cloned Voice'
                        : ttsEngine === 'elevenlabs_custom' ? 'Custom Voice'
                        : 'Web Speech API'
                      } — click to mute`
                    : 'Enable voice output'}
                >
                  {isTtsEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
                    {isTtsEnabled 
                      ? (ttsEngine === 'cloned_f5' ? 'BRIGHT VOICE'
                         : ttsEngine === 'cloudflare_ai' ? 'CLOUD AI' 
                         : ttsEngine === 'elevenlabs_deep_african' ? 'AFRICAN'
                         : ttsEngine === 'elevenlabs_cloned' ? 'MY VOICE'
                         : ttsEngine === 'elevenlabs_custom' ? 'CUSTOM'
                         : 'ON') 
                      : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Voice Recording Modal */}
            {showVoiceModal && (
              <div className="voice-modal-overlay" onClick={() => { if (!isRecording) setShowVoiceModal(false); }}>
                <div className="voice-modal voice-studio-modal" onClick={e => e.stopPropagation()}>
                  <div className="voice-modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Volume2 size={16} color="#a855f7" />
                      <span>AI Voice Studio</span>
                    </div>
                    <button
                      onClick={() => { if (!isRecording) setShowVoiceModal(false); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
                    >✕</button>
                  </div>

                  <p className="voice-modal-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Select the text-to-speech engine and voice profile for Bright's Digital Twin.
                  </p>

                  {/* Engine Selection Grid */}
                  <div className="voice-engine-grid">
                    {/* F5-TTS Voice Clone from Link (Free & Keyless) */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'cloned_f5' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('cloned_f5')}
                    >
                      <div className="card-badge free">Free / Cloned</div>
                      <div className="card-header">
                        <Sparkles size={14} className="card-icon" />
                        <span>Bright's Real Voice</span>
                      </div>
                      <div className="card-desc">Zero-shot clone from video clip. Free, serverless, and matches Bright's actual voice.</div>
                    </div>

                    {/* Cloudflare AI MeloTTS (Keyless & Free) */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'cloudflare_ai' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('cloudflare_ai')}
                    >
                      <div className="card-badge free">Free / Keyless</div>
                      <div className="card-header">
                        <Sparkles size={14} className="card-icon" />
                        <span>Cloudflare AI</span>
                      </div>
                      <div className="card-desc">MeloTTS server-side synthesis. Standard English helper voice.</div>
                    </div>

                    {/* Web Speech API */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'webspeech' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('webspeech')}
                    >
                      <div className="card-badge local">Offline / Local</div>
                      <div className="card-header">
                        <Monitor size={14} className="card-icon" />
                        <span>Web Speech API</span>
                      </div>
                      <div className="card-desc">Uses your browser's built-in local TTS engine. Zero latency.</div>
                    </div>

                    {/* ElevenLabs Deep African */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'elevenlabs_deep_african' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('elevenlabs_deep_african')}
                    >
                      <div className="card-badge premium">Premium</div>
                      <div className="card-header">
                        <Globe size={14} className="card-icon" />
                        <span>African Deep Male</span>
                      </div>
                      <div className="card-desc">ElevenLabs deep male voice (Neil B Jr) with a warm African-accented tone.</div>
                    </div>

                    {/* ElevenLabs Cloned Voice */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'elevenlabs_cloned' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('elevenlabs_cloned')}
                    >
                      <div className="card-badge premium">Voice Clone</div>
                      <div className="card-header">
                        <Mic size={14} className="card-icon" />
                        <span>My Cloned Voice</span>
                      </div>
                      <div className="card-desc">Speak in your own voice! Replicates your voice from a short recorded clip.</div>
                    </div>

                    {/* ElevenLabs Custom Voice */}
                    <div 
                      className={`voice-engine-card ${ttsEngine === 'elevenlabs_custom' ? 'active' : ''}`}
                      onClick={() => setTtsEngine('elevenlabs_custom')}
                    >
                      <div className="card-badge premium">Custom ID</div>
                      <div className="card-header">
                        <Settings size={14} className="card-icon" />
                        <span>Custom Voice ID</span>
                      </div>
                      <div className="card-desc">Use any ElevenLabs voice by pasting its library ID.</div>
                    </div>
                  </div>

                  {/* Contextual Settings Area */}
                  {ttsEngine.startsWith('elevenlabs_') && (
                    <div className="elevenlabs-setup-info">
                      🔑 <strong>Requires ElevenLabs API Key:</strong> Make sure <code>ELEVENLABS_API_KEY</code> is set in your Cloudflare Pages dashboard. (Free tier accounts have a free key!)
                    </div>
                  )}

                  {/* Custom Voice ID Input */}
                  {ttsEngine === 'elevenlabs_custom' && (
                    <div className="custom-voice-id-container">
                      <label htmlFor="custom-voice-input" className="custom-voice-label">Enter ElevenLabs Voice ID:</label>
                      <input 
                        id="custom-voice-input"
                        type="text" 
                        placeholder="e.g. l9tGNEOXywIMjpp2p3gN" 
                        value={customVoiceId}
                        onChange={(e) => setCustomVoiceId(e.target.value)}
                        className="custom-voice-input"
                      />
                    </div>
                  )}

                  {/* Voice Clone Recording Controls */}
                  {ttsEngine === 'elevenlabs_cloned' && (
                    <div className="cloned-voice-container">
                      <p className="voice-modal-desc" style={{ marginTop: '0.25rem' }}>
                        Record <strong>10–15 seconds</strong> of your voice below to clone it:
                      </p>

                      <div className="voice-modal-tip" style={{ margin: '0.5rem 0' }}>
                        💡 <em>"I'm Bright Sikazwe, Acting Principal Engineer at MultiChoice Group. I lead AI strategy, data platforms, and production machine learning across Africa's largest entertainment platform."</em>
                      </div>

                      {isCloning && (
                        <div className="voice-sample-exists" style={{ color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.2)', background: 'rgba(168, 85, 247, 0.06)' }}>
                          <span className="synth-spinner" style={{ marginRight: '0.35rem' }}><span /></span>
                          Uploading voice sample to ElevenLabs...
                        </div>
                      )}
                      {voiceId && !isRecording && !isCloning && (
                        <div className="voice-sample-exists">
                          <Check size={13} /> Voice successfully cloned! (ID: <code>{voiceId.substring(0,8)}...</code>)
                        </div>
                      )}
                      {voiceSample && !voiceId && !isRecording && !isCloning && (
                        <div className="voice-clone-error">⚠ Sample recorded but cloning failed. Check your API key.</div>
                      )}

                      {cloneError && (
                        <div className="voice-clone-error">⚠ {cloneError}</div>
                      )}

                      <div className="voice-modal-controls" style={{ marginTop: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {!isRecording ? (
                          <>
                            <button onClick={startRecording} className="record-btn">
                              <Mic size={14} />
                              {voiceSample ? 'Re-Record Sample' : 'Start Recording'}
                            </button>
                            <button 
                              onClick={cloneFromReferenceFile} 
                              className="record-btn" 
                              style={{ 
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, #d946ef 100%)', 
                                border: 'none',
                                color: 'white'
                              }}
                            >
                              Clone From Provided Voice File
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="recording-indicator">
                              <div className="rec-dot" />
                              REC — {recordingSecs}s / 15s
                              <div className="rec-progress">
                                <div className="rec-progress-fill" style={{ width: `${(recordingSecs / 15) * 100}%` }} />
                              </div>
                            </div>
                            <button onClick={stopRecording} className="stop-record-btn">
                              <StopCircle size={13} /> Stop Recording
                            </button>
                          </>
                        )}

                        {voiceSample && !isRecording && (
                          <button onClick={clearVoiceSample} className="clear-voice-btn">
                            Clear Clone
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* MisoTTS Future Integration Hint */}
                  <div className="misotts-footer-hint">
                    🚀 <em>MisoTTS Ready: Synthesizer automatically switches to MisoTTS 7.7B backbone once MISO_TTS_API_KEY is configured in your Cloudflare dashboard.</em>
                  </div>
                </div>
              </div>
            )}

            <div className="chat-history">
              {messages.map((msg, idx) => {
                const { body, suggestions } = msg.sender === 'agent' ? parseMessage(msg.text) : { body: msg.text, suggestions: [] };
                const isAgent = msg.sender === 'agent';
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    width: 'auto',
                    maxWidth: '85%',
                    alignSelf: isAgent ? 'flex-start' : 'flex-end',
                    minWidth: 0,
                  }}>
                    <div 
                      className={`message-bubble ${msg.sender} ${isAgent ? 'orchestrator' : ''}`}
                      style={{ width: '100%', boxSizing: 'border-box', overflowWrap: 'break-word', wordBreak: 'break-word', minWidth: 0 }}
                    >
                      {isAgent && (
                        <div className="bubble-meta orchestrator">
                          <Cpu size={10} />
                          Digital Twin
                        </div>
                      )}
                      <div style={{ overflowWrap: 'break-word', wordBreak: 'break-word', minWidth: 0 }}>
                        {renderMarkdown(body)}
                      </div>
                    </div>
                    {suggestions.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.1rem', marginBottom: '0.5rem', alignSelf: 'flex-start' }}>
                        {suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                              background: 'rgba(59, 130, 246, 0.05)',
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              borderRadius: '12px',
                              padding: '0.25rem 0.6rem',
                              color: 'rgba(59, 130, 246, 0.9)',
                              fontSize: '0.72rem',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'var(--transition-smooth)',
                              fontFamily: 'var(--font-sans)',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                              e.currentTarget.style.color = '#3b82f6';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                              e.currentTarget.style.color = 'rgba(59, 130, 246, 0.9)';
                            }}
                            disabled={isTyping}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isTyping && (
                <div className="message-bubble agent orchestrator">
                  <div className="bubble-meta orchestrator">
                    <Cpu size={10} />
                    Thinking...
                  </div>
                  <div style={{ display: 'flex', gap: '4px', padding: '0.25rem 0' }}>
                    <span className="dot dot-green" style={{ animation: 'blink 1.4s infinite 0.2s' }}></span>
                    <span className="dot dot-green" style={{ animation: 'blink 1.4s infinite 0.4s' }}></span>
                    <span className="dot dot-green" style={{ animation: 'blink 1.4s infinite 0.6s' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-area">
              <form onSubmit={handleChatSubmit} className="chat-form">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask my Digital Twin anything..."
                  className="chat-input orchestrator"
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  className="chat-submit-btn orchestrator"
                  disabled={isTyping}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </section>

          {/* LOG SYSTEM WORKSPACE SIMULATOR */}
          <section className="glass-panel terminal-workspace">
            <div className="terminal-header">
              <div className="terminal-title">
                <TerminalIcon size={14} color="#10b981" />
                Agent Thought terminal.log
              </div>
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
            </div>
            
            <div className="terminal-content">
              {logs.map((log, idx) => (
                <div key={idx} className={`terminal-line ${log.type}`}>
                  {log.text}
                </div>
              ))}
              <div className="terminal-line">
                <span className="cursor"></span>
              </div>
              <div ref={logEndRef} />
            </div>
          </section>

        </div>

        {/* COLUMN 2: PORTFOLIO GRID SECTION (SCROLLABLE CARD LIST) */}
        <section className="glass-panel portfolio-section middle-col">
          <div className="portfolio-header-container">
            <h3 className="section-title">
              <Layers size={18} color="var(--color-orchestrator)" />
              Live AI Product Portfolio
            </h3>
            
            {/* Filter bar */}
            <div className="filters-bar">
              {(['All', 'Agriculture & Health', 'Mining & Resources', 'Telco & IoT', 'Strategy & Politics'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setPortfolioFilter(filter)}
                  className={`filter-chip ${portfolioFilter === filter ? 'active' : ''}`}
                >
                  {filter.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Card Grids */}
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="glass-panel project-card">
                <div className="project-card-header">
                  <span className="tag" style={{ borderColor: 'var(--color-orchestrator)', color: 'var(--color-orchestrator)', width: 'fit-content' }}>
                    {project.sector}
                  </span>
                  <h4 className="project-title" style={{ fontSize: '1rem', marginTop: '0.25rem' }}>{project.title}</h4>
                  <p className="project-desc" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{project.description}</p>
                </div>

                <div className="project-tags" style={{ marginTop: '0.25rem' }}>
                  {project.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && <span className="tag">+{project.techStack.length - 4}</span>}
                </div>

                <div className="project-links">
                  <div className="project-url-links">
                    {project.liveUrl !== '#' && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-item">
                        <Globe size={12} />
                        Live
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-item">
                        <GithubIcon size={12} />
                        Code
                      </a>
                    )}
                  </div>
                  <button 
                    onClick={() => handleProjectAsk(project)}
                    className="project-ask-btn"
                  >
                    Deep Dive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 3: CV DETAILED INFORMATION TABS (SCROLLABLE) */}
        <section id="cv-tabs-view" className="glass-panel cv-section right-col">
          <div className="cv-tabs-header">
            <button 
              onClick={() => setActiveTab('summary')}
              className={`cv-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab('job-matcher')}
              className={`cv-tab-btn job-matcher-tab-btn ${activeTab === 'job-matcher' ? 'active' : ''}`}
            >
              <span className="dot dot-fuchsia" style={{ width: '6px', height: '6px', margin: 0, display: 'inline-block', flexShrink: 0 }}></span>
              Job Matcher
            </button>
            <button 
              onClick={() => setActiveTab('experience')}
              className={`cv-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            >
              Experience
            </button>
            <button 
              onClick={() => setActiveTab('competencies')}
              className={`cv-tab-btn ${activeTab === 'competencies' ? 'active' : ''}`}
            >
              Competencies
            </button>
            <button 
              onClick={() => setActiveTab('certifications')}
              className={`cv-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            >
              Certs
            </button>
            <button 
              onClick={() => setActiveTab('linkedin-posts')}
              className={`cv-tab-btn ${activeTab === 'linkedin-posts' ? 'active' : ''}`}
            >
              Posts
            </button>
            <button 
              onClick={() => setActiveTab('african-context')}
              className={`cv-tab-btn ${activeTab === 'african-context' ? 'active' : ''}`}
            >
              Africa Context
            </button>
            <button 
              onClick={() => setActiveTab('research')}
              className={`cv-tab-btn ${activeTab === 'research' ? 'active' : ''}`}
            >
              Research
            </button>
            <button 
              onClick={() => setActiveTab('hobbies')}
              className={`cv-tab-btn ${activeTab === 'hobbies' ? 'active' : ''}`}
            >
              Hobbies
            </button>
          </div>

          <div className="cv-tab-content">
            
            {/* EXECUTIVE SUMMARY */}
            {activeTab === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.1rem', wordBreak: 'break-word' }}>Executive Profile</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.85rem', wordBreak: 'break-word' }}>
                  {cvData.personalInfo.summary}
                </p>
                <div style={{ marginTop: '0.5rem', padding: '0.75rem', borderLeft: '3px solid var(--color-strategy)', background: 'rgba(16, 185, 129, 0.03)', width: '100%', boxSizing: 'border-box' }}>
                  <h4 style={{ color: 'var(--color-strategy)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', fontSize: '0.9rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                    <Shield size={14} style={{ flexShrink: 0 }} />
                    PhD Research Focus
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', wordBreak: 'break-word' }}>
                    {renderMarkdown('Active doctoral researcher in emerging markets AI strategic framework adaptations. Developing quantitative structures to evaluate enterprise **Return on Resilience (ROR)** over a 9-agent AI simulation stack.')}
                  </div>
                </div>
              </div>
            )}

            {/* WORK EXPERIENCE TIMELINE */}
            {activeTab === 'experience' && (
              <div className="timeline">
                {cvData.experience.map((job, index) => (
                  <div key={index} className="timeline-item" style={{ paddingLeft: '1.25rem', gap: '0.5rem' }}>
                    <div className="timeline-header" style={{ marginBottom: '0.25rem' }}>
                      <div className="timeline-title">
                        <h4 style={{ fontSize: '0.95rem' }}>{job.role}</h4>
                        <span className="timeline-company" style={{ fontSize: '0.8rem' }}>{job.company}</span>
                      </div>
                      <span className="timeline-date" style={{ fontSize: '0.75rem' }}>{job.date}</span>
                    </div>
                    <ul className="timeline-bullets" style={{ gap: '0.25rem', paddingLeft: '0.75rem' }}>
                      {job.bullets.map((bullet, bIndex) => (
                        <li key={bIndex} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{parseInlineStyle(bullet)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TECHNICAL EXPERTISE */}
            {activeTab === 'competencies' && (
              <div className="competencies-grid" style={{ gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {cvData.technicalExpertise.map((cat, index) => (
                  <div key={index} className="glass-panel competency-card" style={{ padding: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>{cat.category}</h4>
                    <div className="skills-list" style={{ gap: '0.35rem' }}>
                      {cat.skills.map((skill, sIndex) => (
                        <span key={sIndex} className="skill-badge" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CERTIFICATIONS */}
            {activeTab === 'certifications' && (
              <div className="competencies-grid" style={{ gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                {cvData.certifications.map((cat, index) => (
                  <div key={index} className="glass-panel competency-card" style={{ padding: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>{cat.category}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', boxSizing: 'border-box' }}>
                      {cat.items.map((cert, cIndex) => (
                        <div key={cIndex} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem', width: '100%', boxSizing: 'border-box' }}>
                          <Check size={12} color="var(--color-orchestrator)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LINKEDIN POSTS */}
            {activeTab === 'linkedin-posts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <MessageSquare size={18} color="var(--color-orchestrator)" />
                  LinkedIn Posts & Shared Projects
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>
                  {cvData.linkedinPosts.map((post, index) => (
                    <div 
                      key={index} 
                      className="glass-panel" 
                      style={{ 
                        padding: '0.75rem', 
                        borderLeft: '3px solid var(--color-orchestrator)', 
                        background: 'rgba(59, 130, 246, 0.01)',
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-orchestrator)', fontWeight: 600, fontFamily: 'var(--font-mono)', wordBreak: 'break-word' }}>
                          {post.topic}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                          {post.date}
                        </span>
                      </div>
                      <h5 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '0.35rem', wordBreak: 'break-word' }}>{post.title}</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: '1.45', marginBottom: '0.4rem', wordBreak: 'break-word' }}>{post.summary}</p>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.72rem', color: 'var(--color-orchestrator)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Globe size={10} />
                        View original post
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JOB SPEC MATCH PROBABILITY EVALUATOR */}
            {activeTab === 'job-matcher' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Award size={18} color="var(--color-strategy)" style={{ flexShrink: 0 }} />
                  AI Job Spec Suitability Matcher
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', wordBreak: 'break-word' }}>
                  Paste a job description or spec details below. My AI twin will run a matching evaluation against my 10+ years of production experience and academic research.
                </p>
                
                <textarea
                  value={jobSpecText}
                  onChange={(e) => setJobSpecText(e.target.value)}
                  placeholder="Paste the job specification or role details here... (e.g. 'Looking for a Digital Leader with experience deploying AI platforms, MLOps systems, managing C-suite alignment, and implementing governance...')"
                  style={{
                    width: '100%',
                    minHeight: '110px',
                    maxHeight: '160px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-mute)',
                    borderRadius: '6px',
                    padding: '0.65rem',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                  disabled={isAnalyzingJob}
                />
                
                <button
                  onClick={handleAnalyzeJobSpec}
                  className="btn btn-secondary"
                  style={{
                    background: 'var(--color-strategy)',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.6rem',
                    fontSize: '0.85rem'
                  }}
                  disabled={isAnalyzingJob || !jobSpecText.trim()}
                >
                  {isAnalyzingJob ? (
                    <>
                      <div className="dot dot-green" style={{ animation: 'blink 1.4s infinite 0.2s', width: '6px', height: '6px' }}></div>
                      Analyzing Spec...
                    </>
                  ) : (
                    <>Analyze Match & Justification</>
                  )}
                </button>

                {jobAnalysis && (() => {
                  const sColor = getScoreColor(jobAnalysis.score);
                  const { body: jBody, suggestions: jSuggestions } = parseMessage(jobAnalysis.justification);
                  return (
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
                      {/* Visual Probability Score Gauge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: sColor.bg,
                        border: `1px solid ${sColor.border}`,
                        width: '100%',
                        boxSizing: 'border-box',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          position: 'relative',
                          width: '58px',
                          height: '58px',
                          borderRadius: '50%',
                          border: '3px solid var(--border-mute)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          fontFamily: 'var(--font-mono)',
                          color: sColor.primary,
                          boxShadow: `0 0 10px rgba(${sColor.rgb === '16, 185, 129' ? '16, 185, 129' : sColor.rgb === '245, 158, 11' ? '245, 158, 11' : '239, 68, 68'}, 0.15)`,
                          flexShrink: 0
                        }}>
                          {jobAnalysis.score}%
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h5 style={{ fontSize: '0.82rem', color: '#fff', marginBottom: '0.15rem', wordBreak: 'break-word' }}>{sColor.label}</h5>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.3', wordBreak: 'break-word' }}>
                            Calculated fit based on Wits Digital Business courses and PhD Return on Resilience (ROR) frameworks.
                          </p>
                        </div>
                      </div>

                      {/* Justification details */}
                      <div className="glass-panel" style={{ padding: '0.75rem', borderLeft: `3px solid ${sColor.primary}`, background: 'rgba(255, 255, 255, 0.01)', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                        <h5 style={{ color: sColor.primary, fontSize: '0.82rem', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)', wordBreak: 'break-word' }}>
                          Strategic Justification
                        </h5>
                        <div style={{ wordBreak: 'break-word' }}>
                          {renderMarkdown(jBody)}
                        </div>
                      </div>

                      {/* Job Matcher follow-ups */}
                      {jSuggestions.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem', width: '100%', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Explore Fit in Chat:</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', width: '100%', boxSizing: 'border-box' }}>
                            {jSuggestions.map((suggestion, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{
                                  background: 'rgba(59, 130, 246, 0.05)',
                                  border: '1px solid rgba(59, 130, 246, 0.15)',
                                  borderRadius: '12px',
                                  padding: '0.25rem 0.6rem',
                                  color: 'rgba(59, 130, 246, 0.9)',
                                  fontSize: '0.72rem',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'var(--transition-smooth)',
                                  fontFamily: 'var(--font-sans)',
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                                  e.currentTarget.style.color = '#3b82f6';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)';
                                  e.currentTarget.style.color = 'rgba(59, 130, 246, 0.9)';
                                }}
                                disabled={isTyping}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* PAN-AFRICAN AI ADOPTION */}
            {activeTab === 'african-context' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Globe size={18} color="var(--color-strategy)" style={{ flexShrink: 0 }} />
                  Pan-African AI Leadership
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>
                  {cvData.africanContext.map((point, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: 'rgba(16, 185, 129, 0.1)', 
                        color: 'var(--color-strategy)', 
                        borderRadius: '50%', 
                        width: '18px', 
                        height: '18px', 
                        flexShrink: 0,
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}>
                        {index + 1}
                      </span>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', flex: 1, minWidth: 0, wordBreak: 'break-word' }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PUBLICATIONS & RESEARCH */}
            {activeTab === 'research' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <TrendingUp size={18} color="var(--color-orchestrator)" style={{ flexShrink: 0 }} />
                  Research & Publications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>
                  {cvData.research.map((paper, index) => (
                    <div key={index} className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--color-orchestrator)', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                      <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 500, lineHeight: '1.4', wordBreak: 'break-word' }}>{paper}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOBBIES */}
            {activeTab === 'hobbies' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                  <Award size={18} color="var(--color-product)" style={{ flexShrink: 0 }} />
                  Hobbies & Interests
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>
                  {cvData.hobbies.map((hobby, index) => (
                    <div key={index} className="glass-panel" style={{ padding: '0.75rem', borderLeft: '3px solid var(--color-product)', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', wordBreak: 'break-word' }}>{hobby}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <footer style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-mute)', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
            © 2026 Bright C. Sikazwe. Deployed at Edge node | by: @BryteSikaStrategyAI
          </footer>
        </section>

      </main>

    </div>
  );
}
