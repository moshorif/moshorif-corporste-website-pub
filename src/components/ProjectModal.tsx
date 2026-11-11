import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, Layers, Target, CheckCircle2, Award, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { CaseStudy } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setFullscreenImage(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else {
          onClose();
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, fullscreenImage, onClose]);

  if (!project) return null;

  const visuals = project.visuals || [];
  const currentVisual = visuals[activeImageIndex] || visuals[0];

  const handleNextImage = () => {
    if (visuals.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % visuals.length);
    }
  };

  const handlePrevImage = () => {
    if (visuals.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + visuals.length) % visuals.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#14263D]/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-[#E2E7ED] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#E2E7ED] bg-[#F4F6F8]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#245B83] bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                {project.category}
              </span>
              <span className="text-xs font-semibold text-[#657386] bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                {project.industry}
              </span>
              {project.clientOrBrand && (
                <span className="text-xs text-[#14263D] font-bold bg-white px-2.5 py-1 rounded border border-[#E2E7ED]">
                  {project.clientOrBrand}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#14263D]">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#657386] hover:text-[#14263D] hover:bg-[#E2E7ED] rounded-lg transition-colors ml-4 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Main Visual Carousel / Gallery */}
          {visuals.length > 0 && currentVisual && (
            <div className="space-y-3">
              <div className="relative bg-[#14263D] rounded-xl overflow-hidden aspect-video flex items-center justify-center group border border-[#E2E7ED]">
                <img
                  src={currentVisual.url}
                  alt={currentVisual.caption || `${project.title} proof slide ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain max-h-[440px] transition-transform duration-200"
                />

                {/* Caption / highlight badge */}
                {currentVisual.caption && (
                  <div className="absolute top-3 left-3 bg-[#14263D]/85 text-white text-xs px-3 py-1.5 rounded-md max-w-md line-clamp-2 backdrop-blur-xs">
                    {currentVisual.caption}
                  </div>
                )}

                {/* Fullscreen zoom trigger */}
                <button
                  type="button"
                  onClick={() => setFullscreenImage(currentVisual.url)}
                  className="absolute bottom-3 right-3 bg-[#14263D]/80 hover:bg-[#14263D] text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors backdrop-blur-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Proof</span>
                </button>

                {/* Nav arrows if multiple images */}
                {visuals.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#14263D]/80 hover:bg-[#14263D] text-white p-2 rounded-full transition-colors cursor-pointer"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#14263D]/80 hover:bg-[#14263D] text-white p-2 rounded-full transition-colors cursor-pointer"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {visuals.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {visuals.map((vis, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#245B83] ring-2 ring-[#245B83]/30'
                          : 'border-[#E2E7ED] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={vis.url} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Key Results Strip */}
          {project.results && project.results.length > 0 && (
            <div className="bg-[#F4F6F8] rounded-xl p-5 border border-[#E2E7ED]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#657386] mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#20A37A]" />
                Documented Campaign Results & KPIs
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.results.map((res, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-[#E2E7ED]">
                    <div className="text-lg sm:text-xl font-extrabold text-[#14263D]">
                      {res.value}
                    </div>
                    <div className="text-xs text-[#657386] font-medium mt-0.5">
                      {res.label}
                    </div>
                    {res.context && (
                      <div className="text-[11px] text-[#245B83] mt-1 leading-tight">
                        {res.context}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objective & Challenge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#14263D] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#245B83]" />
                Campaign Objective
              </h4>
              <p className="text-sm text-[#202B38] leading-relaxed bg-[#F4F6F8] p-4 rounded-lg border border-[#E2E7ED]">
                {project.objective}
              </p>
            </div>

            {project.challenge && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#14263D] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#245B83]" />
                  Marketing Challenge
                </h4>
                <p className="text-sm text-[#202B38] leading-relaxed bg-[#F4F6F8] p-4 rounded-lg border border-[#E2E7ED]">
                  {project.challenge}
                </p>
              </div>
            )}
          </div>

          {/* Strategy */}
          {project.strategy && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#14263D]">
                Strategic Approach & Audience Segmentation
              </h4>
              <p className="text-sm sm:text-base text-[#202B38] leading-relaxed bg-[#F4F6F8] p-4 rounded-lg border border-[#E2E7ED]">
                {project.strategy}
              </p>
            </div>
          )}

          {/* Execution details */}
          {project.execution && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#14263D]">
                Campaign Execution & Creative Coordination
              </h4>
              <p className="text-sm sm:text-base text-[#202B38] leading-relaxed">
                {project.execution}
              </p>
            </div>
          )}

          {/* Platforms & Targeting Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E7ED]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#657386] mr-2">
              Platforms & Tools:
            </span>
            {project.platformsAndTools.map((platform, idx) => (
              <span key={idx} className="text-xs font-semibold text-[#14263D] bg-[#F4F6F8] px-2.5 py-1 rounded border border-[#E2E7ED]">
                {platform}
              </span>
            ))}
          </div>

          {/* Recruiter Context Note */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold block mb-0.5">Recruiter Reference Note:</strong>
            All campaign assets, Ads Manager screenshots, and performance reports are sourced directly from Mohammad Shoriful Islam’s verified Google Drive portfolio and professional work at LensCart Bangladesh and partner campaigns.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E2E7ED] bg-[#F4F6F8] flex items-center justify-between">
          <a
            href={project.driveLink || PERSONAL_INFO.contact.portfolioDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#245B83] hover:text-[#14263D] transition-colors"
          >
            <span>Verified Google Drive Proof</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14263D] hover:bg-[#202B38] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-lg bg-white/10 transition-colors cursor-pointer"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen Proof"
            className="max-w-full max-h-[90vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};
