import React, { useState } from "react";
import { marked } from "marked";
import {
  Search,
  Github,
  Star,
  GitFork,
  BookOpen,
  Code,
  AlertCircle,
  Award,
  Compass,
  TrendingUp,
  MapPin,
  Users,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Cpu,
  Layers,
  FileDown
} from "lucide-react";

const GithubAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);
    setCopied(false);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBaseUrl}/github/analyze/${encodeURIComponent(username.trim())}`);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `GitHub user "${username}" not found or API limits exceeded.`);
      }

      const data = await response.json();
      if (data.success) {
        setReport(data);
      } else {
        throw new Error(data.error || "Analysis failed.");
      }
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(err.message || "Something went wrong. Please check the username and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy report to clipboard
  const handleCopyReport = () => {
    if (!report) return;
    navigator.clipboard.writeText(report.ai_analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for language colors (Premium Tailored Palette)
  const getLanguageDetails = (lang) => {
    const defaultDetails = {
      color: "from-purple-500 to-indigo-600",
      bg: "bg-purple-50 text-purple-700",
      dot: "bg-purple-600"
    };

    const details = {
      javascript: {
        color: "from-amber-400 to-yellow-500",
        bg: "bg-yellow-50 text-yellow-800",
        dot: "bg-yellow-500"
      },
      typescript: {
        color: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50 text-blue-800",
        dot: "bg-blue-600"
      },
      python: {
        color: "from-sky-400 to-blue-500",
        bg: "bg-sky-50 text-sky-800",
        dot: "bg-sky-500"
      },
      html: {
        color: "from-orange-500 to-red-500",
        bg: "bg-orange-50 text-orange-800",
        dot: "bg-orange-500"
      },
      css: {
        color: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 text-indigo-800",
        dot: "bg-indigo-500"
      },
      java: {
        color: "from-amber-700 to-orange-800",
        bg: "bg-amber-50 text-amber-900",
        dot: "bg-amber-700"
      },
      "c++": {
        color: "from-rose-500 to-red-600",
        bg: "bg-rose-50 text-rose-800",
        dot: "bg-rose-500"
      },
      c: {
        color: "from-slate-500 to-slate-700",
        bg: "bg-slate-50 text-slate-800",
        dot: "bg-slate-500"
      },
      go: {
        color: "from-cyan-400 to-teal-500",
        bg: "bg-cyan-50 text-cyan-800",
        dot: "bg-cyan-500"
      },
      ruby: {
        color: "from-red-500 to-rose-700",
        bg: "bg-red-50 text-red-800",
        dot: "bg-red-500"
      },
      rust: {
        color: "from-orange-600 to-amber-700",
        bg: "bg-orange-50 text-orange-900",
        dot: "bg-orange-600"
      },
      php: {
        color: "from-violet-500 to-fuchsia-600",
        bg: "bg-violet-50 text-violet-800",
        dot: "bg-violet-500"
      }
    };
    return details[lang.toLowerCase()] || defaultDetails;
  };

  // Safe markdown parser
  const renderMarkdown = (text) => {
    return { __html: marked(text || "") };
  };

  // Generate a developer persona title based on repositories
  const getDeveloperPersona = () => {
    if (!report) return "";
    const mainLang = report.profile.top_languages[0]?.name || "JavaScript";
    const totalRepos = report.profile.public_repos;
    const stars = report.profile.total_stars;

    if (stars >= 50) return `Elite ${mainLang} Architect`;
    if (totalRepos >= 30) return `Polyglot Stack Explorer`;
    if (mainLang.toLowerCase() === "python" || mainLang.toLowerCase() === "r") return `AI & Systems Analyst`;
    return `${mainLang} Solutions Developer`;
  };

  return (
    <div className="github-analyzer-page min-h-screen text-slate-800 p-6 md:p-10 font-sans antialiased relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* Ambient background glowing meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none"></div>

      {/* Dynamic Header Panel with Premium Gradient & Curved styling */}
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-14 mb-10 shadow-2xl border border-white/10 bg-gradient-to-r from-indigo-950 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(139,92,246,0.15),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-purple-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider">AI Portfolio Audit</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Command Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300">GitHub Identity</span>
            </h1>
          </div>

          <div className="w-full lg:w-auto flex justify-center">
            {/* Input Search Form with Capsule Layout */}
            <form onSubmit={handleAnalyze} className="bg-white p-2.5 rounded-[2rem] border border-white/25 flex flex-col sm:flex-row gap-2 max-w-md w-full shadow-2xl focus-within:ring-2 focus-within:ring-purple-500/50 transition-all duration-300">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-black border-0 focus:outline-none focus:ring-0 text-sm font-semibold placeholder-gray-400"
                  style={{ color: "#000000" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-[1.5rem] py-3.5 px-8 text-sm font-black transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing Code...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Generate Audit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto mb-10 bg-rose-50 backdrop-blur-xl border border-rose-200 rounded-3xl p-6 flex items-center space-x-4 text-rose-800 font-bold animate-fadeIn">
          <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
          <div className="text-sm">
            <span className="block font-black">Authentication / Connection Issue</span>
            <span className="font-medium opacity-90 mt-0.5 block">{error}</span>
          </div>
        </div>
      )}

      {/* Main Results Layout */}
      {report && (
        <div className="max-w-7xl mx-auto space-y-10 animate-fadeIn">

          {/* Top Row: User details and Summary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Profile Detail Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-white shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-600/10 to-indigo-600/10 rounded-full opacity-50 -mr-5 -mt-5"></div>

              <div>
                <div className="flex items-center space-x-5 mb-6">
                  <img
                    src={report.profile.avatar_url}
                    alt={report.profile.username}
                    className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      {report.profile.name || report.profile.username}
                    </h2>
                    <a
                      href={report.profile.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-black text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1 mt-1.5"
                    >
                      @{report.profile.username}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Developer Persona Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-black mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  {getDeveloperPersona()}
                </div>

                {report.profile.bio && (
                  <p className="text-slate-600 text-sm italic leading-relaxed pt-2 border-t border-slate-100">
                    "{report.profile.bio}"
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
                {report.profile.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{report.profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span className="text-slate-900 font-black">{report.profile.followers.toLocaleString()}</span> followers
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-black">{report.profile.following.toLocaleString()}</span> following
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Stats Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Repositories",
                  val: report.profile.public_repos,
                  icon: <BookOpen className="text-blue-600" />,
                  desc: "Public codebases hosted on GitHub",
                  glow: "group-hover:border-blue-400/30"
                },
                {
                  title: "Stars Accrued",
                  val: report.profile.total_stars,
                  icon: <Star className="text-amber-500 fill-amber-500" />,
                  desc: "Codebase popularity indicators",
                  glow: "group-hover:border-amber-400/30"
                },
                {
                  title: "Cloned Forks",
                  val: report.profile.total_forks,
                  icon: <GitFork className="text-emerald-600" />,
                  desc: "Community clones/extensions",
                  glow: "group-hover:border-emerald-400/30"
                },
                {
                  title: "Stack Focus",
                  val: report.profile.top_languages[0]?.name || "N/A",
                  icon: <Code className="text-purple-600" />,
                  desc: "Most frequent repository code tag",
                  glow: "group-hover:border-purple-400/30"
                }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-white shadow-2xl flex flex-col justify-between group hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-purple-500/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50/50 flex items-center justify-center border border-indigo-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.val}</h3>
                    <p className="text-[10px] text-slate-500 mt-1.5 font-bold">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Languages Distributions & Highlight Repositories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Tech stack distributions list */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-white shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Layers className="text-purple-600" />
                  Language Distributions
                </h3>

                <div className="space-y-5">
                  {report.profile.top_languages.map((lang, index) => {
                    const totalRepos = report.profile.public_repos || 1;
                    const pct = Math.min(Math.round((lang.count / totalRepos) * 100), 100);
                    const langDetails = getLanguageDetails(lang.name);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-[6px] ${langDetails.dot}`}></span>
                            {lang.name}
                          </span>
                          <span className="text-slate-500 font-extrabold">{lang.count} repos ({pct}%)</span>
                        </div>
                        <div className="w-full bg-indigo-50/50 rounded-full h-3.5 overflow-hidden p-[2px] border border-indigo-100">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${langDetails.color} shadow-sm transition-all duration-1000 ease-out`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {report.profile.top_languages.length === 0 && (
                    <p className="text-slate-400 text-sm italic py-8 text-center">No language tags found.</p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-[10px] text-slate-500 font-semibold leading-relaxed">
                * Percentages reflect repository counts tagging this specific language as the primary codebase language on GitHub.
              </div>
            </div>

            {/* Repos Showcase Cards */}
            <div className="bg-white/80 backdrop-blur-xl lg:col-span-2 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border border-white shadow-2xl">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Compass className="text-purple-600" />
                Highlight Projects Showcase
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report.top_repos.map((repo, i) => {
                  const langDetails = getLanguageDetails(repo.language || "");
                  return (
                    <div
                      key={i}
                      className="bg-white/50 border border-slate-100 p-5 sm:p-6 rounded-2xl hover:shadow-2xl hover:border-purple-400/30 hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="font-extrabold text-slate-800 leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                            {repo.name}
                          </h4>
                          {repo.language && (
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700`}>
                              {repo.language}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-6 font-medium">
                          {repo.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-4 h-4 text-indigo-500" />
                            {repo.forks}
                          </span>
                        </div>

                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-black text-purple-600 hover:text-purple-800 flex items-center gap-0.5 transition-colors"
                        >
                          View Code
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* AI Auditor evaluation sheet */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.05),transparent_60%)] pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50/50 text-purple-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm flex-shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">AI Portfolio Assessment Report</h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">Audited from live public codebase directories</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl border border-indigo-100 bg-white hover:bg-indigo-50/50 text-slate-700 shadow-sm transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Audit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Markdown Body with Styled Typography */}
            <div
              className="prose max-w-none text-slate-700 leading-relaxed text-sm md:text-base space-y-4
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:bg-gradient-to-r prose-h3:from-purple-600 prose-h3:to-indigo-600 prose-h3:bg-clip-text prose-h3:text-transparent
                prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-2 prose-li:font-medium
                prose-strong:font-bold prose-strong:text-slate-900"
              dangerouslySetInnerHTML={renderMarkdown(report.ai_analysis)}
            />
          </div>

        </div>
      )}

      {/* Empty State with detailed graphics design */}
      {!report && !loading && (
        <div className="text-center py-24 max-w-md mx-auto space-y-8 animate-fadeIn">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl scale-125"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] w-32 h-32 flex items-center justify-center mx-auto shadow-2xl border border-white" style={{ border: '1px solid rgba(255, 255, 255, 0.5)' }}>
              <Github className="h-16 w-16 text-purple-600" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">No Active Audit Report</h3>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">
              Input a developer's public GitHub handle in the top-right capsule to review their repositories, stars, and language focus with AI.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubAnalyzer;
