import React, { useState } from 'react';
import { AdminTopBar } from './AdminTopBar';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { AdminSiteIdentity } from './AdminSiteIdentity';
import { AdminHeroMetrics } from './AdminHeroMetrics';
import { AdminExperience } from './AdminExperience';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminSkills } from './AdminSkills';
import { AdminEducation } from './AdminEducation';
import { AdminDriveMedia } from './AdminDriveMedia';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { Menu } from 'lucide-react';

interface AdminDashboardProps {
  onViewPublicSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onViewPublicSite }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleQuickNew = (type: 'casestudy' | 'experience') => {
    if (type === 'casestudy') {
      setActiveTab('portfolio');
    } else {
      setActiveTab('experience');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F1] flex flex-col font-sans text-[#2c3338]">
      {/* WordPress / Shopify style Admin Top Bar */}
      <AdminTopBar
        onToggleView={onViewPublicSite}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onQuickNew={handleQuickNew}
      />

      {/* Main Admin Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-3 bg-[#1d2327] text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onViewPublicSite={onViewPublicSite}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <AdminOverview
                onSelectTab={(tab) => setActiveTab(tab)}
                onViewPublicSite={onViewPublicSite}
                onQuickNew={handleQuickNew}
              />
            )}
            {activeTab === 'identity' && <AdminSiteIdentity />}
            {activeTab === 'hero' && <AdminHeroMetrics />}
            {activeTab === 'experience' && <AdminExperience />}
            {activeTab === 'portfolio' && <AdminPortfolio />}
            {activeTab === 'drive' && <AdminDriveMedia />}
            {activeTab === 'skills' && <AdminSkills />}
            {activeTab === 'education' && <AdminEducation />}
            {activeTab === 'inquiries' && <AdminInquiries />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};
