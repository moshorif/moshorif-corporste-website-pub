import React, { useState, useMemo } from 'react';
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Eye,
  Archive,
  ExternalLink,
  X,
  Phone,
  Building,
  Calendar,
  Reply,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { InquiryRecord, filterInquiries } from '../../utils/admin';

export const AdminInquiries: React.FC = () => {
  const { inquiries, markInquiryRead, setInquiryStatus, deleteInquiry } = usePortfolio();

  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);

  const filtered = useMemo(() => {
    return filterInquiries(inquiries, statusFilter, searchQuery);
  }, [inquiries, statusFilter, searchQuery]);

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  const handleOpenInquiry = (inq: InquiryRecord) => {
    setSelectedInquiry(inq);
    if (!inq.isRead) {
      markInquiryRead(inq.id, true);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete message from "${name}"?`)) {
      deleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#2271b1]" />
            <span>Recruiter Inquiries & Messages Inbox</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Real-time messages submitted via your public contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#657386]">
            Total Messages: <strong className="text-[#14263D]">{inquiries.length}</strong>
          </span>
          {unreadCount > 0 && (
            <span className="bg-[#d63638] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E7ED] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'new', 'reviewed', 'archived'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#14263D] text-white'
                  : 'text-[#657386] hover:bg-[#F4F6F8] hover:text-[#14263D]'
              }`}
            >
              {status}
              {status === 'new' && unreadCount > 0 && (
                <span className="ml-1.5 bg-[#d63638] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#657386]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F4F6F8] border border-[#E2E7ED] rounded-lg text-[#14263D] placeholder-[#657386] focus:outline-none focus:ring-2 focus:ring-[#2271b1]/30"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-[#E2E7ED] shadow-2xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#657386]">
            No inquiries matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F4F6F8] text-[#657386] font-bold border-b border-[#E2E7ED]">
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Sender & Organization</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message Snippet</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7ED]">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => handleOpenInquiry(inq)}
                    className={`cursor-pointer transition-colors ${
                      !inq.isRead ? 'bg-blue-50/40 hover:bg-blue-50/70 font-semibold' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-3 px-4 w-24">
                      {!inq.isRead ? (
                        <span className="bg-[#2271b1] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                          New
                        </span>
                      ) : inq.status === 'archived' ? (
                        <span className="bg-slate-200 text-slate-700 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                          Archived
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                          Reviewed
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#14263D]">{inq.fullName}</div>
                      <div className="text-[11px] text-[#657386]">
                        {inq.company ? inq.company : inq.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#2271b1] font-medium max-w-xs truncate">
                      {inq.subject || 'Inquiry'}
                    </td>
                    <td className="py-3 px-4 text-[#657386] max-w-sm truncate">
                      {inq.message}
                    </td>
                    <td className="py-3 px-4 text-[#657386] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenInquiry(inq)}
                          className="p-1.5 text-slate-600 hover:text-[#2271b1] rounded cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id, inq.fullName)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Reader Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#14263D]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-[#E2E7ED] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 border-b border-[#E2E7ED] bg-[#F4F6F8]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2271b1] bg-white px-2 py-0.5 rounded border border-[#E2E7ED]">
                  Inquiry Details
                </span>
                <h3 className="text-base font-bold text-[#14263D] mt-1">
                  {selectedInquiry.subject || 'Direct Inquiry'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-slate-400 hover:text-[#14263D] rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F4F6F8] p-4 rounded-lg border border-[#E2E7ED]">
                <div>
                  <span className="text-[#657386] block text-[11px]">From</span>
                  <span className="font-bold text-[#14263D] text-sm">
                    {selectedInquiry.fullName}
                  </span>
                </div>

                <div>
                  <span className="text-[#657386] block text-[11px]">Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-semibold text-[#2271b1] hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                {selectedInquiry.company && (
                  <div>
                    <span className="text-[#657386] block text-[11px]">Company</span>
                    <span className="font-medium text-[#202B38]">
                      {selectedInquiry.company}
                    </span>
                  </div>
                )}

                {selectedInquiry.phone && (
                  <div>
                    <span className="text-[#657386] block text-[11px]">Phone</span>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="font-medium text-[#202B38] hover:underline"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}

                <div>
                  <span className="text-[#657386] block text-[11px]">Received On</span>
                  <span className="font-medium text-[#202B38]">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#657386] block mb-2">
                  Message Body
                </span>
                <div className="bg-[#F4F6F8] p-4 rounded-lg border border-[#E2E7ED] text-sm text-[#14263D] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Management */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#E2E7ED]">
                <span className="text-xs text-[#657386] font-semibold">Change Status:</span>
                <button
                  type="button"
                  onClick={() => setInquiryStatus(selectedInquiry.id, 'reviewed')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
                    selectedInquiry.status === 'reviewed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Mark Reviewed
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryStatus(selectedInquiry.id, 'archived')}
                  className={`px-3 py-1 rounded text-xs font-medium cursor-pointer ${
                    selectedInquiry.status === 'archived'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#E2E7ED] bg-[#F4F6F8]">
              <button
                onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.fullName)}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Message</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                    selectedInquiry.subject || 'Your Inquiry'
                  )}`}
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-[#E2E7ED] text-xs font-semibold rounded-lg hover:bg-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
