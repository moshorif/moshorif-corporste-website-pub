import React, { useState } from 'react';
import { Sparkles, Save, CheckCircle2, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CareerMetric } from '../../types/portfolio';

export const AdminHeroMetrics: React.FC = () => {
  const { data, updatePersonalInfo, updateCareerHighlights } = usePortfolio();

  const [headline, setHeadline] = useState(data.personalInfo.headline);
  const [supportingHeadline, setSupportingHeadline] = useState(
    data.personalInfo.supportingHeadline
  );
  const [metrics, setMetrics] = useState<CareerMetric[]>(data.careerHighlights);
  const [savedToast, setSavedToast] = useState(false);

  const handleMetricChange = (index: number, field: keyof CareerMetric, val: string) => {
    setMetrics((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      headline,
      supportingHeadline,
    });
    updateCareerHighlights(metrics);

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2271b1]" />
            <span>Hero Section & Highlight Metrics</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Customize the executive hero banners and the 5 documented proof metrics.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          <span>Hero headlines and highlight metrics updated on live website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Headlines */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
            Primary Headlines
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Main Hero Headline (H1)
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Supporting Value Proposition
              </label>
              <textarea
                rows={2}
                value={supportingHeadline}
                onChange={(e) => setSupportingHeadline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        {/* 5 Career Highlight Metrics */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E7ED] pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D]">
                5 Career Highlights & Milestones
              </h3>
              <p className="text-xs text-[#657386] mt-0.5">
                These display in the high-contrast executive strip on the homepage.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#E2E7ED] bg-[#F4F6F8] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2271b1]">
                    Metric #{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-[#14263D] mb-1">
                      Value (e.g. 50%, 20,000+)
                    </label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D] font-bold"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-[#14263D] mb-1">
                      Label / Achievement
                    </label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-[#14263D] mb-1">
                      Business / Campaign Context
                    </label>
                    <input
                      type="text"
                      value={metric.context}
                      onChange={(e) => handleMetricChange(idx, 'context', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs sm:text-sm font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero & Metrics</span>
          </button>
        </div>
      </form>
    </div>
  );
};
