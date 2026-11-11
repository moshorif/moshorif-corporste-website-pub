import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Certification } from '../types/portfolio';

export const EducationCertifications: React.FC = () => {
  const { data } = usePortfolio();
  const { education, certifications } = data;

  const engineeringCoursework = [
    'Database Management Systems',
    'Data Structures & Algorithms',
    'Web Technologies & Scripting',
    'Object-Oriented Programming',
    'Information Systems & Networks',
    'Software Engineering Principles',
  ];

  return (
    <section id="education" className="py-24 bg-[#F4F6F8] border-b border-[#E2E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245B83] bg-white px-3 py-1 rounded border border-[#E2E7ED] mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#245B83]" />
            <span>Academic & Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
            Education & Industry Certifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#657386] leading-relaxed">
            Formal technical university education combined with continuous professional accreditation across Meta, Google, and inbound marketing ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Card (5 columns) */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-8 border border-[#E2E7ED] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED] flex items-center justify-center text-[#245B83]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                    Higher Education
                  </div>
                  <h3 className="text-xl font-bold text-[#14263D]">
                    {education.degree}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="text-base font-semibold text-[#245B83]">
                    {education.institution}
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#657386] mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Dhaka, Bangladesh
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {education.status}
                    </span>
                  </div>
                </div>

                <div className="inline-block bg-[#E2E7ED]/50 text-[#14263D] text-xs font-semibold px-3 py-1 rounded">
                  Bachelor of Science (B.Sc. in CSE)
                </div>

                <p className="text-xs sm:text-sm text-[#657386] leading-relaxed pt-2 border-t border-[#E2E7ED]">
                  {education.focus}
                </p>
              </div>
            </div>

            {/* Coursework Focus */}
            <div className="pt-6 border-t border-[#E2E7ED]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#657386] mb-3">
                Relevant Engineering Coursework
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {engineeringCoursework.map((course: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-[#202B38] font-medium bg-[#F4F6F8] p-2 rounded border border-[#E2E7ED]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#20A37A] shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Card (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-[#E2E7ED] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F4F6F8] border border-[#E2E7ED] flex items-center justify-center text-[#20A37A]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#657386]">
                      Professional Credentials
                    </div>
                    <h3 className="text-xl font-bold text-[#14263D]">
                      Industry Certifications & Awards
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#245B83] bg-[#E2E7ED]/50 px-2.5 py-1 rounded">
                  {certifications.length} Verified
                </span>
              </div>

              {/* Certifications List */}
              <div className="space-y-3">
                {certifications.map((cert: Certification, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-[#E2E7ED] hover:border-[#245B83]/40 bg-[#F4F6F8] transition-colors gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <Award className="w-4 h-4 text-[#20A37A] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-[#14263D]">
                          {cert.title}
                        </div>
                        <div className="text-xs text-[#657386]">
                          {cert.issuer} {cert.description ? `— ${cert.description}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#657386] sm:self-center pl-7 sm:pl-0 shrink-0">
                      {cert.year && (
                        <span className="bg-white px-2.5 py-0.5 rounded border border-[#E2E7ED] font-medium">
                          {cert.year}
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-[#20A37A]">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E2E7ED] text-xs text-[#657386]">
              All certifications reflect hands-on knowledge in real advertising environments, compliance with platform standards, and performance evaluation techniques.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
