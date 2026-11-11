import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, FileDown, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ContactFormData, FormValidationErrors } from '../types/portfolio';
import { validateContactForm, buildMailtoUrl } from '../utils/portfolio';

export const Contact: React.FC = () => {
  const { data, addInquiry } = usePortfolio();
  const { personalInfo } = data;

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSubmittedMailto, setLastSubmittedMailto] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValidationErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof FormValidationErrors];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Save inquiry to backend inbox
    addInquiry(formData);

    // Construct mailto URL for direct recruiter transmission
    const mailto = buildMailtoUrl(formData, personalInfo.contact.email);
    setLastSubmittedMailto(mailto);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245B83] bg-[#E2E7ED]/50 px-3 py-1 rounded mb-3">
            <Mail className="w-3.5 h-3.5 text-[#245B83]" />
            <span>Direct Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
            Connect for Corporate Opportunities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#657386] leading-relaxed">
            Interested in discussing full-time corporate roles, campaign leadership, or performance strategy? Reach out directly via the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Details & CV Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F4F6F8] rounded-xl p-6 sm:p-8 border border-[#E2E7ED]">
              <h3 className="text-lg font-bold text-[#14263D] mb-6">
                Verified Contact Details
              </h3>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E7ED] flex items-center justify-center text-[#245B83] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      className="text-sm sm:text-base font-semibold text-[#14263D] hover:text-[#245B83] transition-colors break-all"
                    >
                      {personalInfo.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E7ED] flex items-center justify-center text-[#245B83] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                      Phone / Mobile
                    </div>
                    <a
                      href={`tel:${personalInfo.contact.phoneRaw}`}
                      className="text-sm sm:text-base font-semibold text-[#14263D] hover:text-[#245B83] transition-colors"
                    >
                      {personalInfo.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E7ED] flex items-center justify-center text-[#245B83] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                      Location & Availability
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-[#14263D]">
                      {personalInfo.contact.location}
                    </div>
                    <div className="text-xs text-[#657386] mt-0.5">
                      Available for full-time on-site, hybrid, or remote corporate roles
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E7ED] flex items-center justify-center text-[#245B83] shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                      LinkedIn Profile
                    </div>
                    <a
                      href={personalInfo.contact.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#245B83] hover:text-[#14263D] transition-colors"
                    >
                      <span>{personalInfo.contact.linkedInDisplay}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Official CV Download Card */}
            <div className="bg-[#14263D] text-white rounded-xl p-6 border border-[#202B38] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#20A37A] mb-1">
                  Recruiter Resource
                </div>
                <div className="text-base font-bold text-white">
                  Download Full Performance CV
                </div>
                <div className="text-xs text-[#E2E7ED] mt-0.5">
                  Complete employment history, verifiable achievements, and certifications.
                </div>
              </div>
              <a
                href={personalInfo.contact.cvUrl}
                download="Mohammad_Shoriful_Islam_CV.pdf"
                className="shrink-0 p-3 bg-white text-[#14263D] hover:bg-[#E2E7ED] rounded-lg transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Download CV"
              >
                <FileDown className="w-5 h-5 text-[#245B83]" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F4F6F8] rounded-xl p-6 sm:p-8 border border-[#E2E7ED]">
            {isSubmitted ? (
              <div className="bg-white rounded-lg p-8 border border-[#E2E7ED] text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#20A37A]/10 text-[#20A37A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#14263D]">
                  Message Prepared Successfully
                </h3>
                <p className="text-sm text-[#657386] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-[#14263D]">{formData.fullName}</strong>. Your inquiry has been formatted. You can dispatch this directly via your email client:
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={lastSubmittedMailto}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#245B83] hover:bg-[#14263D] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E2E7ED] text-[#14263D] hover:bg-[#F4F6F8] text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#14263D]">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#657386] mt-1">
                    Fill out the form below to initiate a recruitment conversation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14263D] mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-3.5 py-2.5 bg-white rounded-lg border text-sm text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 transition-all ${
                        errors.fullName ? 'border-red-400' : 'border-[#E2E7ED] focus:border-[#245B83]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14263D] mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 bg-white rounded-lg border text-sm text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 transition-all ${
                        errors.email ? 'border-red-400' : 'border-[#E2E7ED] focus:border-[#245B83]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14263D] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corporation"
                      className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-[#E2E7ED] text-sm text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 focus:border-[#245B83] transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14263D] mb-1.5">
                      Subject / Role Title
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Performance Marketing Manager Position"
                      className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-[#E2E7ED] text-sm text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 focus:border-[#245B83] transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14263D] mb-1.5">
                    Inquiry Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe the position, team structure, or discussion topic..."
                    className={`w-full px-3.5 py-2.5 bg-white rounded-lg border text-sm text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#245B83]/30 transition-all ${
                      errors.message ? 'border-red-400' : 'border-[#E2E7ED] focus:border-[#245B83]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#14263D] hover:bg-[#202B38] text-white text-sm font-bold rounded-lg shadow-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
