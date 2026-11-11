import React, { useState } from 'react';
import { Cpu, Plus, Trash2, Save, CheckCircle2, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillGroup } from '../../types/portfolio';

export const AdminSkills: React.FC = () => {
  const { data, updateSkillGroups } = usePortfolio();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(data.skillGroups);
  const [newSkillInputs, setNewSkillInputs] = useState<string[]>(['', '', '', '']);
  const [savedToast, setSavedToast] = useState(false);

  const handleGroupTitleChange = (idx: number, title: string) => {
    setSkillGroups((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], title };
      return copy;
    });
  };

  const handleGroupDescChange = (idx: number, description: string) => {
    setSkillGroups((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], description };
      return copy;
    });
  };

  const handleAddSkill = (groupIndex: number) => {
    const val = newSkillInputs[groupIndex]?.trim();
    if (!val) return;
    setSkillGroups((prev) => {
      const copy = [...prev];
      copy[groupIndex] = {
        ...copy[groupIndex],
        skills: [...copy[groupIndex].skills, val],
      };
      return copy;
    });
    setNewSkillInputs((prev) => {
      const copy = [...prev];
      copy[groupIndex] = '';
      return copy;
    });
  };

  const handleRemoveSkill = (groupIndex: number, skillIndex: number) => {
    setSkillGroups((prev) => {
      const copy = [...prev];
      copy[groupIndex] = {
        ...copy[groupIndex],
        skills: copy[groupIndex].skills.filter((_, i) => i !== skillIndex),
      };
      return copy;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkillGroups(skillGroups);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#2271b1]" />
            <span>Core Competencies & Capabilities</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Organize marketing, analytics, strategy, and engineering capabilities without fake percentage slop.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Skills</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          <span>Skills and competencies updated on public website!</span>
        </div>
      )}

      {/* 4 Skill Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Category Title
              </label>
              <input
                type="text"
                value={group.title}
                onChange={(e) => handleGroupTitleChange(gIdx, e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D] font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Category Description
              </label>
              <textarea
                rows={2}
                value={group.description}
                onChange={(e) => handleGroupDescChange(gIdx, e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded text-[#14263D]"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-[#14263D] mb-2">
                Active Competencies ({group.skills.length})
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 bg-[#F4F6F8] px-2.5 py-1 rounded border border-[#E2E7ED] text-xs font-medium text-[#202B38]"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(gIdx, sIdx)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add skill input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New skill (e.g. ROAS Modeling)"
                  value={newSkillInputs[gIdx] || ''}
                  onChange={(e) => {
                    const copy = [...newSkillInputs];
                    copy[gIdx] = e.target.value;
                    setNewSkillInputs(copy);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(gIdx);
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D]"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(gIdx)}
                  className="px-3 py-1.5 bg-[#14263D] text-white text-xs font-semibold rounded hover:bg-[#202B38] cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
