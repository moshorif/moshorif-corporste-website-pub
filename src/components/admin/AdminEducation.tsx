import React, { useState } from 'react';
import { GraduationCap, Award, Plus, Trash2, Edit2, Save, CheckCircle2, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Certification } from '../../types/portfolio';

export const AdminEducation: React.FC = () => {
  const { data, updateEducation, updateCertifications } = usePortfolio();

  const [education, setEducation] = useState(data.education);
  const [certs, setCerts] = useState<Certification[]>(data.certifications);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const handleEducationChange = (field: keyof typeof education, val: string) => {
    setEducation((prev) => ({ ...prev, [field]: val }));
  };

  const handleOpenAddCert = () => {
    setEditingCert({
      title: '',
      issuer: '',
      description: '',
      year: new Date().getFullYear().toString(),
    });
    setEditingIndex(null);
  };

  const handleOpenEditCert = (cert: Certification, index: number) => {
    setEditingCert({ ...cert });
    setEditingIndex(index);
  };

  const handleSaveCertModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (editingIndex === null) {
      setCerts((prev) => [...prev, editingCert]);
    } else {
      setCerts((prev) => {
        const copy = [...prev];
        copy[editingIndex] = editingCert;
        return copy;
      });
    }
    setEditingCert(null);
    setEditingIndex(null);
  };

  const handleDeleteCert = (index: number) => {
    if (confirm('Are you sure you want to remove this certification?')) {
      setCerts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(education);
    updateCertifications(certs);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#2271b1]" />
            <span>Education & Industry Accreditations</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Update your B.Sc. in Computer Science & Engineering details and verified certifications.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          <span>Education and certifications saved to public website!</span>
        </div>
      )}

      {/* Higher Education Card */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
          Higher Education Degree
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#14263D] mb-1">
              Degree Name
            </label>
            <input
              type="text"
              value={education.degree}
              onChange={(e) => handleEducationChange('degree', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#14263D] mb-1">
              University / Institution
            </label>
            <input
              type="text"
              value={education.institution}
              onChange={(e) => handleEducationChange('institution', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#14263D] mb-1">
              Graduation Status / Timeline
            </label>
            <input
              type="text"
              value={education.status}
              onChange={(e) => handleEducationChange('status', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#14263D] mb-1">
              Academic Focus & Engineering Context
            </label>
            <textarea
              rows={2}
              value={education.focus}
              onChange={(e) => handleEducationChange('focus', e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D]"
            />
          </div>
        </div>
      </div>

      {/* Certifications Table */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E7ED] pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D]">
            Industry Certifications ({certs.length})
          </h3>
          <button
            type="button"
            onClick={handleOpenAddCert}
            className="text-xs font-bold text-[#2271b1] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="space-y-3">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-[#E2E7ED] bg-[#F4F6F8] flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[#14263D]">
                  {cert.title}
                </div>
                <div className="text-[11px] text-[#657386]">
                  {cert.issuer} {cert.year ? `• ${cert.year}` : ''}
                </div>
                {cert.description && (
                  <p className="text-[11px] text-[#202B38] line-clamp-1">
                    {cert.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEditCert(cert, idx)}
                  className="p-1.5 text-slate-600 hover:text-[#2271b1] rounded cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCert(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cert Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-[#14263D]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-[#E2E7ED] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E7ED] bg-[#F4F6F8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#14263D]">
                {editingIndex === null ? 'Add Certification' : 'Edit Certification'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="text-slate-400 hover:text-[#14263D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCertModal} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Certification Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, title: e.target.value })
                  }
                  placeholder="e.g. Meta Certified Digital Marketing Associate"
                  className="w-full px-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Issuer *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuer}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, issuer: e.target.value })
                    }
                    placeholder="e.g. Meta"
                    className="w-full px-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14263D] mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingCert.year || ''}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, year: e.target.value })
                    }
                    placeholder="2026"
                    className="w-full px-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14263D] mb-1">
                  Description / Focus
                </label>
                <textarea
                  rows={3}
                  value={editingCert.description || ''}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E7ED]">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-3 py-1.5 border border-[#E2E7ED] text-xs rounded hover:bg-[#F4F6F8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
