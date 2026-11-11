import React from 'react';
import {
  FolderGit2,
  Briefcase,
  Mail,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Plus,
  Eye,
  ArrowRight,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { calculateDashboardStats } from '../../utils/admin';

interface AdminOverviewProps {
  onSelectTab: (tab: string) => void;
  onViewPublicSite: () => void;
  onQuickNew: (type: 'casestudy' | 'experience') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onSelectTab,
  onViewPublicSite,
  onQuickNew,
}) => {
  const { data, inquiries, markInquiryRead } = usePortfolio();
  const stats = calculateDashboardStats(data.caseStudies, data.experiences, inquiries);
  const recentInquiries = inquiries.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E7ED] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2271b1] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#20A37A] inline-block animate-pulse" />
            <span>Executive CMS • Live Connected</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#14263D]">
            Welcome to your Portfolio Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#657386] mt-1 max-w-2xl leading-relaxed">
            Manage your personal corporate portfolio, update case study metrics, adjust work experiences, and review recruiter inquiries in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onQuickNew('casestudy')}
            className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Case Study</span>
          </button>
          <button
            onClick={onViewPublicSite}
            className="px-4 py-2 bg-[#F4F6F8] hover:bg-[#E2E7ED] text-[#14263D] border border-[#E2E7ED] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#20A37A]" />
            <span>View Public Site</span>
          </button>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Case Studies */}
        <div
          onClick={() => onSelectTab('portfolio')}
          className="bg-white p-5 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#2271b1] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#657386]">
              Portfolio Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2271b1] flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#14263D]">
            {stats.totalCampaigns}
          </div>
          <div className="text-[11px] text-[#657386] mt-1 flex items-center justify-between">
            <span>{stats.totalVisualProofAssets} Proof Assets</span>
            <span className="text-[#2271b1] group-hover:translate-x-0.5 transition-transform">
              Manage →
            </span>
          </div>
        </div>

        {/* Work Experience */}
        <div
          onClick={() => onSelectTab('experience')}
          className="bg-white p-5 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#2271b1] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#657386]">
              Experience Entries
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#20A37A] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#14263D]">
            {stats.totalExperiences}
          </div>
          <div className="text-[11px] text-[#657386] mt-1 flex items-center justify-between">
            <span>Verified Timeline</span>
            <span className="text-[#2271b1] group-hover:translate-x-0.5 transition-transform">
              Manage →
            </span>
          </div>
        </div>

        {/* Inquiries */}
        <div
          onClick={() => onSelectTab('inquiries')}
          className="bg-white p-5 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#2271b1] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#657386]">
              Recruiter Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#d63638] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#14263D]">
              {inquiries.length}
            </span>
            {stats.unreadInquiries > 0 && (
              <span className="text-xs font-bold text-[#d63638] bg-red-50 px-2 py-0.5 rounded-full">
                {stats.unreadInquiries} unread
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#657386] mt-1 flex items-center justify-between">
            <span>Direct Outreach</span>
            <span className="text-[#2271b1] group-hover:translate-x-0.5 transition-transform">
              Inbox →
            </span>
          </div>
        </div>

        {/* Certifications */}
        <div
          onClick={() => onSelectTab('education')}
          className="bg-white p-5 rounded-xl border border-[#E2E7ED] shadow-2xs hover:border-[#2271b1] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#657386]">
              Certifications
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#14263D]">
            {data.certifications.length}
          </div>
          <div className="text-[11px] text-[#657386] mt-1 flex items-center justify-between">
            <span>BSc CSE + Platform Accreditations</span>
            <span className="text-[#2271b1] group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Recent Inquiries & Quick Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Recruiter Inquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-[#E2E7ED] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#14263D] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2271b1]" />
                <span>Recent Inquiries & Leads</span>
              </h3>
              <button
                onClick={() => onSelectTab('inquiries')}
                className="text-xs font-semibold text-[#2271b1] hover:underline cursor-pointer"
              >
                View all ({inquiries.length})
              </button>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#657386]">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-3.5 rounded-lg border transition-colors flex items-start justify-between gap-3 ${
                      !inq.isRead
                        ? 'bg-blue-50/40 border-blue-200'
                        : 'bg-[#F4F6F8] border-[#E2E7ED]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#14263D]">
                          {inq.fullName}
                        </span>
                        {inq.company && (
                          <span className="text-[11px] text-[#657386]">
                            • {inq.company}
                          </span>
                        )}
                        {!inq.isRead && (
                          <span className="bg-[#2271b1] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[#2271b1]">
                        {inq.subject || 'Direct Inquiry'}
                      </div>
                      <p className="text-xs text-[#202B38] line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <span className="text-[10px] text-[#657386]">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                      {!inq.isRead && (
                        <button
                          onClick={() => markInquiryRead(inq.id, true)}
                          className="text-[11px] text-[#2271b1] hover:underline cursor-pointer"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E2E7ED] mt-4 flex items-center justify-between text-xs text-[#657386]">
            <span>Inquiries submitted via the public contact form appear here in real-time.</span>
            <button
              onClick={() => onSelectTab('inquiries')}
              className="text-[#2271b1] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Open Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Action Shortcuts & System Status (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Customizer */}
          <div className="bg-white rounded-xl p-6 border border-[#E2E7ED] shadow-2xs">
            <h3 className="text-base font-bold text-[#14263D] mb-4">
              Quick Content Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onSelectTab('identity')}
                className="w-full text-left p-3 rounded-lg border border-[#E2E7ED] hover:border-[#2271b1] hover:bg-[#F4F6F8] transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#14263D]">
                    Edit Personal Bio & Contact Links
                  </div>
                  <div className="text-[11px] text-[#657386]">
                    Update phone, email, LinkedIn, location
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectTab('hero')}
                className="w-full text-left p-3 rounded-lg border border-[#E2E7ED] hover:border-[#2271b1] hover:bg-[#F4F6F8] transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#14263D]">
                    Customize Hero & Highlights
                  </div>
                  <div className="text-[11px] text-[#657386]">
                    Change 50% revenue metric, headline, copy
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectTab('portfolio')}
                className="w-full text-left p-3 rounded-lg border border-[#E2E7ED] hover:border-[#2271b1] hover:bg-[#F4F6F8] transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#14263D]">
                    Manage Case Studies & Screenshots
                  </div>
                  <div className="text-[11px] text-[#657386]">
                    Add, edit, or reorder proof slides
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onSelectTab('drive')}
                className="w-full text-left p-3 rounded-lg border border-[#E2E7ED] hover:border-[#4285F4] hover:bg-blue-50/30 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-[#14263D] flex items-center gap-1.5">
                    <span>Google Drive Media & Proof Files</span>
                    <span className="text-[10px] bg-blue-100 text-[#4285F4] px-1.5 py-0.2 rounded font-bold">New</span>
                  </div>
                  <div className="text-[11px] text-[#657386]">
                    Upload screenshots, browse Drive archive, attach to projects
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#4285F4]" />
              </button>
            </div>
          </div>

          {/* System & Verification Status */}
          <div className="bg-[#14263D] text-white rounded-xl p-5 border border-[#202B38] space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20A37A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>System Verification & Integrity</span>
            </div>
            <div className="space-y-2 text-xs text-[#E2E7ED]">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span>Persistence Engine</span>
                <span className="font-semibold text-white">Active (LocalStorage Sync)</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span>Official CV Linked</span>
                <span className="font-semibold text-white">Verified PDF</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Drive Portfolio</span>
                <span className="font-semibold text-white">Google Drive Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
