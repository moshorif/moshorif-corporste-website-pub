import React from 'react';
import { Cpu, CheckCircle2, Terminal, BarChart2, Share2, Target } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillGroup } from '../types/portfolio';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const skillGroups = data.skillGroups;

  const getGroupIcon = (title: string) => {
    if (title.includes('Performance')) return <Target className="w-5 h-5 text-[#245B83]" />;
    if (title.includes('Analytics')) return <BarChart2 className="w-5 h-5 text-[#245B83]" />;
    if (title.includes('Strategy')) return <Share2 className="w-5 h-5 text-[#245B83]" />;
    return <Terminal className="w-5 h-5 text-[#245B83]" />;
  };

  return (
    <section id="skills" className="py-24 bg-white border-b border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245B83] bg-[#E2E7ED]/50 px-3 py-1 rounded mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#245B83]" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
            Technical & Marketing Capabilities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#657386] leading-relaxed">
            A balanced skill set bridging data-driven advertising, tracking infrastructure, audience strategy, and technical computer science principles.
          </p>
        </div>

        {/* 4 Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillGroups.map((group: SkillGroup, idx: number) => (
            <div
              key={idx}
              className="bg-[#F4F6F8] rounded-xl p-6 sm:p-8 border border-[#E2E7ED] hover:border-[#245B83]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E7ED] flex items-center justify-center shrink-0">
                    {getGroupIcon(group.title)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#14263D]">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#657386] mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills tags list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.skills.map((skill: string, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="bg-white px-3.5 py-2.5 rounded-lg border border-[#E2E7ED] text-xs sm:text-sm text-[#202B38] font-medium flex items-center gap-2.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#20A37A] shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Computer Science Edge Highlight */}
        <div className="bg-[#14263D] text-white rounded-xl p-6 sm:p-8 border border-[#202B38] shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20A37A]">
              <Terminal className="w-4 h-4" />
              <span>Competitive Advantage for Modern Marketing Teams</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              The Intersection of Computer Science & Performance Marketing
            </h4>
            <p className="text-xs sm:text-sm text-[#E2E7ED] leading-relaxed">
              With an ongoing Bachelor of Science in Computer Science & Engineering (CSE), Mohammad brings a distinct technical edge to marketing teams: deep understanding of event architecture, browser cookies & CAPI (Conversions API), technical tracking scripts, DOM interactions, and algorithmic optimization that purely creative marketers typically cannot troubleshoot.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-xs font-semibold text-white whitespace-nowrap">
              No guesswork tracking
            </div>
            <div className="px-4 py-2 bg-[#20A37A]/20 text-[#20A37A] rounded-lg border border-[#20A37A]/30 text-xs font-semibold whitespace-nowrap">
              Pixel & Tag Verified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
