import React, { useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, Save, X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem } from '../../types/portfolio';

export const AdminExperience: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio();

  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [bulletsText, setBulletsText] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  const handleOpenAdd = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: 'Dhaka, Bangladesh',
      period: '',
      bullets: [],
      highlights: [],
    });
    setBulletsText('');
    setHighlightsText('');
    setIsNew(true);
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    setEditingItem(exp);
    setBulletsText(exp.bullets.join('\n'));
    setHighlightsText((exp.highlights || []).join('\n'));
    setIsNew(false);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setIsNew(false);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const bullets = bulletsText
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const highlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const finalized: ExperienceItem = {
      ...editingItem,
      bullets,
      highlights,
    };

    if (isNew) {
      addExperience(finalized);
    } else {
      updateExperience(finalized.id, finalized);
    }

    setEditingItem(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleDelete = (id: string, company: string) => {
    if (confirm(`Are you sure you want to delete the experience record for "${company}"?`)) {
      deleteExperience(id);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#2271b1]" />
            <span>Work Experience & Career History</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Manage your verified corporate employment history, achievements, and core responsibilities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Role</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          <span>Experience records updated and synced to live website!</span>
        </div>
      )}

      {/* Experience Cards / Table */}
      <div className="space-y-4">
        {data.experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#2271b1]/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  {exp.role}
                </h3>
                <div className="text-sm font-semibold text-[#2271b1] mt-0.5">
                  {exp.company}
                </div>
                <div className="flex items-center gap-4 text-xs text-[#657386] mt-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="p-2 text-slate-600 hover:text-[#2271b1] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit Role"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.company)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bullets preview */}
            <div className="space-y-1.5 pt-3 border-t border-[#E2E7ED]/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#657386]">
                Responsibilities ({exp.bullets.length})
              </div>
              <ul className="list-disc list-inside text-xs text-[#202B38] space-y-1">
                {exp.bullets.slice(0, 3).map((bullet, idx) => (
                  <li key={idx} className="line-clamp-1">
                    {bullet}
                  </li>
                ))}
                {exp.bullets.length > 3 && (
                  <li className="text-[11px] text-[#657386] list-none pl-4">
                    + {exp.bullets.length - 3} more points
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Experience Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-[#14263D]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-[#E2E7ED] overflow-hidden my-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#E2E7ED] bg-[#F4F6F8]">
              <h3 className="text-base font-bold text-[#14263D]">
                {isNew ? 'Add New Career Experience' : `Edit ${editingItem.company}`}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 text-slate-400 hover:text-[#14263D] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, role: e.target.value })
                    }
                    placeholder="e.g. Manager, Sales & Marketing"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Company / Employer
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, company: e.target.value })
                    }
                    placeholder="e.g. LensCart Bangladesh"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Employment Period / Dates
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.period}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, period: e.target.value })
                    }
                    placeholder="e.g. August 2025 – September 2026"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, location: e.target.value })
                    }
                    placeholder="Dhaka, Bangladesh"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Responsibilities (One per line)
                </label>
                <textarea
                  rows={5}
                  value={bulletsText}
                  onChange={(e) => setBulletsText(e.target.value)}
                  placeholder="Planned and executed digital marketing activities...&#10;Applied audience segmentation..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Documented Highlights / Contributions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="50% monthly revenue growth contribution&#10;Green Shades campaign leadership"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
                />
              </div>

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
                  {isNew ? 'Create Role' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
