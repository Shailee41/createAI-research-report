import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
        "Users consistently struggle to get started-defaulting to ChatGPT, expressing confusion about core concepts (e.g., models, prompts, settings), and relying on training or external help to make progress.",
      concern: ">50% users mention that this is their concern",
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
        "Users lack a clear understanding of when and how CreateAI fits into their work-without concrete use cases or differentiation, they default to more familiar tools.",
      impact:
        "Low adoption -> users do not build a habit or integrate CreateAI into their workflow",
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
      impact: "Low engagement -> users do not move beyond initial trials",
      actions: [
        "Reduce time-to-value (88% projects send their first query in <= 1 min)",
        "Prioritize quick wins over complex setup or iteration",
        "Show immediate payoff early (before users invest effort)",
        "Minimize iteration required to get a usable result",
      ],
    },
    {
      id: 4,
      title: "Users do not trust CreateAI's output enough to rely on it",
      signal:
        "Users encounter inconsistent, inaccurate, or unpredictable outputs-especially with data and structured inputs-leading to concerns around hallucinations, lack of control, and hesitation to rely on CreateAI for real tasks.",
      impact: "Low retention -> users try it but do not adopt it for real work",
      actions: [
        "Reduce hallucinations or clearly signal uncertainty in responses (first for top most CreateAI use cases)",
        "Provide better controls and feedback loops to refine outputs",
        "Set clear expectations on what the AI can and cannot reliably do",
      ],
    },
    {
      id: 5,
      title:
        "Users prefer a conversational way to create projects, not a blank builder",
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
      title:
        "CreateAI is not the preferred tool for specific, high-value use cases",
      signal:
        "For high-stakes or specific tasks, users gravitate toward more focused tools that deliver predictable, high-quality results-while CreateAI's broader approach makes it harder to achieve the same level of confidence.",
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

      <main className="flex-1 lg:ml-64 pt-32 lg:pt-16 px-6 py-12 relative z-10">
        <div className="max-w-[900px] mx-auto">
          <AnimatePresence mode="wait">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`
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
