import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, ExternalLink, Save, CheckCircle2, Image, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSiteIdentity: React.FC = () => {
  const { data, updatePersonalInfo } = usePortfolio();
  const [form, setForm] = useState({
    name: data.personalInfo.name,
    role: data.personalInfo.role,
    location: data.personalInfo.contact.location,
    email: data.personalInfo.contact.email,
    phone: data.personalInfo.contact.phone,
    phoneRaw: data.personalInfo.contact.phoneRaw,
    linkedIn: data.personalInfo.contact.linkedIn,
    linkedInDisplay: data.personalInfo.contact.linkedInDisplay,
    portfolioDrive: data.personalInfo.contact.portfolioDrive,
    cvUrl: data.personalInfo.contact.cvUrl,
    heroPortrait: data.personalInfo.images.heroPortrait,
    formalPortrait: data.personalInfo.images.formalPortrait,
    introduction: data.personalInfo.introduction,
    aboutSummary: data.personalInfo.aboutSummary,
  });

  const [savedToast, setSavedToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      name: form.name,
      role: form.role,
      introduction: form.introduction,
      aboutSummary: form.aboutSummary,
      contact: {
        ...data.personalInfo.contact,
        email: form.email,
        phone: form.phone,
        phoneRaw: form.phoneRaw,
        location: form.location,
        linkedIn: form.linkedIn,
        linkedInDisplay: form.linkedInDisplay,
        portfolioDrive: form.portfolioDrive,
        cvUrl: form.cvUrl,
      },
      images: {
        heroPortrait: form.heroPortrait,
        formalPortrait: form.formalPortrait,
      },
    });

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <User className="w-5 h-5 text-[#2271b1]" />
            <span>Site Identity & Personal Bio</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Configure candidate name, executive role, contact information, portraits, and about text.
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
          <span>Site identity updated and saved to live website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
            Primary Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Professional Title / Headline Role
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
            Contact & Social Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Phone (Display Format)
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                name="linkedIn"
                value={form.linkedIn}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Portfolio Drive URL
              </label>
              <input
                type="text"
                name="portfolioDrive"
                value={form.portfolioDrive}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Official CV PDF Path
              </label>
              <input
                type="text"
                name="cvUrl"
                value={form.cvUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        {/* Portraits & Visual Assets */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
            Profile Imagery
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-[#E2E7ED] bg-[#F4F6F8] space-y-3">
              <div className="text-xs font-bold text-[#14263D]">
                Primary Studio Portrait (Hero)
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={form.heroPortrait}
                  alt="Hero Preview"
                  className="w-16 h-20 object-cover rounded border border-[#E2E7ED]"
                />
                <input
                  type="text"
                  name="heroPortrait"
                  value={form.heroPortrait}
                  onChange={handleChange}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D]"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[#E2E7ED] bg-[#F4F6F8] space-y-3">
              <div className="text-xs font-bold text-[#14263D]">
                Formal Portrait (About Section)
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={form.formalPortrait}
                  alt="Formal Preview"
                  className="w-16 h-20 object-cover rounded border border-[#E2E7ED]"
                />
                <input
                  type="text"
                  name="formalPortrait"
                  value={form.formalPortrait}
                  onChange={handleChange}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E2E7ED] rounded text-[#14263D]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bio Copy */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#14263D] border-b border-[#E2E7ED] pb-3">
            Narrative Content & Bio
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                Professional Introduction
              </label>
              <textarea
                name="introduction"
                rows={4}
                value={form.introduction}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14263D] mb-1">
                About Summary (Homepage Section)
              </label>
              <textarea
                name="aboutSummary"
                rows={4}
                value={form.aboutSummary}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30 focus:border-[#2271b1]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs sm:text-sm font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Identity Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
