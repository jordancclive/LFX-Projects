import React, { useState, useRef } from 'react';
import { SearchIcon, CalendarIcon, ClockIcon, UsersIcon, FileIcon, LinkIcon } from 'lucide-react';
export const ScheduleMeetingForm = ({
  fromTemplate = false,
  currentStep = 1
}) => {
  const [step, setStep] = useState(currentStep);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentResults, setShowAttachmentResults] = useState(false);
  const searchRef = useRef(null);
  // Mock previous attachments data
  const previousAttachments = [{
    id: 1,
    title: 'Q2 Project Roadmap',
    meeting: 'Engineering Weekly',
    date: 'May 15, 2023'
  }, {
    id: 2,
    title: 'Security Compliance Report',
    meeting: 'Security Working Group',
    date: 'Jun 5, 2023'
  }, {
    id: 3,
    title: 'API Documentation',
    meeting: 'API Design Review',
    date: 'Jun 12, 2023'
  }, {
    id: 4,
    title: 'Q3 Budget Proposal',
    meeting: 'Budget Planning',
    date: 'Jun 20, 2023'
  }, {
    id: 5,
    title: 'Community Survey Results',
    meeting: 'Community Call',
    date: 'Jul 1, 2023'
  }];
  // Filter attachments based on search query
  const filteredAttachments = previousAttachments.filter(attachment => attachment.title.toLowerCase().includes(searchQuery.toLowerCase()) || attachment.meeting.toLowerCase().includes(searchQuery.toLowerCase()));
  // Handle attachment search
  const handleAttachmentSearch = e => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowAttachmentResults(query.length > 0);
  };
  // Handle selecting an attachment
  const handleSelectAttachment = attachment => {
    console.log('Selected attachment:', attachment);
    setSearchQuery('');
    setShowAttachmentResults(false);
  };
  return <div className="w-full max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                1
              </div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-azure-500' : 'bg-slate-200'}`}></div>
            </div>
            <span className="text-xs mt-1 block text-slate-600">
              Basic Info
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                2
              </div>
              <div className={`h-1 flex-1 ${step >= 3 ? 'bg-azure-500' : 'bg-slate-200'}`}></div>
            </div>
            <span className="text-xs mt-1 block text-slate-600">
              Agenda & Attachments
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                3
              </div>
              <div className={`h-1 flex-1 ${step >= 4 ? 'bg-azure-500' : 'bg-slate-200'}`}></div>
            </div>
            <span className="text-xs mt-1 block text-slate-600">Attendees</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-end">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                4
              </div>
            </div>
            <span className="text-xs mt-1 block text-right text-slate-600">
              Review & Create
            </span>
          </div>
        </div>
      </div>
      {/* Form content based on step */}
      {(step === 2 || fromTemplate && step === 3) && <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {fromTemplate ? 'Customize Agenda & Attachments' : 'Add Agenda & Attachments'}
          </h2>
          {/* Agenda section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Meeting Agenda
            </label>
            <textarea className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" rows={6} placeholder="Enter meeting agenda items..."></textarea>
          </div>
          {/* Attachments section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Attachments
            </label>
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-slate-200 rounded-md bg-slate-50">
                <FileIcon className="h-5 w-5 text-slate-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-slate-700">
                    Drag & drop files here or
                  </p>
                </div>
                <button className="px-3 py-1.5 bg-azure-500 hover:bg-azure-600 text-white text-sm rounded-md">
                  Browse
                </button>
              </div>
              {/* Previous Attachments Search */}
              <div ref={searchRef} className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Previous Attachments
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" value={searchQuery} onChange={handleAttachmentSearch} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Search by title or meeting name..." />
                </div>
                {/* Search results dropdown */}
                {showAttachmentResults && filteredAttachments.length > 0 && <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredAttachments.map(attachment => <div key={attachment.id} className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleSelectAttachment(attachment)}>
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 text-slate-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-slate-700">
                              {attachment.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {attachment.meeting} • {attachment.date}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>
            </div>
          </div>
          {/* Selected attachments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-2">
              Selected Attachments
            </h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 border border-slate-200 rounded-md hover:bg-slate-50">
                <FileIcon className="h-4 w-4 text-slate-400 mr-2" />
                <span className="text-sm text-slate-700 flex-grow">
                  Q2 Project Roadmap
                </span>
                <button className="text-red-500 hover:text-red-600">
                  <span className="sr-only">Remove</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Links section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Links
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter URL..." />
              </div>
              <button className="px-3 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                <span>Add Link</span>
              </button>
            </div>
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50" onClick={() => setStep(step - 1)}>
              Back
            </button>
            <button className="px-4 py-2 bg-azure-500 text-white rounded-md hover:bg-azure-600" onClick={() => setStep(step + 1)}>
              Continue
            </button>
          </div>
        </div>}
      {/* Other steps would be rendered based on the current step */}
      {step !== 2 && !(fromTemplate && step === 3) && <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
          <p className="text-slate-500">
            This is step {step} of the meeting creation process.
          </p>
          <div className="flex justify-between mt-6">
            {step > 1 && <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50" onClick={() => setStep(step - 1)}>
                Back
              </button>}
            {step < 4 && <button className="px-4 py-2 bg-azure-500 text-white rounded-md hover:bg-azure-600 ml-auto" onClick={() => setStep(step + 1)}>
                Continue
              </button>}
            {step === 4 && <button className="px-4 py-2 bg-azure-500 text-white rounded-md hover:bg-azure-600 ml-auto">
                Schedule Meeting
              </button>}
          </div>
        </div>}
    </div>;
};