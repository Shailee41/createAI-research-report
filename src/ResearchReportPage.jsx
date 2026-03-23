import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const EVIDENCE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1eSrya-tFZxhvmeIAL0Qggzi4Ug7MemtwEG3MSZbwx8Y/edit?gid=2062108345#gid=2062108345";

const SENTIMENT_NEXT_STEPS = [
  "Design for transparency and control to reduce ethical concerns",
  "Highlight high-value, appropriate use cases (not everything AI can do)",
  "Focus on reliable, high-confidence use cases first",
];

const researchData = {
  overview: {
    period: "May 2025 - Feb 2026",
    stats: [
      { label: "faculty", value: "25" },
      { label: "User interviews + Usability testing", value: "41" },
      { label: "queries sent to Ask me", value: "345" },
      { label: "projects analyzed", value: "3000" },
    ],
    audience: "Comprising majorly CreateAI Builder users/interested in AI",
  },
  prioritization: [
    {
      label: "Reach",
      description:
        "Issue was mentioned by distinct users across studies - not just the one who spoke the loudest in the room",
    },
    {
      label: "Consistency",
      description:
        "The same friction point surfaced independently across multiple research methods and user groups.",
    },
    {
      label: "Severity",
      description:
        "The issue actively blocks task completion - not just a minor annoyance, but a hard stop in the user journey.",
    },
  ],
  risks: [
    {
      id: 1,
      title:
        "Users fail to get started due to technical complexity and feeling overwhelmed",
      signal:
        "Users consistently struggle to get started - defaulting to ChatGPT, expressing confusion about core concepts (e.g., models, prompts, settings), and relying on training or external help to make progress.",
      concern: ">50% users mention this as their concern",
      impact: "Lower activation -> wasted acquisition",
      actions: [
        "Simplify entry flow",
        "Remove unused settings",
        "Reduce cognitive load",
      ],
    },
    {
      id: 2,
      title: "We have not defined why CreateAI exists for users",
      signal:
        "Users lack a clear understanding of when and how CreateAI fits into their work - without concrete use cases or differentiation, they default to more familiar tools.",
      impact:
        "Low adoption -> users don't build a habit or integrate CreateAI into their workflow",
      actions: [
        "Define and communicate 3-5 high-value use cases",
        "Position CreateAI clearly against ChatGPT (what it does better/differently)",
        "Provide role-based examples (faculty vs others)",
      ],
    },
    {
      id: 3,
      title: "We have not defined why CreateAI exists for users",
      signal:
        "Users deprioritize CreateAI in favor of tools that feel faster and more predictable, only engaging when they have time to explore rather than to complete a task.",
      impact: "Low engagement -> users don't move beyond initial trials",
      actions: [
        "Reduce time-to-value (88% projects send their first query in <= 1 min)",
        "Prioritize quick wins over complex setup or iteration",
        "Show immediate payoff early (before users invest effort)",
        "Minimize iteration required to get a usable result",
      ],
    },
    {
      id: 4,
      title: "Users don't trust CreateAI's output enough to rely on it",
      signal:
        "Users encounter inconsistent, inaccurate, or unpredictable outputs - especially with data and structured inputs - leading to concerns around hallucinations, lack of control, and hesitation to rely on CreateAI for real tasks.",
      impact: "Low retention -> users try it but don't adopt it for real work",
      actions: [
        "Reduce hallucinations or clearly signal uncertainty in responses (first for top most CreateAI use cases)",
        "Provide better controls and feedback loops to refine outputs",
        "Set clear expectations on what the AI can and cannot reliably do",
      ],
    },
    {
      id: 5,
      title: "Users prefer a conversational way to create projects, not a blank builder",
      signal:
        "Users commonly start drafting in ChatGPT and Custom instruction AI guide in CreateAI, using it to shape custom instructions, refine prompts, and convert ideas into a usable format before moving into CreateAI. The current builder feels less natural for this early-stage thinking, so users look for a more conversational starting point.",
      impact:
        "Users will feel overwhelmed and may stick to chatGPT as that aligns with their mental model",
      actions: [
        "Make the custom instructions guide more visible and discoverable",
        "Leverage custom instructions AI guide to help users draft their first prompt from the Custom instructions field",
      ],
    },
    {
      id: 6,
      title: "CreateAI is not the preferred tool for specific, high-value use cases",
      signal:
        "For high-stakes or specific tasks, users gravitate toward more focused tools that deliver predictable, high-quality results - while CreateAI's broader approach makes it harder to achieve the same level of confidence.",
      impact:
        "CreateAI becomes a secondary tool -> used occasionally, not embedded in core workflows",
      actions: [
        "Identify and double down on 2-3 high-value use cases where CreateAI can outperform alternatives",
        "Improve depth and quality in those specific use cases (not just breadth)",
        'Position CreateAI clearly for where it is strongest (not "everything tool")',
        "Integrate better with existing workflows/tools instead of competing broadly",
      ],
    },
  ],
  strengths: [
    {
      id: 1,
      title:
        "Templates and peer learning are effective entry points for getting started",
      signal:
        "Users are more likely to get started when supported by templates or guidance from peers, using these as practical ways to understand how CreateAI works and what to build.",
      impact:
        "Missed opportunity -> users continue to depend on external support instead of scaling independently",
      actions: [
        "Make high-quality templates more visible and contextual (Top most use cases)",
        "Enable sharing and discovery of peer-created projects (prioritize marketplace)",
        "Integrate lightweight guidance inspired by how peers teach each other",
      ],
    },
    {
      id: 2,
      title:
        "CreateAI delivers clear value through shareability and accessibility for students",
      signal:
        "Users consistently see value in CreateAI when they can share AI with students, provide controlled access, and create tools for real use for free",
      impact:
        "Lost differentiation -> CreateAI becomes interchangeable with paid, individual-use tools like ChatGPT",
      actions: [
        "Double down on student-facing use cases",
        "Make sharing workflows seamless and more visible",
        "Strengthen features around controlled and responsible AI usage",
        "Showcase real examples of student-impact use cases",
      ],
    },
  ],
};

export default function ResearchReportPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedRisk, setExpandedRisk] = useState(null);
  const [nextStepsRiskOpen, setNextStepsRiskOpen] = useState({});
  const [nextStepsStrengthOpen, setNextStepsStrengthOpen] = useState({});
  const [nextStepsSentimentOpen, setNextStepsSentimentOpen] = useState(false);

  const toggleNextStepsRisk = (id) => {
    setNextStepsRiskOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleNextStepsStrength = (id) => {
    setNextStepsStrengthOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const sections = [
    { id: "overview", label: "Overview", icon: Search },
    { id: "risks", label: "Top 6 Product Risks", icon: AlertTriangle },
    { id: "strengths", label: "Strengths", icon: CheckCircle2 },
    { id: "sentiment", label: "AI Sentiment", icon: Lightbulb },
    { id: "gap", label: "Investment Gap", icon: TrendingUp, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex relative">
      {/* Grid Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E5E5E5 1px, transparent 1px),
            linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Left Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-[#E5E5E5] p-6 flex flex-col z-50 hidden lg:flex">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-[#8C1D40] tracking-tight">
            Research Report
          </h1>
          <p className="text-sm text-gray-500 mt-1">Q1 2026</p>
        </div>

        <div className="space-y-2 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                activeTab === section.id
                  ? "bg-[#8C1D40] text-white shadow-sm"
                  : section.highlight
                    ? "text-[#8C1D40] hover:bg-[#FFC627]/10 border-2 border-[#FFC627]"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <section.icon size={20} />
              <span className="text-sm tracking-tight">{section.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-tight">
            Evidence across 6 studies
          </p>
          <p className="text-xs text-gray-400 tracking-tight">
            {researchData.overview.period}
          </p>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 p-4 z-50 lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-[#8C1D40] tracking-tight">
            Research Report
          </h1>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === section.id
                  ? "bg-[#8C1D40] text-white"
                  : section.highlight
                    ? "text-[#8C1D40] border border-[#FFC627]"
                    : "text-gray-600 bg-gray-50"
              }`}
            >
              <section.icon size={16} />
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-32 lg:pt-16 px-6 py-12 relative z-10">
        <div className="max-w-[900px] mx-auto">
          <AnimatePresence mode="wait">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <div className="max-w-[700px]">
                  <h2
                    className="text-5xl font-bold text-[#8C1D40] mb-4 leading-tight tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Top 6 Product Risks
                  </h2>
                  <p
                    className="text-2xl text-gray-700 leading-relaxed"
                    style={{ lineHeight: "1.5" }}
                  >
                    What should we change in the product this quarter?
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#8C1D40] mb-8 tracking-tight">
                    Evidence across 6 studies from distinct users
                    <span className="inline-flex items-center ml-3 px-4 py-1.5 rounded-full bg-[#FFC627]/10 border border-[#FFC627]/30 text-sm font-semibold tracking-tight whitespace-nowrap">
                      May 2025 - Feb 2026
                    </span>
                  </h3>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {researchData.overview.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#8C1D40]/5 p-6 rounded-2xl border border-[#8C1D40]/10"
                      >
                        <div
                          className="text-4xl font-semibold text-[#8C1D40] mb-2 tracking-tight"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-sm text-gray-600 leading-relaxed"
                          style={{ lineHeight: "1.6" }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p
                    className="text-gray-600 max-w-[700px]"
                    style={{ lineHeight: "1.6" }}
                  >
                    {researchData.overview.audience}
                  </p>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      View all evidence in detail
                    </p>
                    <a
                      href={EVIDENCE_SHEET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 rounded-sm"
                    >
                      <ExternalLink
                        size={14}
                        strokeWidth={1.5}
                        className="shrink-0 text-gray-400"
                        aria-hidden
                      />
                      <span className="border-b border-transparent pb-px hover:border-gray-400">
                        Open spreadsheet
                      </span>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FFC627]/10 to-[#FFC627]/5 rounded-3xl p-10 border border-[#FFC627]/20 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#8C1D40] mb-8 tracking-tight">
                    How are these product risks prioritized?
                  </h3>
                  <div className="space-y-6">
                    {researchData.prioritization.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
                      >
                        <div className="font-semibold text-[#8C1D40] text-lg mb-2 tracking-tight">
                          {item.label}
                        </div>
                        <div
                          className="text-gray-700 leading-relaxed max-w-[700px]"
                          style={{ lineHeight: "1.7" }}
                        >
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* RISKS */}
            {activeTab === "risks" && (
              <motion.div
                key="risks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2
                  className="text-4xl font-bold text-[#8C1D40] mb-8 max-w-[700px] leading-tight tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Top 6 Product Risks
                </h2>

                {researchData.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() =>
                        setExpandedRisk(
                          expandedRisk === risk.id ? null : risk.id
                        )
                      }
                      className="w-full p-8 flex items-start justify-between hover:bg-gray-50/50 transition-colors text-left"
                    >
                      <div className="flex-1 max-w-[700px]">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-white bg-[#8C1D40] px-3 py-1.5 rounded-full tracking-tight">
                            Risk {risk.id}
                          </span>
                          {risk.concern && (
                            <span className="text-xs text-[#FFC627] font-semibold tracking-tight">
                              {risk.concern}
                            </span>
                          )}
                        </div>
                        <h3
                          className="text-xl font-semibold text-gray-900 leading-snug tracking-tight"
                          style={{
                            lineHeight: "1.4",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {risk.title}
                        </h3>
                      </div>
                      {expandedRisk === risk.id ? (
                        <ChevronUp
                          className="text-[#8C1D40] ml-4 flex-shrink-0"
                          size={24}
                        />
                      ) : (
                        <ChevronDown
                          className="text-gray-400 ml-4 flex-shrink-0"
                          size={24}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedRisk === risk.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200"
                        >
                          <div className="p-10 space-y-10 bg-gradient-to-b from-gray-50/50 to-white">
                            {/* Evidence Signal */}
                            <div className="max-w-[700px]">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 bg-[#8C1D40] rounded-full"></div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                  Evidence signal
                                </h4>
                              </div>
                              <p
                                className="text-gray-800 leading-relaxed text-[17px] font-normal"
                                style={{ lineHeight: "1.7" }}
                              >
                                {risk.signal}
                              </p>
                            </div>

                            {/* Impact Section */}
                            <div className="max-w-[700px] bg-red-50/50 backdrop-blur-sm rounded-2xl p-6 border border-red-100">
                              <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle size={20} className="text-red-600" />
                                <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                                  If we ignore this
                                </h4>
                              </div>
                              <p
                                className="text-red-900 font-semibold text-[17px]"
                                style={{ lineHeight: "1.6" }}
                              >
                                {risk.impact}
                              </p>
                            </div>

                            {/* View evidence + What to do next (dropdown) */}
                            <div className="max-w-[700px] space-y-4">
                              <a
                                href={EVIDENCE_SHEET_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8C1D40] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6B1530] focus:outline-none focus:ring-2 focus:ring-[#FFC627] focus:ring-offset-2"
                              >
                                <ExternalLink size={18} aria-hidden />
                                View the evidence
                              </a>

                              <div className="overflow-hidden rounded-2xl border border-[#FFC627]/30 bg-white/60">
                                <button
                                  type="button"
                                  onClick={() => toggleNextStepsRisk(risk.id)}
                                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-[#FFC627]/10"
                                  aria-expanded={!!nextStepsRiskOpen[risk.id]}
                                >
                                  <span className="flex items-center gap-3">
                                    <div className="h-6 w-1 shrink-0 rounded-full bg-[#FFC627]" />
                                    <span className="text-sm font-semibold uppercase tracking-wider text-[#8C1D40]">
                                      What to do next
                                    </span>
                                  </span>
                                  {nextStepsRiskOpen[risk.id] ? (
                                    <ChevronUp
                                      className="shrink-0 text-[#8C1D40]"
                                      size={22}
                                    />
                                  ) : (
                                    <ChevronDown
                                      className="shrink-0 text-gray-500"
                                      size={22}
                                    />
                                  )}
                                </button>
                                <AnimatePresence initial={false}>
                                  {nextStepsRiskOpen[risk.id] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25 }}
                                      className="border-t border-[#FFC627]/20"
                                    >
                                      <ul className="space-y-4 px-4 py-4">
                                        {risk.actions.map((action, i) => (
                                          <li
                                            key={i}
                                            className="group flex items-start gap-4"
                                          >
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFC627]/20">
                                              <div className="h-2 w-2 rounded-full bg-[#FFC627]" />
                                            </div>
                                            <span
                                              className="text-[17px] leading-relaxed text-gray-700"
                                              style={{ lineHeight: "1.7" }}
                                            >
                                              {action}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}

            {/* STRENGTHS */}
            {activeTab === "strengths" && (
              <motion.div
                key="strengths"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <h2
                  className="text-4xl font-bold text-[#8C1D40] mb-8 max-w-[700px] leading-tight tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Strengths
                </h2>

                {researchData.strengths.map((strength) => (
                  <div
                    key={strength.id}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-10 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-semibold text-white bg-green-600 px-3 py-1.5 rounded-full tracking-tight">
                        Strength {strength.id}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-semibold text-gray-900 mb-8 max-w-[700px] leading-snug tracking-tight"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {strength.title}
                    </h3>

                    <div className="space-y-8">
                      <div className="max-w-[700px]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-1 h-6 bg-[#8C1D40] rounded-full"></div>
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Evidence signal
                          </h4>
                        </div>
                        <p
                          className="text-gray-800 leading-relaxed text-[17px]"
                          style={{ lineHeight: "1.7" }}
                        >
                          {strength.signal}
                        </p>
                      </div>

                      <div className="max-w-[700px] bg-red-50/50 rounded-2xl p-6 border border-red-100">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle size={18} className="text-red-600" />
                          <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                            If we ignore this
                          </h4>
                        </div>
                        <p
                          className="text-red-900 font-semibold text-[17px]"
                          style={{ lineHeight: "1.6" }}
                        >
                          {strength.impact}
                        </p>
                      </div>

                      <div className="max-w-[700px] space-y-4">
                        <a
                          href={EVIDENCE_SHEET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8C1D40] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6B1530] focus:outline-none focus:ring-2 focus:ring-[#FFC627] focus:ring-offset-2"
                        >
                          <ExternalLink size={18} aria-hidden />
                          View the evidence
                        </a>

                        <div className="overflow-hidden rounded-2xl border border-[#FFC627]/30 bg-white/60">
                          <button
                            type="button"
                            onClick={() => toggleNextStepsStrength(strength.id)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-[#FFC627]/10"
                            aria-expanded={!!nextStepsStrengthOpen[strength.id]}
                          >
                            <span className="flex items-center gap-3">
                              <div className="h-6 w-1 shrink-0 rounded-full bg-[#FFC627]" />
                              <span className="text-sm font-semibold uppercase tracking-wider text-[#8C1D40]">
                                What to do next
                              </span>
                            </span>
                            {nextStepsStrengthOpen[strength.id] ? (
                              <ChevronUp
                                className="shrink-0 text-[#8C1D40]"
                                size={22}
                              />
                            ) : (
                              <ChevronDown
                                className="shrink-0 text-gray-500"
                                size={22}
                              />
                            )}
                          </button>
                          <AnimatePresence initial={false}>
                            {nextStepsStrengthOpen[strength.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="border-t border-[#FFC627]/20"
                              >
                                <ul className="space-y-3 px-4 py-4">
                                  {strength.actions.map((action, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-4"
                                    >
                                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFC627]/20">
                                        <div className="h-2 w-2 rounded-full bg-[#FFC627]" />
                                      </div>
                                      <span
                                        className="text-[17px] leading-relaxed text-gray-700"
                                        style={{ lineHeight: "1.7" }}
                                      >
                                        {action}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* SENTIMENT */}
            {activeTab === "sentiment" && (
              <motion.div
                key="sentiment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="max-w-[700px]">
                  <h2
                    className="text-4xl font-bold text-[#8C1D40] mb-4 leading-tight tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Sentiment towards AI
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 backdrop-blur-sm rounded-3xl border border-amber-200 p-10 shadow-sm">
                  <h3
                    className="text-2xl font-semibold text-amber-900 mb-8 max-w-[700px] leading-snug tracking-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    AI expectations are misaligned with reality, creating skepticism and misuse
                  </h3>

                  <div className="space-y-8">
                    <div className="max-w-[700px]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1 h-6 bg-amber-600 rounded-full"></div>
                        <h4 className="text-sm font-semibold text-amber-700 uppercase tracking-wider">
                          Evidence signal
                        </h4>
                      </div>
                      <p
                        className="text-amber-950 leading-relaxed text-[17px]"
                        style={{ lineHeight: "1.7" }}
                      >
                        Users approach AI with high expectations but experience inconsistent results, ethical concerns, and negative impacts on learning - leading to skepticism, cautious adoption, and concerns around over-reliance, misuse, and reduced educational value. (especially faculty)
                      </p>
                    </div>

                    <div className="max-w-[700px] bg-red-50/70 rounded-2xl p-6 border border-red-200">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle size={18} className="text-red-600" />
                        <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                          If we ignore this
                        </h4>
                      </div>
                      <p
                        className="text-red-900 font-semibold text-[17px]"
                        style={{ lineHeight: "1.6" }}
                      >
                        Resistance to adoption -&gt; CreateAI faces skepticism regardless of product improvements
                      </p>
                    </div>

                    <div className="max-w-[700px] space-y-4">
                      <a
                        href={EVIDENCE_SHEET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      >
                        <ExternalLink size={18} aria-hidden />
                        View the evidence
                      </a>

                      <div className="overflow-hidden rounded-2xl border border-amber-300/60 bg-white/50">
                        <button
                          type="button"
                          onClick={() =>
                            setNextStepsSentimentOpen((o) => !o)
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-amber-100/40"
                          aria-expanded={nextStepsSentimentOpen}
                        >
                          <span className="flex items-center gap-3">
                            <div className="h-6 w-1 shrink-0 rounded-full bg-amber-500" />
                            <span className="text-sm font-semibold uppercase tracking-wider text-amber-800">
                              What to do next
                            </span>
                          </span>
                          {nextStepsSentimentOpen ? (
                            <ChevronUp
                              className="shrink-0 text-amber-800"
                              size={22}
                            />
                          ) : (
                            <ChevronDown
                              className="shrink-0 text-amber-700"
                              size={22}
                            />
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {nextStepsSentimentOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="border-t border-amber-200/80"
                            >
                              <ul className="space-y-3 px-4 py-4">
                                {SENTIMENT_NEXT_STEPS.map((text, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-4"
                                  >
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                                      <div className="h-2 w-2 rounded-full bg-amber-600" />
                                    </div>
                                    <span
                                      className="text-[17px] leading-relaxed text-amber-950"
                                      style={{ lineHeight: "1.7" }}
                                    >
                                      {text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* INVESTMENT GAP */}
            {activeTab === "gap" && (
              <motion.div
                key="gap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                <div className="bg-gradient-to-br from-[#8C1D40] to-[#6B1530] text-white rounded-3xl p-10 shadow-lg">
                  <h2
                    className="text-4xl font-bold mb-3 max-w-[700px] leading-tight tracking-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Investment Gap
                  </h2>
                  <p
                    className="text-white/80 text-lg max-w-[700px]"
                    style={{ lineHeight: "1.6" }}
                  >
                    Where we're investing vs. what users need
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#8C1D40] mb-6 tracking-tight">
                      Where are we investing today?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8C1D40] mt-2.5 flex-shrink-0"></div>
                        <span
                          className="text-gray-700 leading-relaxed text-[17px]"
                          style={{ lineHeight: "1.7" }}
                        >
                          Positioning CreateAI as a broad, all-in-one solution
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8C1D40] mt-2.5 flex-shrink-0"></div>
                        <span
                          className="text-gray-700 leading-relaxed text-[17px]"
                          style={{ lineHeight: "1.7" }}
                        >
                          Expanding into more advanced, agentic capabilities
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#8C1D40] mt-2.5 flex-shrink-0"></div>
                        <span
                          className="text-gray-700 leading-relaxed text-[17px]"
                          style={{ lineHeight: "1.7" }}
                        >
                          Covering a wide range of use cases across contexts
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm rounded-3xl border-2 border-red-300 p-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-red-800 mb-6 tracking-tight">
                      Where does the misalignment lay?
                    </h3>
                    <p
                      className="text-red-900 font-semibold leading-relaxed text-[17px]"
                      style={{ lineHeight: "1.7" }}
                    >
                      We are expanding breadth and complexity, while users are still struggling with clarity, simplicity, and trust in the current experience.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FFC627]/15 to-[#FFC627]/5 backdrop-blur-sm rounded-3xl border border-[#FFC627]/30 p-8 shadow-sm">
                  <p
                    className="text-gray-900 font-medium leading-relaxed text-[17px] max-w-[700px]"
                    style={{ lineHeight: "1.7" }}
                  >
                    As we expand CreateAI to solve many problems, users compare it against specialized tools that outperform it in specific use cases - making it harder for CreateAI to feel reliable or best-in-class.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}

