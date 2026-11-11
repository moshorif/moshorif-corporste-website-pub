import React from 'react';
import { LayoutDashboard, Sliders, Mail, Edit3, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface PublicAdminToolbarProps {
  onOpenDashboard: (tab?: string) => void;
}

export const PublicAdminToolbar: React.FC<PublicAdminToolbarProps> = ({ onOpenDashboard }) => {
  const { inquiries, data } = usePortfolio();
  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  return (
    <div className="bg-[#1d2327] text-[#c3c4c7] h-8 px-4 flex items-center justify-between text-[11px] font-medium border-b border-[#2c3338] sticky top-0 z-50 select-none">
      {/* Left items */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          onClick={() => onOpenDashboard('dashboard')}
          className="flex items-center gap-1.5 text-white hover:text-[#72aee6] transition-colors cursor-pointer"
        >
          <div className="w-4 h-4 rounded-full bg-[#2271b1] flex items-center justify-center text-[9px] font-bold text-white">
            W
          </div>
          <span className="font-bold hidden sm:inline">Admin Dashboard</span>
        </button>

        <button
          onClick={() => onOpenDashboard('identity')}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <Sliders className="w-3 h-3 text-[#72aee6]" />
          <span>Customize Site</span>
        </button>

        <button
          onClick={() => onOpenDashboard('inquiries')}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <Mail className="w-3 h-3 text-[#20A37A]" />
          <span className="hidden sm:inline">Inquiries</span>
          {unreadCount > 0 && (
            <span className="bg-[#d63638] text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Right item */}
      <div className="flex items-center gap-2">
        <span className="text-slate-400 hidden md:inline">
          Backend CMS Connected
        </span>
        <button
          onClick={() => onOpenDashboard('dashboard')}
          className="px-2.5 py-0.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold rounded text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>Open Backend Dashboard</span>
        </button>
      </div>
    </div>
  );
};
