import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  X,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Award,
  HardDrive,
  Cloud,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CaseStudy, ProjectCategory } from '../../types/portfolio';
import { projectCategories } from '../../data/portfolioData';
import { DrivePickerModal } from './DrivePickerModal';
import { DriveFileItem, PORTFOLIO_DRIVE_URL } from '../../utils/drive';

export const AdminPortfolio: React.FC = () => {
  const { data, addCaseStudy, updateCaseStudy, deleteCaseStudy } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [drivePickerOpen, setDrivePickerOpen] = useState(false);
  const [drivePickerTarget, setDrivePickerTarget] = useState<'visual' | 'driveLink'>('visual');

  // Form helper state for editing
  const [platformsText, setPlatformsText] = useState('');

  const handleDriveFileSelected = (file: DriveFileItem) => {
    if (!editingStudy) return;

    if (drivePickerTarget === 'driveLink') {
      setEditingStudy({
        ...editingStudy,
        driveLink: file.webViewLink || PORTFOLIO_DRIVE_URL,
      });
    } else {
      const fileUrl = file.thumbnailLink || file.webViewLink || PORTFOLIO_DRIVE_URL;
      const newVisual = {
        url: fileUrl,
        caption: file.name.replace(/\.[^/.]+$/, ''),
        type: 'creative' as const,
        metricsHighlight: 'Verified Google Drive Asset',
      };
      setEditingStudy({
        ...editingStudy,
        visuals: [...editingStudy.visuals, newVisual],
      });
    }
  };

  const filteredStudies = data.caseStudies.filter((cs) => {
    if (selectedCategory !== 'All' && cs.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cs.title.toLowerCase().includes(q) ||
      cs.industry.toLowerCase().includes(q) ||
      (cs.clientOrBrand && cs.clientOrBrand.toLowerCase().includes(q))
    );
  });

  const handleOpenAdd = () => {
    const newStudy: CaseStudy = {
      id: `cs-${Date.now()}`,
      title: '',
      category: 'Meta Ads',
      industry: 'E-commerce Retail',
      clientOrBrand: '',
      objective: '',
      challenge: '',
      strategy: '',
      execution: '',
      platformsAndTools: ['Meta Ads Manager', 'Instagram'],
      results: [
        { value: '+45%', label: 'Growth', context: 'Campaign conversion velocity' },
      ],
      visuals: [
        {
          url: '/assets/aistudio/file_000000002fec720680c18a03c24a997c_dea7d345.png',
          caption: 'Campaign screenshot proof',
          type: 'dashboard',
        },
      ],
    };
    setEditingStudy(newStudy);
    setPlatformsText(newStudy.platformsAndTools.join(', '));
    setIsNew(true);
  };

  const handleOpenEdit = (cs: CaseStudy) => {
    setEditingStudy(JSON.parse(JSON.stringify(cs)));
    setPlatformsText(cs.platformsAndTools.join(', '));
    setIsNew(false);
  };

  const handleCloseModal = () => {
    setEditingStudy(null);
    setIsNew(false);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudy) return;

    const platforms = platformsText
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const finalized: CaseStudy = {
      ...editingStudy,
      platformsAndTools: platforms,
    };

    if (isNew) {
      addCaseStudy(finalized);
    } else {
      updateCaseStudy(finalized.id, finalized);
    }

    setEditingStudy(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete case study "${title}"?`)) {
      deleteCaseStudy(id);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  const handleAddResultRow = () => {
    if (!editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      results: [
        ...editingStudy.results,
        { value: '+20%', label: 'Metric Label', context: 'Achievement context' },
      ],
    });
  };

  const handleRemoveResultRow = (idx: number) => {
    if (!editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      results: editingStudy.results.filter((_, i) => i !== idx),
    });
  };

  const handleAddVisualRow = () => {
    if (!editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      visuals: [
        ...editingStudy.visuals,
        {
          url: '/assets/aistudio/Meta-ads-moshorif__116__99f4ee55.png',
          caption: 'Campaign proof screenshot',
          type: 'dashboard',
        },
      ],
    });
  };

  const handleRemoveVisualRow = (idx: number) => {
    if (!editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      visuals: editingStudy.visuals.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#2271b1]" />
            <span>Campaign Portfolio & Case Studies</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Shopify/WP-style catalog management for all live case studies, results, and proof assets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campaign</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          <span>Case study successfully saved and synced to the public website!</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E7ED] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#14263D] text-white'
                  : 'text-[#657386] hover:bg-[#F4F6F8] hover:text-[#14263D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] sm:w-60">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#657386]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
          />
        </div>
      </div>

      {/* Shopify / WP Style Projects Table */}
      <div className="bg-white rounded-xl border border-[#E2E7ED] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F6F8] text-[#657386] font-bold border-b border-[#E2E7ED]">
                <th className="py-3 px-4">Proof Thumbnail</th>
                <th className="py-3 px-4">Title & Category</th>
                <th className="py-3 px-4">Client / Brand</th>
                <th className="py-3 px-4">Primary Results</th>
                <th className="py-3 px-4 text-center">Visuals</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7ED]">
              {filteredStudies.map((study) => {
                const thumb = study.visuals[0]?.url || data.personalInfo.images.heroPortrait;
                return (
                  <tr key={study.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 w-20">
                      <img
                        src={thumb}
                        alt="Thumb"
                        className="w-16 h-11 object-cover rounded border border-[#E2E7ED] bg-[#14263D]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#14263D] line-clamp-1 max-w-xs">
                        {study.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2271b1] bg-blue-50 px-2 py-0.2 rounded">
                          {study.category}
                        </span>
                        <span className="text-[11px] text-[#657386]">
                          {study.industry}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#202B38]">
                      {study.clientOrBrand || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {study.results.slice(0, 2).map((r, i) => (
                          <span
                            key={i}
                            className="bg-[#F4F6F8] text-[#14263D] font-bold px-2 py-0.5 rounded border border-[#E2E7ED] text-[10px]"
                          >
                            {r.value} {r.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#657386]">
                      {study.visuals.length}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(study)}
                          className="p-1.5 text-slate-600 hover:text-[#2271b1] hover:bg-slate-100 rounded cursor-pointer"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(study.id, study.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Study Add/Edit Modal */}
      {editingStudy && (
        <div className="fixed inset-0 z-50 bg-[#14263D]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-[#E2E7ED] overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E7ED] bg-[#F4F6F8]">
              <h3 className="text-base font-bold text-[#14263D]">
                {isNew ? 'Create New Case Study' : `Edit Campaign: ${editingStudy.title}`}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 text-slate-400 hover:text-[#14263D] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStudy.title}
                    onChange={(e) =>
                      setEditingStudy({ ...editingStudy, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingStudy.category}
                    onChange={(e) =>
                      setEditingStudy({
                        ...editingStudy,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  >
                    {projectCategories
                      .filter((c) => c !== 'All')
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editingStudy.industry}
                    onChange={(e) =>
                      setEditingStudy({ ...editingStudy, industry: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Client / Brand
                  </label>
                  <input
                    type="text"
                    value={editingStudy.clientOrBrand || ''}
                    onChange={(e) =>
                      setEditingStudy({
                        ...editingStudy,
                        clientOrBrand: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Campaign Objective
                </label>
                <textarea
                  rows={2}
                  value={editingStudy.objective}
                  onChange={(e) =>
                    setEditingStudy({ ...editingStudy, objective: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Marketing Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={editingStudy.challenge}
                    onChange={(e) =>
                      setEditingStudy({ ...editingStudy, challenge: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Strategic Approach & Audience Segmentation
                  </label>
                  <textarea
                    rows={3}
                    value={editingStudy.strategy}
                    onChange={(e) =>
                      setEditingStudy({ ...editingStudy, strategy: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Execution & Content Coordination
                </label>
                <textarea
                  rows={2}
                  value={editingStudy.execution}
                  onChange={(e) =>
                    setEditingStudy({ ...editingStudy, execution: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Platforms & Tools (comma-separated)
                </label>
                <input
                  type="text"
                  value={platformsText}
                  onChange={(e) => setPlatformsText(e.target.value)}
                  placeholder="Meta Ads Manager, Instagram, Advantage Campaign Budget, GA4"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

              {/* Results & KPIs rows */}
              <div className="space-y-3 pt-3 border-t border-[#E2E7ED]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14263D] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#20A37A]" />
                    Documented Results & KPIs
                  </span>
                  <button
                    type="button"
                    onClick={handleAddResultRow}
                    className="text-xs font-bold text-[#2271b1] hover:underline cursor-pointer"
                  >
                    + Add Result Metric
                  </button>
                </div>

                <div className="space-y-2">
                  {editingStudy.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 50%)"
                        value={res.value}
                        onChange={(e) => {
                          const updated = [...editingStudy.results];
                          updated[rIdx].value = e.target.value;
                          setEditingStudy({ ...editingStudy, results: updated });
                        }}
                        className="w-28 px-2.5 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={res.label}
                        onChange={(e) => {
                          const updated = [...editingStudy.results];
                          updated[rIdx].label = e.target.value;
                          setEditingStudy({ ...editingStudy, results: updated });
                        }}
                        className="w-44 px-2.5 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded"
                      />
                      <input
                        type="text"
                        placeholder="Context / Details"
                        value={res.context || ''}
                        onChange={(e) => {
                          const updated = [...editingStudy.results];
                          updated[rIdx].context = e.target.value;
                          setEditingStudy({ ...editingStudy, results: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveResultRow(rIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Proof Assets rows */}
              <div className="space-y-3 pt-3 border-t border-[#E2E7ED]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14263D] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#2271b1]" />
                    Visual Proof Screenshots ({editingStudy.visuals.length})
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDrivePickerTarget('visual');
                        setDrivePickerOpen(true);
                      }}
                      className="text-xs font-bold text-[#4285F4] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Select from Drive</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddVisualRow}
                      className="text-xs font-bold text-[#2271b1] hover:underline cursor-pointer"
                    >
                      + Add Custom URL
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {editingStudy.visuals.map((vis, vIdx) => (
                    <div key={vIdx} className="flex items-center gap-2 bg-[#F4F6F8] p-2 rounded border border-[#E2E7ED]">
                      <img
                        src={vis.url}
                        alt="Proof"
                        className="w-12 h-9 object-cover rounded border border-[#E2E7ED] bg-[#14263D]"
                      />
                      <input
                        type="text"
                        placeholder="Image URL / Path"
                        value={vis.url}
                        onChange={(e) => {
                          const updated = [...editingStudy.visuals];
                          updated[vIdx].url = e.target.value;
                          setEditingStudy({ ...editingStudy, visuals: updated });
                        }}
                        className="w-60 px-2 py-1 text-xs bg-white border border-[#E2E7ED] rounded"
                      />
                      <input
                        type="text"
                        placeholder="Caption / Description"
                        value={vis.caption}
                        onChange={(e) => {
                          const updated = [...editingStudy.visuals];
                          updated[vIdx].caption = e.target.value;
                          setEditingStudy({ ...editingStudy, visuals: updated });
                        }}
                        className="flex-1 px-2 py-1 text-xs bg-white border border-[#E2E7ED] rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVisualRow(vIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Drive Proof Link */}
              <div className="pt-3 border-t border-[#E2E7ED]">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#14263D] flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-[#4285F4]" />
                    <span>Google Drive Proof URL</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setDrivePickerTarget('driveLink');
                      setDrivePickerOpen(true);
                    }}
                    className="text-xs font-bold text-[#4285F4] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Pick from Drive</span>
                  </button>
                </div>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={editingStudy.driveLink || ''}
                  onChange={(e) =>
                    setEditingStudy({ ...editingStudy, driveLink: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E7ED]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-[#E2E7ED] text-xs font-semibold rounded-lg hover:bg-[#F4F6F8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  {isNew ? 'Publish Campaign' : 'Update Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Drive File Picker Modal */}
      <DrivePickerModal
        isOpen={drivePickerOpen}
        onClose={() => setDrivePickerOpen(false)}
        onSelectFile={handleDriveFileSelected}
        title={
          drivePickerTarget === 'driveLink'
            ? 'Select Google Drive File for Proof Link'
            : 'Select Campaign Visual from Google Drive'
        }
      />
    </div>
  );
};
