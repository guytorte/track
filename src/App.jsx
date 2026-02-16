import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Constants ---

const GENRES = ["Pop", "Rock", "Hip Hop", "Electronic", "R&B", "Jazz", "Country", "Classical"];
const PRODUCTION_STYLES = ["Radio-Ready", "Lo-Fi", "Cinematic", "Live Recording", "Demo", "Underground"];

const STYLE_DNA = [
  "Synthpop", "Dream Pop", "Indie Pop", "Hyperpop", "Art Pop", "2000s Pop",
  "Alternative Rock", "Indie Rock", "Punk Rock", "Grunge", "Shoegaze", "Psychedelic Rock",
  "House", "Techno", "Trance", "Drum and Bass", "Dubstep", "Trap", "R&B", "Soul", "Funk"
];

const INSTRUMENTS = [
  "808 Bass", "Tight Drums", "Synth Pads", "Stratocaster", "Electric Guitar (Distorted)",
  "Downtuned Guitar", "Heavy Bass", "Turntables", "Bass Guitar", "Drum Kit",
  "Hi-Hat Rolls", "Sub Bass", "Dark Synth Pads", "Supersaw Lead", "Side-Chained Pads",
  "Synthesizer Arps", "Synthesizer", "Pad", "Cello", "Violin", "Violin Section",
  "Acoustic Guitar", "Acoustic Guitar (Nylon)", "Nylon Guitar", "Muted Guitar",
  "Fuzz Bass", "Piano", "Piano (Grand)", "Piano (Concert Grand)", "Piano (Jazz Voicings)",
  "Rhodes", "Hammond Organ", "Organ", "Saxophone", "Trumpet", "Brass", "Horn Section",
  "Congas", "Upright Bass", "Bass Guitar (Slap)", "Gospel Choir", "Choir",
  "Reverb Washes", "Field Recordings"
];

const VOICE_DESCRIPTORS = [
  { icon: "☀️", label: "Bright" },
  { icon: "☁️", label: "Airy" },
  { icon: "🎤", label: "Powerful Belt" },
  { icon: "🌌", label: "Falsetto" },
  { icon: "💨", label: "Breathy" },
  { icon: "🤫", label: "Whispered" },
  { icon: "🔔", label: "Resonant" },
  { icon: "🎸", label: "Grit / Raspy" },
  { icon: "🔥", label: "Aggressive" },
  { icon: "😱", label: "Screaming" }
];

// --- Components ---

const Toggle = ({ checked, onChange, label, subLabel }) => (
  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700">
    <div>
      <div className="text-sm font-medium text-slate-200">{label}</div>
      {subLabel && <div className="text-xs text-slate-400">{subLabel}</div>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-blue-600' : 'bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const Slider = ({ label, value, onChange, min = 0, max = 100, subLabel }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <div>
        <label className="text-sm font-semibold text-slate-300 block">{label}</label>
        {subLabel && <span className="text-xs text-slate-500">{subLabel}</span>}
      </div>
      <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-blue-400 border border-slate-700">
        {value}%
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
    />
  </div>
);

const TagCloud = ({ items, selected, onToggle, maxVisible = 6 }) => {
  const [expanded, setExpanded] = useState(false);
  
  const visibleItems = expanded ? items : items.slice(0, maxVisible);
  const hasMore = items.length > maxVisible;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          {items === STYLE_DNA ? "Style DNA" : items === INSTRUMENTS ? "Key Instruments" : "Voice Descriptors"}
        </h3>
        <span className="text-xs text-slate-500">MULTI-SELECT</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {visibleItems.map((item, idx) => {
            const isSelected = selected.includes(typeof item === 'object' ? item.label : item);
            const label = typeof item === 'object' ? item.label : item;
            const icon = typeof item === 'object' ? item.icon : null;

            return (
              <motion.button
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggle(label)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
                  ${isSelected 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}
                `}
              >
                {icon && <span className="mr-1">{icon}</span>}
                {label}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
        >
          {expanded ? "Show Less" : `Show All (${items.length - maxVisible} more)`}
          <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
        </button>
      )}
    </div>
  );
};

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState('new');
  const [concept, setConcept] = useState("");
  const [improvingConcept, setImprovingConcept] = useState(false);
  const [aiApiKey, setAiApiKey] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [baseGenre, setBaseGenre] = useState("Pop");
  const [prodStyle, setProdStyle] = useState("Radio-Ready");
  
  const [selectedDna, setSelectedDna] = useState(["Synthpop", "Dream Pop", "Indie Pop"]);
  const [selectedInstruments, setSelectedInstruments] = useState(["808 Bass", "Tight Drums", "Synth Pads"]);
  const [selectedVoice, setSelectedVoice] = useState(["Bright", "Airy", "Powerful Belt"]);
  
  const [gender, setGender] = useState("Female");
  const [duetMode, setDuetMode] = useState(false);
  const [tempoEnabled, setTempoEnabled] = useState(false);
  const [weirdness, setWeirdness] = useState(10);
  const [styleInfluence, setStyleInfluence] = useState(80);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);

  // Handlers
  const toggleSelection = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const prompt = `
[Genre: ${baseGenre}] [Style: ${prodStyle}]
[Concept: ${concept}]
[DNA: ${selectedDna.join(', ')}]
[Instruments: ${selectedInstruments.join(', ')}]
[Vocals: ${gender} - ${selectedVoice.join(', ')} ${duetMode ? '(Duet Mode)' : ''}]
[Settings: Weirdness ${weirdness}%, Style Adherence ${styleInfluence}%]
      `.trim();
      
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      alert("Blueprint copied to clipboard!");
    }
  };

  // AI Functions
  const getOpenRouterResponse = async (prompt) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${aiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw error;
    }
  };

  const improveConceptWithAI = async () => {
    if (!concept.trim()) {
      alert("Please enter a concept first.");
      return;
    }

    if (!aiApiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setImprovingConcept(true);
    try {
      const aiPrompt = `Improve this song concept to make it more engaging and detailed: "${concept}". Provide a more detailed description of the song's theme, emotion, story, and any other relevant details that could help in music production.`;
      const improvedConcept = await getOpenRouterResponse(aiPrompt);
      setConcept(improvedConcept);
    } catch (error) {
      console.error('Error improving concept:', error);
      alert('Failed to improve concept. Please check your API key and try again.');
    } finally {
      setImprovingConcept(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Mobile Header Simulation */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
          <span className="font-semibold text-lg tracking-tight">unoarchitect.com</span>
        </div>
        <div className="flex gap-4 text-slate-400">
          <button>Share</button>
          <button>•••</button>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4 pb-24">
        {/* Title Card */}
        <div className="flex justify-between items-center mb-6 mt-2">
          <h1 className="text-xl font-bold text-white">Song Blueprint</h1>
          <button className="text-slate-500 hover:text-white">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl mb-8 border border-slate-800">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'new' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Blueprint (New)
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'existing' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Refine (Existing)
          </button>
        </div>

        {/* Concept Input */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">What is the song about?</label>
            <button 
              onClick={improveConceptWithAI}
              disabled={improvingConcept}
              className="text-xs text-blue-400 flex items-center gap-1 hover:text-blue-300 disabled:opacity-50"
            >
              {improvingConcept ? (
                <>
                  <span className="animate-spin">⚙️</span> Improving...
                </>
              ) : (
                <>
                  <span>✨</span> Improve with AI
                </>
              )}
            </button>
          </div>
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[120px] resize-none placeholder-slate-600"
            placeholder="Describe your song idea..."
          />
        </div>

        {/* Genre & Production */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Base Genre</label>
            <select
              value={baseGenre}
              onChange={(e) => setBaseGenre(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
            >
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Production Style</label>
            <select
              value={prodStyle}
              onChange={(e) => setProdStyle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
            >
              {PRODUCTION_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Multi-select Sections */}
        <TagCloud 
          items={STYLE_DNA} 
          selected={selectedDna} 
          onToggle={(item) => toggleSelection(selectedDna, setSelectedDna, item)} 
        />
        
        <TagCloud 
          items={INSTRUMENTS} 
          selected={selectedInstruments} 
          onToggle={(item) => toggleSelection(selectedInstruments, setSelectedInstruments, item)} 
          maxVisible={8}
        />

        <TagCloud 
          items={VOICE_DESCRIPTORS} 
          selected={selectedVoice} 
          onToggle={(item) => toggleSelection(selectedVoice, setSelectedVoice, item)} 
        />

        {/* Voice Tailoring */}
        <div className="mb-8 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Voice Tailoring</h3>
          
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gender / Type</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Androgynous</option>
              <option>Child</option>
              <option>Elderly</option>
            </select>
          </div>

          <Toggle 
            label="Duet Mode" 
            subLabel="Alternating male/female vocals"
            checked={duetMode} 
            onChange={setDuetMode} 
          />
        </div>

        {/* Sliders */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
             <label className="text-sm font-bold text-slate-300">Tempo / BPM</label>
             <button 
               onClick={() => setTempoEnabled(!tempoEnabled)}
               className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${tempoEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
             >
               <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${tempoEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
             </button>
          </div>

          <Slider 
            label="Weirdness Level" 
            subLabel="Experimentalism vs Standard flow."
            value={weirdness} 
            onChange={setWeirdness} 
          />

          <Slider 
            label="Style Influence" 
            subLabel="Adherence to genre conventions."
            value={styleInfluence} 
            onChange={setStyleInfluence} 
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin">⚙️</span>
              Generating...
            </>
          ) : (
            <>
              <span>✨</span> GENERATE BLUEPRINT
            </>
          )}
        </button>

        {/* Result Modal / Area */}
        <AnimatePresence>
          {generatedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setGeneratedPrompt(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Generated Blueprint</h3>
                  <button onClick={() => setGeneratedPrompt(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-green-400 mb-6 whitespace-pre-wrap leading-relaxed">
                  {generatedPrompt}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={copyToClipboard}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                  <button 
                    onClick={() => setGeneratedPrompt(null)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* API Key Modal */}
        <AnimatePresence>
          {showApiKeyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setShowApiKeyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Enter API Key</h3>
                  <button onClick={() => setShowApiKeyModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">OpenRouter API Key</label>
                  <input
                    type="password"
                    value={aiApiKey}
                    onChange={(e) => setAiApiKey(e.target.value)}
                    placeholder="sk-... (your API key)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Get a free API key from{' '}
                    <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      openrouter.ai
                    </a>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowApiKeyModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      if (aiApiKey) {
                        setShowApiKeyModal(false);
                        improveConceptWithAI();
                      }
                    }}
                    disabled={!aiApiKey}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    Save & Continue
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}