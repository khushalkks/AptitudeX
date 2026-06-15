import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  Search,
  MapPin,
  Clock,
  ExternalLink,
  Building2,
  DollarSign,
  Filter,
  Bell,
  BellOff,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Briefcase,
  ChevronRight,
  TrendingUp,
  UserCheck,
  Calendar,
  X,
  Sparkles
} from "lucide-react";

// Connect to Socket.io backend
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

const Applications = () => {
  // Tabs
  const [activeTab, setActiveTab] = useState("pipeline"); // "pipeline" or "search"

  // Pipeline State
  const [trackedApps, setTrackedApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Live Job Search State
  const [searchQuery, setSearchQuery] = useState("React Developer");
  const [searchLocation, setSearchLocation] = useState("Remote");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Modals & Forms State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    position: "",
    company: "",
    status: "Applied",
    score: 80,
    appliedDate: new Date().toISOString().substring(0, 10),
  });

  // UI Feedback State
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");
  const [importingJobId, setImportingJobId] = useState(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Fetch Tracked Applications on Mount
  const fetchTrackedApps = async () => {
    setLoadingApps(true);
    try {
      const res = await fetch(`${apiBase}/dashboard/applications`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTrackedApps(data);
      } else {
        console.error("Invalid application data format:", data);
      }
    } catch (err) {
      console.error("Error fetching tracked applications:", err);
      showError("Failed to fetch tracked applications.");
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    fetchTrackedApps();
  }, []);

  // Socket.io Real-time Updates Setup
  useEffect(() => {
    socket.on("new-application", (newApp) => {
      setTrackedApps((prev) => {
        if (prev.some((app) => app._id === newApp._id)) return prev;
        showSuccess(`New application tracked: ${newApp.position} at ${newApp.company}`);
        return [...prev, newApp];
      });
    });

    socket.on("update-application", (updatedApp) => {
      setTrackedApps((prev) => {
        showSuccess(`Application updated: ${updatedApp.position} at ${updatedApp.company}`);
        return prev.map((app) => (app._id === updatedApp._id ? updatedApp : app));
      });
    });

    socket.on("delete-application", (deletedId) => {
      setTrackedApps((prev) => {
        const deletedApp = prev.find((app) => app._id === deletedId);
        if (deletedApp) {
          showSuccess(`Removed application: ${deletedApp.position} at ${deletedApp.company}`);
        }
        return prev.filter((app) => app._id !== deletedId);
      });
    });

    return () => {
      socket.off("new-application");
      socket.off("update-application");
      socket.off("delete-application");
    };
  }, []);

  // Fetch Live Jobs
  const handleLiveSearch = async (e) => {
    if (e) e.preventDefault();
    setSearching(true);
    setSearchResults([]);
    try {
      const res = await fetch(
        `${apiBase}/jobs?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`
      );
      if (!res.ok) {
        throw new Error("Job search endpoint returned error status");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        console.warn("Unexpected JSearch format:", data);
      }
    } catch (err) {
      console.error("Error searching live jobs:", err);
      showError("Live job search failed. Please verify API key setup.");
    } finally {
      setSearching(false);
    }
  };

  // Perform a default live search once if the tab is selected
  useEffect(() => {
    if (activeTab === "search" && searchResults.length === 0) {
      handleLiveSearch();
    }
  }, [activeTab]);

  // Toast Helpers
  const showSuccess = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const showError = (msg) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(""), 4000);
  };

  // Move Application Status
  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(`${apiBase}/dashboard/update-application/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setTrackedApps((prev) =>
          prev.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
        );
        showSuccess(`Moved to ${newStatus}`);
      } else {
        showError(data.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showError("Failed to update status due to network error.");
    }
  };

  // Delete Application
  const handleDeleteApp = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this tracked application?")) return;
    try {
      const res = await fetch(`${apiBase}/dashboard/delete-application/${appId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setTrackedApps((prev) => prev.filter((app) => app._id !== appId));
        showSuccess("Application removed from tracker.");
      } else {
        showError(data.message || "Failed to delete application.");
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      showError("Failed to delete application due to network error.");
    }
  };

  // Add Custom Application Manually
  const handleAddCustomApp = async (e) => {
    e.preventDefault();
    if (!newAppForm.position.trim() || !newAppForm.company.trim()) {
      showError("Please enter both Position and Company.");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/dashboard/add-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: newAppForm.position,
          company: newAppForm.company,
          status: newAppForm.status,
          score: Number(newAppForm.score),
          appliedDate: new Date(newAppForm.appliedDate),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTrackedApps((prev) => [...prev, data]);
        showSuccess(`Tracked application for ${data.position} at ${data.company}!`);
        setShowAddModal(false);
        setNewAppForm({
          position: "",
          company: "",
          status: "Applied",
          score: 80,
          appliedDate: new Date().toISOString().substring(0, 10),
        });
      } else {
        showError(data.message || "Failed to add application.");
      }
    } catch (err) {
      console.error("Error adding custom application:", err);
      showError("Failed to add custom application due to network error.");
    }
  };

  // Import Job from Live Search results
  const handleImportJob = async (job) => {
    setImportingJobId(job.id);
    try {
      const res = await fetch(`${apiBase}/dashboard/add-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: job.title,
          company: job.company,
          status: "Applied",
          score: Math.floor(Math.random() * 25) + 70, // Simulated ATS Match Score
          appliedDate: new Date(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTrackedApps((prev) => [...prev, data]);
        showSuccess(`Successfully imported & tracking: ${job.title} at ${job.company}!`);
      } else {
        showError(data.message || "Failed to track job.");
      }
    } catch (err) {
      console.error("Error tracking job:", err);
      showError("Failed to track job due to network error.");
    } finally {
      setImportingJobId(null);
    }
  };

  // Group applications by status for Kanban Board
  const columns = {
    Applied: trackedApps.filter((app) => app.status === "Applied"),
    "Under Review": trackedApps.filter((app) => app.status === "Under Review"),
    Interview: trackedApps.filter((app) => app.status === "Interview"),
    Rejected: trackedApps.filter((app) => app.status === "Rejected"),
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "bg-emerald-500 text-white";
    if (score >= 70) return "bg-indigo-500 text-white";
    return "bg-amber-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/50 p-6">
      
      {/* Toast Notifications */}
      {successToast && (
        <div className="fixed bottom-5 right-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 animate-bounce">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">{successToast}</span>
        </div>
      )}
      {errorToast && (
        <div className="fixed bottom-5 right-5 bg-gradient-to-r from-rose-500 to-red-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 animate-shake">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold text-sm">{errorToast}</span>
        </div>
      )}

      {/* Header & Stats Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="text-purple-600 h-8 w-8" />
              Advanced Job Application Tracker
            </h1>
            <p className="text-gray-600 mt-1">
              Live updates & smart pipelines to command your career
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            Add Application
          </button>
        </div>

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Tracked",
              val: trackedApps.length,
              icon: <Briefcase className="text-blue-600" />,
              bg: "from-blue-50 to-cyan-50",
              border: "border-blue-200"
            },
            {
              title: "Applied Stage",
              val: columns["Applied"].length,
              icon: <Calendar className="text-amber-600" />,
              bg: "from-amber-50 to-orange-50",
              border: "border-amber-200"
            },
            {
              title: "Active Interviews",
              val: columns["Interview"].length,
              icon: <UserCheck className="text-emerald-600" />,
              bg: "from-emerald-50 to-green-50",
              border: "border-emerald-200"
            },
            {
              title: "Under Review",
              val: columns["Under Review"].length,
              icon: <TrendingUp className="text-indigo-600" />,
              bg: "from-indigo-50 to-purple-50",
              border: "border-indigo-200"
            }
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.bg} border ${stat.border} p-5 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300`}
            >
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1">
                  {stat.title}
                </span>
                <span className="text-3xl font-black text-gray-800">{stat.val}</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="max-w-7xl mx-auto mb-8 border-b border-gray-200/50 flex space-x-6">
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`pb-4 text-base font-bold transition-all duration-300 relative ${
            activeTab === "pipeline"
              ? "text-purple-700"
              : "text-gray-400 hover:text-purple-600"
          }`}
        >
          Pipeline Board
          {activeTab === "pipeline" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`pb-4 text-base font-bold transition-all duration-300 relative ${
            activeTab === "search"
              ? "text-purple-700"
              : "text-gray-400 hover:text-purple-600"
          }`}
        >
          🔍 Live Job Finder (JSearch API)
          {activeTab === "search" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-full" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Tab 1: KANBAN BOARD PIPELINE */}
        {activeTab === "pipeline" && (
          <div>
            {loadingApps ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
                <p className="text-gray-500 font-medium">Syncing with dashboard...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.keys(columns).map((statusName) => {
                  const appsInCol = columns[statusName];
                  return (
                    <div
                      key={statusName}
                      className="bg-slate-100/70 border border-slate-200/50 rounded-3xl p-4 flex flex-col min-h-[500px]"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-base font-black text-gray-800">{statusName}</h3>
                        <span className="bg-white px-2.5 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-slate-200">
                          {appsInCol.length}
                        </span>
                      </div>

                      {/* Column Cards */}
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px] scrollbar-thin">
                        {appsInCol.map((app) => (
                          <div
                            key={app._id}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 hover:shadow-md hover:border-purple-200/75 transition-all duration-300 group"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-gray-800 leading-tight">
                                  {app.position}
                                </h4>
                                <p className="text-sm font-semibold text-purple-600 mt-1 flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {app.company}
                                </p>
                              </div>
                              {app.score && (
                                <span
                                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ${getScoreColor(
                                    app.score
                                  )}`}
                                  title="ATS Score Match"
                                >
                                  {app.score}%
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Applied: {new Date(app.appliedDate).toLocaleDateString()}
                            </div>

                            {/* Card Actions */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              {/* Shift status dropdown */}
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                                className="text-xs font-bold text-gray-600 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400"
                              >
                                <option value="Applied">Applied</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                              </select>

                              <button
                                onClick={() => handleDeleteApp(app._id)}
                                className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all duration-300"
                                title="Remove Application"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {appsInCol.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-slate-300/60 rounded-2xl flex flex-col items-center justify-center p-4">
                            <span className="text-2xl opacity-60">📁</span>
                            <p className="text-xs text-gray-400 font-semibold mt-2">
                              No apps in this column
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: LIVE JOB SEARCH (JSEARCH API) */}
        {activeTab === "search" && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Live Job Search</h2>
                <p className="text-gray-500">
                  Search millions of listings online and import them directly into your pipeline with one click.
                </p>
              </div>

              {/* API Connection Indicator */}
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-200">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold">API Linked & Ready</span>
              </div>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleLiveSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job Role (e.g. React Developer)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (e.g. Remote, Chicago)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={searching}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold py-3.5 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                {searching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Searching database...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Search Live Jobs</span>
                  </>
                )}
              </button>
            </form>

            {/* Search Results List */}
            <div className="space-y-6">
              {searchResults.map((job) => {
                const isAlreadyTracked = trackedApps.some(
                  (app) => app.position.toLowerCase() === job.title.toLowerCase() &&
                           app.company.toLowerCase() === job.company.toLowerCase()
                );
                return (
                  <div
                    key={job.id}
                    className="border border-slate-150 p-6 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row justify-between gap-6"
                  >
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center space-x-3 flex-wrap mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                            {job.type}
                          </span>
                        </div>
                        <p className="font-semibold text-purple-600 flex items-center gap-1.5">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {job.requirements && job.requirements.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {job.requirements.map((req, i) => (
                            <span
                              key={i}
                              className="text-xs bg-slate-100/80 text-slate-600 px-2.5 py-1 rounded-md font-semibold border border-slate-200/30"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex lg:flex-col justify-end lg:justify-center items-end gap-3 min-w-[150px]">
                      {isAlreadyTracked ? (
                        <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black px-4 py-2.5 rounded-xl block text-center w-full">
                          ✓ Already Tracking
                        </span>
                      ) : (
                        <button
                          onClick={() => handleImportJob(job)}
                          disabled={importingJobId !== null}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold px-5 py-2.5 text-sm hover:from-purple-700 hover:to-indigo-700 w-full transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                        >
                          {importingJobId === job.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              <span>Track Job</span>
                            </>
                          )}
                        </button>
                      )}

                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center space-x-1.5 w-full text-center"
                      >
                        <span>Apply</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}

              {searchResults.length === 0 && !searching && (
                <div className="text-center py-20 flex flex-col items-center">
                  <span className="text-4xl">🔎</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-4">Start your search</h3>
                  <p className="text-gray-500 text-sm max-w-sm mt-1">
                    Enter job parameters above to pull live vacancy data from top recruiters.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-600 px-6 py-5 flex justify-between items-center text-white">
              <h3 className="text-lg font-bold">Add Custom Application</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomApp} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-1.5">
                  Job Position / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newAppForm.position}
                  onChange={(e) => setNewAppForm({ ...newAppForm, position: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-1.5">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google"
                  value={newAppForm.company}
                  onChange={(e) => setNewAppForm({ ...newAppForm, company: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-1.5">
                    ATS Match Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    value={newAppForm.score}
                    onChange={(e) => setNewAppForm({ ...newAppForm, score: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-1.5">
                    Stage Status
                  </label>
                  <select
                    value={newAppForm.status}
                    onChange={(e) => setNewAppForm({ ...newAppForm, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-1.5">
                  Applied Date
                </label>
                <input
                  type="date"
                  value={newAppForm.appliedDate}
                  onChange={(e) => setNewAppForm({ ...newAppForm, appliedDate: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-xl font-bold py-3 hover:from-purple-800 hover:to-indigo-800 transition-all shadow-md shadow-purple-500/10 flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Track Application</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
