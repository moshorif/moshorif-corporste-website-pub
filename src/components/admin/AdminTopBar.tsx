import React from 'react';
import {
  Globe,
  Plus,
  Mail,
  Eye,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminTopBarProps {
  onToggleView: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onQuickNew: (type: 'casestudy' | 'experience') => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onToggleView,
  activeTab,
  onSelectTab,
  onQuickNew,
}) => {
  const { data, inquiries } = usePortfolio();
  const unreadCount = inquiries.filter((inq) => !inq.isRead).length;

  return (
    <header className="bg-[#1d2327] text-[#c3c4c7] h-12 flex items-center justify-between px-3 sm:px-5 border-b border-[#2c3338] select-none text-xs sticky top-0 z-50">
      {/* Left: Brand / Quick Site Switcher */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* WordPress / Shopify inspired admin emblem */}
        <div className="flex items-center gap-2 bg-[#2c3338] px-2.5 py-1 rounded text-white font-bold">
          <div className="w-4 h-4 rounded-full bg-[#2271b1] flex items-center justify-center text-[10px] text-white">
            W
          </div>
          <span className="hidden sm:inline font-semibold">MSI Admin</span>
        </div>

        {/* Site Link */}
        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 px-2.5 py-1 text-slate-200 hover:text-white hover:bg-[#2c3338] rounded transition-colors cursor-pointer"
          title="Switch to Public Website View"
        >
          <Globe className="w-3.5 h-3.5 text-[#20A37A]" />
          <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[220px]">
            {data.personalInfo.name}
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">• Visit Public Site</span>
        </button>

        {/* Quick Add Menu */}
        <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-[#3c434a]">
          <button
            onClick={() => onQuickNew('casestudy')}
            className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-[#2c3338] rounded transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#2271b1]" />
            <span>Case Study</span>
          </button>
          <button
            onClick={() => onQuickNew('experience')}
            className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-[#2c3338] rounded transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#20A37A]" />
            <span>Experience</span>
          </button>
        </div>
      </div>

      {/* Right: Inquiries & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Google Drive Button */}
        <button
          onClick={() => onSelectTab('drive')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
            activeTab === 'drive'
              ? 'bg-[#4285F4] text-white'
              : 'hover:bg-[#2c3338] text-slate-300 hover:text-white'
          }`}
          title="Google Drive Media & Proof Files"
        >
          <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
          <span className="hidden sm:inline">Drive</span>
        </button>

        {/* Inquiries Notification Button */}
        <button
          onClick={() => onSelectTab('inquiries')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-[#2271b1] text-white'
              : 'hover:bg-[#2c3338] text-slate-300 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Inquiries</span>
          {unreadCount > 0 ? (
            <span className="bg-[#d63638] text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
              {unreadCount}
            </span>
          ) : (
            <span className="bg-[#2c3338] text-slate-400 text-[10px] px-1.5 py-0.2 rounded-full">
              0
            </span>
          )}
        </button>

        {/* Live Public Website Toggle */}
        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold rounded transition-colors shadow-2xs cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Website</span>
          <span className="sm:hidden">Site</span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#3c434a]">
          <img
            src={data.personalInfo.images.heroPortrait}
            alt="Admin"
            className="w-6 h-6 rounded-full object-cover border border-[#2271b1]"
          />
          <span className="text-[11px] text-slate-300 hidden xl:inline">
            Howdy, Shoriful
          </span>
        </div>
      </div>
    </header>
  );
};
