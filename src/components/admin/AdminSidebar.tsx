import React from 'react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Mail,
  SlidersHorizontal,
  Globe,
  Database,
  ArrowUpRight,
  HardDrive,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onViewPublicSite: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onViewPublicSite,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { data, inquiries } = usePortfolio();
  const unreadInquiries = inquiries.filter((i) => !i.isRead).length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'identity',
      label: 'Site Identity & Bio',
      icon: User,
      badge: null,
    },
    {
      id: 'hero',
      label: 'Hero & Key Metrics',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'experience',
      label: 'Work Experience',
      icon: Briefcase,
      badge: data.experiences.length,
    },
    {
      id: 'portfolio',
      label: 'Portfolio & Case Studies',
      icon: FolderGit2,
      badge: data.caseStudies.length,
    },
    {
      id: 'drive',
      label: 'Google Drive Media',
      icon: HardDrive,
      badge: 'Drive',
      badgeColor: 'bg-[#4285F4]',
    },
    {
      id: 'skills',
      label: 'Skills & Capabilities',
      icon: Cpu,
      badge: null,
    },
    {
      id: 'education',
      label: 'Education & Certs',
      icon: GraduationCap,
      badge: data.certifications.length,
    },
    {
      id: 'inquiries',
      label: 'Inquiries Inbox',
      icon: Mail,
      badge: unreadInquiries > 0 ? unreadInquiries : null,
      badgeColor: 'bg-[#d63638]',
    },
    {
      id: 'settings',
      label: 'Backup & Restore',
      icon: Database,
      badge: null,
    },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-12 bottom-0 left-0 z-40 w-64 bg-[#1d2327] text-[#c3c4c7] flex flex-col justify-between border-r border-[#2c3338] transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation Items */}
        <div className="py-3 overflow-y-auto flex-1">
          <div className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Portfolio CMS
          </div>

          <nav className="space-y-0.5 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer group ${
                    isActive
                      ? 'bg-[#2271b1] text-white shadow-2xs'
                      : 'text-[#c3c4c7] hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        item.badgeColor
                          ? `${item.badgeColor} text-white`
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#2c3338] text-slate-400 group-hover:bg-[#3c434a] group-hover:text-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Public Site Link */}
        <div className="p-3 border-t border-[#2c3338] bg-[#161a1d]">
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded bg-[#2c3338] hover:bg-[#3c434a] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#20A37A]" />
              <span>Public Website</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <div className="text-[10px] text-slate-500 text-center mt-2">
            Auto-saves to browser storage
          </div>
        </div>
      </aside>
    </>
  );
};
