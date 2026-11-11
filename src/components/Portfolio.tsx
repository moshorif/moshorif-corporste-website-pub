import React, { useState, useMemo } from 'react';
import { FolderGit2, Search, ExternalLink, ArrowRight, TrendingUp, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { projectCategories } from '../data/portfolioData';
import { CaseStudy, ProjectCategory } from '../types/portfolio';
import { filterProjects } from '../utils/portfolio';

interface PortfolioProps {
  onSelectProject: (project: CaseStudy) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const { data } = usePortfolio();
  const { caseStudies, personalInfo } = data;
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return filterProjects(caseStudies, selectedCategory, searchQuery);
  }, [caseStudies, selectedCategory, searchQuery]);


  return (
    <section id="portfolio" className="py-24 bg-[#F4F6F8] border-b border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245B83] bg-white px-3 py-1 rounded border border-[#E2E7ED] mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-[#245B83]" />
              <span>Verified Campaign Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
              Featured Case Studies & Campaign Portfolio
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#657386] leading-relaxed">
              Real-world campaigns spanning Meta Ads, Google Ads, Lead Generation, Landing Page Views, and Brand Marketing. Each case study includes authentic Ads Manager proof and documented metrics.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={personalInfo.contact.portfolioDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#E2E7ED]/50 border border-[#E2E7ED] text-[#14263D] text-xs sm:text-sm font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <span>Explore Complete Drive Archive</span>
              <ExternalLink className="w-4 h-4 text-[#245B83]" />
            </a>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-xl border border-[#E2E7ED] shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {projectCategories.map((category: ProjectCategory) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#14263D] text-white shadow-2xs'
                    : 'text-[#657386] hover:text-[#14263D] hover:bg-[#F4F6F8]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px] sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#657386]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns, tags..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 focus:border-[#245B83] transition-all"
            />
          </div>
        </div>

        {/* Projects Count */}
        <div className="flex items-center justify-between text-xs text-[#657386] mb-6 px-1">
          <span>
            Showing <strong className="text-[#14263D] font-bold">{filteredProjects.length}</strong> of{' '}
            {caseStudies.length} featured case studies
          </span>
          {selectedCategory !== 'All' && (
            <span>
              Filtered by: <strong className="text-[#245B83]">{selectedCategory}</strong>
            </span>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-[#E2E7ED]">
            <Layers className="w-10 h-10 text-[#657386] mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-bold text-[#14263D]">No matching campaigns found</h3>
            <p className="text-xs sm:text-sm text-[#657386] mt-1">
              Try adjusting your search terms or clearing your category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#14263D] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project: CaseStudy) => {
              const thumbnail = project.visuals[0]?.url || personalInfo.images.heroPortrait;
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#E2E7ED] hover:border-[#245B83]/50 transition-all duration-200 flex flex-col group hover:shadow-lg"
                >
                  {/* Thumbnail Container */}
                  <div
                    className="relative bg-[#14263D] aspect-video overflow-hidden cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <img
                      src={thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14263D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-[#14263D]/90 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-xs">
                      {project.category}
                    </div>

                    {/* Screenshots Count indicator */}
                    <div className="absolute bottom-3 right-3 bg-white/90 text-[#14263D] text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <span>{project.visuals.length} Proof Assets</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#657386] mb-2 font-medium">
                        <span>{project.industry}</span>
                        {project.clientOrBrand && (
                          <span className="text-[#245B83] font-semibold">{project.clientOrBrand}</span>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-bold text-[#14263D] group-hover:text-[#245B83] transition-colors cursor-pointer leading-snug mb-3"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#657386] line-clamp-3 leading-relaxed mb-4">
                        {project.objective}
                      </p>

                      {/* Results preview */}
                      {project.results && project.results.length > 0 && (
                        <div className="bg-[#F4F6F8] rounded-lg p-3 mb-4 border border-[#E2E7ED]/70 space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#657386] flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-[#20A37A]" />
                            Key Campaign Results
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {project.results.slice(0, 2).map((res, idx) => (
                              <div key={idx} className="bg-white p-2 rounded border border-[#E2E7ED]">
                                <div className="text-sm font-extrabold text-[#14263D]">
                                  {res.value}
                                </div>
                                <div className="text-[10px] text-[#657386] truncate">
                                  {res.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Action */}
                    <div className="pt-4 border-t border-[#E2E7ED] flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-[#657386]">
                        {project.platformsAndTools.slice(0, 2).join(' • ')}
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#245B83] group-hover:text-[#14263D] group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        <span>Case Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
