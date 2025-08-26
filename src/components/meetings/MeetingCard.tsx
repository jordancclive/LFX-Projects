import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UsersIcon, FileIcon, ChevronDownIcon, VideoIcon, CheckIcon, XIcon, CopyIcon, ExternalLinkIcon, HelpCircleIcon, ShareIcon, EditIcon, MoreVerticalIcon, UserPlusIcon, TrashIcon, BotIcon, SearchIcon, Mail as MailIcon, Link as LinkIcon, AlertTriangle as AlertTriangleIcon, CheckCircle as CheckCircleIcon, Vote as VoteIcon, BarChart3Icon, ChevronRightIcon, ThumbsUpIcon, ThumbsDownIcon, MinusCircleIcon } from 'lucide-react';
import { Alert } from '../Alert';
import { ItemCard } from '../ItemCard';
export const MeetingCard = ({
  meeting
}) => {
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const [isAttendeesOpen, setIsAttendeesOpen] = useState(false);
  const [isZoomInfoOpen, setIsZoomInfoOpen] = useState(false);
  const [isVotesOpen, setIsVotesOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [userRsvpStatus, setUserRsvpStatus] = useState(meeting.userRsvp || 'notResponded');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteType, setDeleteType] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showParticipantResults, setShowParticipantResults] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showInviteToast, setShowInviteToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  // Mock data for associated votes
  const associatedVotes = [{
    id: 1,
    title: 'Approve budget for Q3 security tools',
    status: 'active',
    committee: 'Security Working Group',
    dueDate: 'Aug 14, 5:00 PM',
    votes: {
      yes: 3,
      no: 1,
      abstain: 0,
      notVoted: 4,
      total: 8
    },
    userVote: null
  }, {
    id: 2,
    title: 'Accept new vulnerability disclosure policy',
    status: 'active',
    committee: 'Security Working Group',
    dueDate: 'Aug 14, 5:00 PM',
    votes: {
      yes: 2,
      no: 0,
      abstain: 1,
      notVoted: 5,
      total: 8
    },
    userVote: null
  }];
  // Mock data for associated polls
  const associatedPolls = [{
    id: 1,
    title: 'Preferred day for weekly Security WG meetings',
    status: 'active',
    committee: 'Security Working Group',
    dueDate: 'Aug 14, 5:00 PM',
    options: [{
      id: 1,
      text: 'Monday',
      votes: 1
    }, {
      id: 2,
      text: 'Wednesday',
      votes: 3
    }, {
      id: 3,
      text: 'Friday',
      votes: 2
    }],
    totalVotes: 6,
    userVote: null
  }];
  // Check if meeting has associated votes or polls
  const hasAssociatedVotes = meeting.id === 1 || meeting.id === 9; // For Security WG meetings
  const hasAssociatedPolls = meeting.id === 1 || meeting.id === 9; // For Security WG meetings
  // Past meeting votes have userVote values
  const pastAssociatedVotes = [{
    id: 1,
    title: 'Approve budget for Q3 security tools',
    status: 'completed',
    committee: 'Security Working Group',
    dueDate: 'Jul 24, 5:00 PM',
    votes: {
      yes: 5,
      no: 1,
      abstain: 1,
      notVoted: 1,
      total: 8
    },
    userVote: 'yes'
  }, {
    id: 2,
    title: 'Accept new vulnerability disclosure policy',
    status: 'completed',
    committee: 'Security Working Group',
    dueDate: 'Jul 24, 5:00 PM',
    votes: {
      yes: 6,
      no: 0,
      abstain: 1,
      notVoted: 1,
      total: 8
    },
    userVote: 'abstain'
  }];
  // Past meeting polls have userVote values
  const pastAssociatedPolls = [{
    id: 1,
    title: 'Preferred day for weekly Security WG meetings',
    status: 'completed',
    committee: 'Security Working Group',
    dueDate: 'Jul 24, 5:00 PM',
    options: [{
      id: 1,
      text: 'Monday',
      votes: 1
    }, {
      id: 2,
      text: 'Wednesday',
      votes: 5
    }, {
      id: 3,
      text: 'Friday',
      votes: 2
    }],
    totalVotes: 8,
    userVote: 2 // Selected Wednesday
  }];
  // Mock data for LFX profiles
  const lfxProfiles = [{
    id: 'p1',
    name: 'John Smith',
    email: 'jsmith@example.com',
    company: 'Acme Corp',
    lfid: 'jsmith123'
  }, {
    id: 'p2',
    name: 'Emily Johnson',
    email: 'emily.j@techcorp.com',
    company: 'Tech Corporation',
    lfid: 'emilyj'
  }, {
    id: 'p3',
    name: 'Michael Williams',
    email: 'mwilliams@opendev.org',
    company: 'OpenDev',
    lfid: 'mwill'
  }, {
    id: 'p4',
    name: 'Sarah Davis',
    email: 'sdavis@linux.com',
    company: 'Linux Foundation',
    lfid: 'sdavis22'
  }];
  // Mock project participants
  const projectParticipants = [{
    id: 'p1',
    name: 'John Smith',
    email: 'jsmith@example.com',
    company: 'Acme Corp',
    lfid: 'jsmith123'
  }, {
    id: 'p2',
    name: 'Emily Johnson',
    email: 'emily.j@techcorp.com',
    company: 'Tech Corporation',
    lfid: 'emilyj'
  }, {
    id: 'p3',
    name: 'Michael Williams',
    email: 'mwilliams@opendev.org',
    company: 'OpenDev',
    lfid: 'mwill'
  }, {
    id: 'p4',
    name: 'Sarah Davis',
    email: 'sdavis@linux.com',
    company: 'Linux Foundation',
    lfid: 'sdavis22'
  }, {
    id: 'p5',
    name: 'Robert Taylor',
    email: 'rtaylor@vmware.com',
    company: 'VMWare',
    lfid: 'rtaylor'
  }, {
    id: 'p6',
    name: 'Lisa Wang',
    email: 'lwang@nvidia.com',
    company: 'NVIDIA',
    lfid: 'lwang'
  }, {
    id: 'p7',
    name: 'Daniel Kim',
    email: 'dkim@samsung.com',
    company: 'Samsung',
    lfid: 'dkim'
  }];
  // Mock data for unknown attendees
  const unknownAttendees = [{
    id: 'u1',
    name: 'zoom_user1',
    email: 'zoom_user1@gmail.com',
    zoomName: 'John D',
    searchQuery: '',
    showResults: false,
    selectedProfile: null
  }, {
    id: 'u2',
    name: 'zoom_user2',
    email: 'unknown@example.com',
    zoomName: 'Emily (Guest)',
    searchQuery: '',
    showResults: false,
    selectedProfile: null
  }, {
    id: 'u3',
    name: 'zoom_user3',
    email: 'anonymous@anonymous.com',
    zoomName: 'Mike W.',
    searchQuery: '',
    showResults: false,
    selectedProfile: null
  }];
  const [unknownPeople, setUnknownPeople] = useState(unknownAttendees);
  // Check if this is the Community Outreach Planning meeting (no agenda)
  const isCommunityOutreachPlanning = meeting.title === 'Community Outreach Planning';
  // Check if this is the first meeting (id === 1)
  const isFirstMeeting = meeting.id === 1;
  // Check if this is the Technical Steering Committee meeting (id === 2)
  const isTSCMeeting = meeting.id === 2;
  // Check if this is a past meeting
  const isPastMeeting = meeting.isPast || false;
  // Check if this is the LFX Projects Community Feedback meeting
  const isLFXProjectsFeedback = meeting.title === 'LFX Projects Community Feedback';
  // Clean the title if it's a past meeting (remove "Past " prefix)
  const displayTitle = isPastMeeting && meeting.title.startsWith('Past ') ? meeting.title.substring(5) : meeting.title;
  // Add more attachments for TSC meeting to demonstrate overflow
  if (isTSCMeeting && meeting.agenda.length === 3) {
    meeting.agenda.push({
      title: 'Q3 Performance Metrics',
      hasDocument: true,
      content: null
    }, {
      title: 'Security Vulnerability Assessment',
      hasDocument: true,
      content: null
    }, {
      title: 'Community Contribution Guidelines',
      hasDocument: true,
      content: null
    }, {
      title: 'Release Schedule 2025-2026',
      hasDocument: true,
      content: null
    });
  }
  // Count attachments
  const attachmentCount = (meeting.agenda || []).filter(item => item.hasDocument).length;
  // Mock data for committee members (for past meeting votes)
  const committeeMembers = [{
    id: 'cm1',
    name: 'John Smith',
    company: 'Acme Corp',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    vote: 'yes'
  }, {
    id: 'cm2',
    name: 'Emily Johnson',
    company: 'Tech Corporation',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    vote: 'yes'
  }, {
    id: 'cm3',
    name: 'Michael Williams',
    company: 'OpenDev',
    profileImage: null,
    vote: 'no'
  }, {
    id: 'cm4',
    name: 'Sarah Davis',
    company: 'Linux Foundation',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    vote: 'yes'
  }, {
    id: 'cm5',
    name: 'Robert Taylor',
    company: 'VMWare',
    profileImage: null,
    vote: 'abstain'
  }];
  // Mock data for poll responses (for past meeting polls)
  const pollResponses = [{
    id: 'pr1',
    name: 'John Smith',
    company: 'Acme Corp',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    response: 'Wednesday'
  }, {
    id: 'pr2',
    name: 'Emily Johnson',
    company: 'Tech Corporation',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    response: 'Wednesday'
  }, {
    id: 'pr3',
    name: 'Michael Williams',
    company: 'OpenDev',
    profileImage: null,
    response: 'Friday'
  }, {
    id: 'pr4',
    name: 'Sarah Davis',
    company: 'Linux Foundation',
    profileImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    response: 'Wednesday'
  }, {
    id: 'pr5',
    name: 'Robert Taylor',
    company: 'VMWare',
    profileImage: null,
    response: 'Monday'
  }];
  const handleRsvpChange = status => {
    setUserRsvpStatus(status);
    // In a real app, you would send this update to the server
    console.log(`RSVP status for meeting ${meeting.id} changed to ${status}`);
  };
  const copyZoomInfo = () => {
    // In a real app, this would copy the zoom info to clipboard
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  // Handle project link click
  const handleProjectClick = (e, project) => {
    e.preventDefault();
    // Access the setSelectedOption from the parent component via window
    if (window.setSelectedOptionGlobal) {
      window.setSelectedOptionGlobal('Kubernetes');
    }
    // Navigate to the Kubernetes meetings page
    navigate('/kubernetes/meetings');
  };
  const handleInviteClick = e => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setShowInviteModal(true);
    setSearchQuery('');
    setShowParticipantResults(false);
    setSelectedParticipant(null);
  };
  const handleDeleteClick = e => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setShowDeleteModal(true);
    setDeleteStep(1);
  };
  const handleDeleteTypeSelect = type => {
    setDeleteType(type);
    setDeleteStep(2);
  };
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setShowDeleteToast(true);
    // Auto-hide the toast after 5 seconds
    setTimeout(() => {
      setShowDeleteToast(false);
    }, 5000);
  };
  const handleSendInvitation = () => {
    setShowInviteModal(false);
    setShowInviteToast(true);
    // Auto-hide the toast after 5 seconds
    setTimeout(() => {
      setShowInviteToast(false);
    }, 5000);
  };
  const handleCopyLink = () => {
    // Simulate copying a link to clipboard
    setCopyLinkSuccess(true);
    setTimeout(() => setCopyLinkSuccess(false), 2000);
  };
  // Handle search input change for unknown attendees
  const handleUnknownAttendeeSearch = (id, value) => {
    setUnknownPeople(prev => prev.map(person => person.id === id ? {
      ...person,
      searchQuery: value,
      showResults: value.length > 0
    } : person));
  };
  // Handle selecting a profile for an unknown attendee
  const handleSelectProfileForAttendee = (attendeeId, profile) => {
    setUnknownPeople(prev => prev.map(person => person.id === attendeeId ? {
      ...person,
      selectedProfile: profile,
      searchQuery: `${profile.name} (${profile.lfid})`,
      showResults: false
    } : person));
    // In a real app, this would associate the unknown attendee with the selected LFX profile
    console.log(`Associated unknown attendee ${attendeeId} with ${profile.name}`);
  };
  // Filter profiles based on search query for each unknown attendee
  const getFilteredProfiles = searchQuery => {
    return lfxProfiles.filter(profile => profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || profile.email.toLowerCase().includes(searchQuery.toLowerCase()) || profile.lfid.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Handle clicks outside the search results to close them
  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowParticipantResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Small icon button component
  const SmallIconButton = ({
    icon,
    tooltip,
    onClick
  }) => {
    return <div className="relative group">
        <button className="rounded-full p-1 hover:bg-slate-100 flex items-center justify-center" onClick={onClick} aria-label={tooltip}>
          {icon}
        </button>
        <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 top-full right-0 transform translate-y-1 w-max max-w-[150px] text-center">
          {tooltip}
        </div>
      </div>;
  };
  // Sort attendees - organizer first, then alphabetically within groups
  const getSortedAttendees = (attendees, committee = null) => {
    // Filter by committee if provided
    let filteredAttendees = committee ? attendees.filter(person => person.committee === committee) : attendees.filter(person => !person.committee);
    // Find organizer if exists
    const organizerIndex = filteredAttendees.findIndex(person => person.isOrganizer);
    // If there's an organizer, put them first
    if (organizerIndex !== -1) {
      const organizer = filteredAttendees[organizerIndex];
      filteredAttendees.splice(organizerIndex, 1);
      // Sort the rest alphabetically
      filteredAttendees.sort((a, b) => a.name.localeCompare(b.name));
      // Put organizer back at the beginning
      filteredAttendees.unshift(organizer);
    } else {
      // Just sort alphabetically if no organizer
      filteredAttendees.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filteredAttendees;
  };
  // Handle participant search
  const handleParticipantSearch = e => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowParticipantResults(query.length > 0);
    if (selectedParticipant && query !== selectedParticipant.name) {
      setSelectedParticipant(null);
    }
  };
  // Handle selecting a participant
  const handleSelectParticipant = participant => {
    setSelectedParticipant(participant);
    setSearchQuery(participant.name);
    setShowParticipantResults(false);
    setInviteEmail(participant.email);
  };
  // Filter participants based on search query
  const getFilteredParticipants = () => {
    return projectParticipants.filter(participant => participant.name.toLowerCase().includes(searchQuery.toLowerCase()) || participant.email.toLowerCase().includes(searchQuery.toLowerCase()) || participant.lfid && participant.lfid.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  const [expandedVotes, setExpandedVotes] = useState({});
  const [expandedPolls, setExpandedPolls] = useState({});
  return <>
      <ItemCard className="overflow-hidden">
        {/* Meeting Title & Frequency Badge */}
        <div className="py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 style={{
              fontFamily: '"Roboto Slab", serif',
              fontOpticalSizing: 'auto',
              fontWeight: 500,
              fontStyle: 'normal'
            }} className="text-lg text-slate-900 mr-3">
                {displayTitle}
              </h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md h-6 flex items-center">
                {meeting.frequency}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {/* RSVP Status Controls with Alert-like styling - only for upcoming meetings */}
              {!isPastMeeting && <div className="flex items-center mr-2">
                  <span className="text-sm font-medium text-slate-700 mr-2">
                    Going?
                  </span>
                  <div className="flex rounded-md overflow-hidden space-x-2">
                    <button onClick={() => handleRsvpChange('accepted')} className={`px-3 py-1 flex items-center rounded-md ${userRsvpStatus === 'accepted' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'}`}>
                      {userRsvpStatus === 'accepted' && <CheckIcon className="h-3.5 w-3.5 text-emerald-500 mr-1" />}
                      <span className="text-xs font-medium">Yes</span>
                    </button>
                    <button onClick={() => handleRsvpChange('declined')} className={`px-3 py-1 flex items-center rounded-md ${userRsvpStatus === 'declined' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'}`}>
                      {userRsvpStatus === 'declined' && <XIcon className="h-3.5 w-3.5 text-red-500 mr-1" />}
                      <span className="text-xs font-medium">No</span>
                    </button>
                    <button onClick={() => handleRsvpChange('tentative')} className={`px-3 py-1 flex items-center rounded-md ${userRsvpStatus === 'tentative' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'}`}>
                      {userRsvpStatus === 'tentative' && <HelpCircleIcon className="h-3.5 w-3.5 text-amber-500 mr-1" />}
                      <span className="text-xs font-medium">Maybe</span>
                    </button>
                  </div>
                </div>}
              {/* Action buttons - only for upcoming meetings */}
              {!isPastMeeting && <div className="flex items-center space-x-1">
                  <SmallIconButton icon={<ShareIcon className="h-4 w-4 text-slate-600" />} tooltip="Share Meeting" onClick={() => console.log('Share meeting')} />
                  <SmallIconButton icon={<EditIcon className="h-4 w-4 text-slate-600" />} tooltip="Edit Meeting" onClick={() => console.log('Edit meeting')} />
                  <div className="relative" ref={menuRef}>
                    <SmallIconButton icon={<MoreVerticalIcon className="h-4 w-4 text-slate-600" />} tooltip="More Options" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    {isMenuOpen && <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-20 border border-slate-200 py-1">
                        <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={handleInviteClick}>
                          <UserPlusIcon className="h-4 w-4 text-slate-500 mr-2" />
                          <span>Invite People</span>
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-slate-50" onClick={() => {
                    console.log('Manage committee(s)');
                    setIsMenuOpen(false);
                  }}>
                          <UsersIcon className="h-4 w-4 text-slate-500 mr-2" />
                          <span>Manage Committee(s)</span>
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={handleDeleteClick}>
                          <TrashIcon className="h-4 w-4 text-red-500 mr-2" />
                          <span>Delete</span>
                        </button>
                      </div>}
                  </div>
                </div>}
            </div>
          </div>
        </div>
        {/* Warning Message using standardized Alert component */}
        {meeting.hasWarning && <div className="py-2">
            {isPastMeeting && meeting.poorlyAttended ? <Alert variant="warning">This meeting was poorly attended.</Alert> : <Alert variant="warning">{meeting.warningMessage}</Alert>}
          </div>}
        {/* Meeting Date & Time */}
        <div className="py-2 flex flex-wrap items-center px-4">
          <div className="flex items-center mr-8 mb-2">
            <CalendarIcon className="h-5 w-5 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">{meeting.date}</span>
          </div>
          <div className="flex items-center mr-8 mb-2">
            <ClockIcon className="h-5 w-5 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">
              {(() => {
              // Extract time parts
              const startTimeParts = meeting.startTime.split(' ');
              const endTimeParts = meeting.endTime.split(' ');
              // Check if AM/PM is the same for both times
              if (startTimeParts.length > 1 && endTimeParts.length > 1 && startTimeParts[1] === endTimeParts[1]) {
                // If same AM/PM, only show it once at the end
                return `${startTimeParts[0]} - ${endTimeParts[0]} ${endTimeParts[1]} ${meeting.timeZone}`;
              } else {
                // If different AM/PM, show the full times
                return `${meeting.startTime} - ${meeting.endTime} ${meeting.timeZone}`;
              }
            })()}
            </span>
          </div>
          {meeting.project && <div className="flex items-center mr-8 mb-2">
              <FileIcon className="h-5 w-5 text-azure-500 mr-2" />
              <Link to="/kubernetes/meetings" onClick={e => handleProjectClick(e, meeting.project)} className="text-sm text-azure-600 hover:text-azure-700 hover:underline">
                {meeting.project}
              </Link>
            </div>}
          <div className="flex items-center mb-2">
            <UsersIcon className="h-5 w-5 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">{meeting.group}</span>
          </div>
        </div>
        {/* Agenda Section */}
        <div>
          <button className={`w-full py-2 flex items-center px-4 ${!isCommunityOutreachPlanning ? 'hover:bg-slate-50' : ''}`} onClick={() => !isCommunityOutreachPlanning && setIsAgendaOpen(!isAgendaOpen)} disabled={isCommunityOutreachPlanning}>
            <div className="flex items-center flex-grow">
              {isCommunityOutreachPlanning ? <XIcon className="h-5 w-5 text-red-500 mr-2" /> : <FileIcon className="h-5 w-5 text-azure-500 mr-2" />}
              <span className="text-sm text-slate-700">
                Agenda
                {attachmentCount > 0 && <span className="ml-1 text-sm text-slate-700">
                    ({attachmentCount} attachment
                    {attachmentCount !== 1 ? 's' : ''})
                  </span>}
              </span>
            </div>
            {!isCommunityOutreachPlanning && <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isAgendaOpen ? 'transform rotate-180' : ''}`} />}
          </button>
          {isAgendaOpen && <div className="py-2 px-4">
              {(meeting.agenda || []).length > 0 ? <div className="flex flex-col md:flex-row md:gap-8">
                  {/* Left column: Agenda content - Modified to remove title and make description body text */}
                  <div className="md:w-3/5 space-y-4">
                    {(meeting.agenda || []).map((item, index) => item.content && <div key={index} className="text-sm">
                            <div className="whitespace-pre-line prose prose-sm max-w-none text-slate-700">
                              {item.content.split('\n').map((line, i) => {
                    if (line.startsWith('##') || line.startsWith('###')) {
                      // Skip the title lines
                      return null;
                    } else if (line.startsWith('-')) {
                      return <div key={i} className="ml-4 flex items-start">
                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2"></span>
                                      <span>
                                        {line.replace('-', '').trim()}
                                      </span>
                                    </div>;
                    } else if (line.trim() === '') {
                      return <div key={i} className="h-2"></div>;
                    } else {
                      return <p key={i}>{line}</p>;
                    }
                  })}
                            </div>
                          </div>)}
                    {/* For Kubernetes Community Call that has no agenda items but has content */}
                    {meeting.hasAgendaContent && <div className="text-sm">
                        <div className="whitespace-pre-line prose prose-sm max-w-none text-slate-700">
                          {meeting.agendaContent.split('\n').map((line, i) => {
                    if (line.startsWith('##') || line.startsWith('###')) {
                      // Skip the title lines
                      return null;
                    } else if (line.startsWith('-')) {
                      return <div key={i} className="ml-4 flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2"></span>
                                  <span>{line.replace('-', '').trim()}</span>
                                </div>;
                    } else if (line.trim() === '') {
                      return <div key={i} className="h-2"></div>;
                    } else {
                      return <p key={i}>{line}</p>;
                    }
                  })}
                        </div>
                      </div>}
                  </div>
                  {/* Right column: Attachments */}
                  <div className="md:w-2/5 mt-4 md:mt-0">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">
                      Attachments
                    </h4>
                    <div className="space-y-2">
                      {(meeting.agenda || []).map((item, index) => item.hasDocument && <div key={index} className="flex items-center p-2 border border-slate-200 rounded-md hover:bg-slate-50">
                              <FileIcon className="h-4 w-4 text-slate-400 mr-2" />
                              <span className="text-sm text-slate-700 flex-grow">
                                {item.title}
                              </span>
                              <a href="#" onClick={e => e.preventDefault()} className="text-azure-500 hover:text-azure-600">
                                <ExternalLinkIcon className="h-4 w-4" />
                              </a>
                            </div>)}
                    </div>
                  </div>
                </div> : <p className="text-sm text-slate-500 italic">
                  No agenda items available
                </p>}
            </div>}
        </div>
        {/* Votes and Polls Section */}
        {(hasAssociatedVotes || hasAssociatedPolls) && <div>
            <button className="w-full py-2 flex items-center hover:bg-slate-50 px-4" onClick={() => setIsVotesOpen(!isVotesOpen)}>
              <div className="flex items-center flex-grow">
                <VoteIcon className="h-5 w-5 text-azure-500 mr-2" />
                <span className="text-sm text-slate-700">
                  {isPastMeeting ? 'Votes & Polls Completed' : 'Votes & Polls for this Meeting'}
                  {isPastMeeting ? ` (${pastAssociatedVotes.length + pastAssociatedPolls.length})` : ` (${associatedVotes.length + associatedPolls.length})`}
                </span>
              </div>
              <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isVotesOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isVotesOpen && <div className="py-2 px-4">
                <div className="space-y-3">
                  {/* Votes Section */}
                  {isPastMeeting ?
            // Past meeting votes with committee member voting details
            pastAssociatedVotes.map(vote => <div key={vote.id} className="border border-slate-200 rounded-md overflow-hidden">
                          {/* Vote header */}
                          <div className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer" onClick={() => {
                // Toggle expanded state for this specific vote
                const newExpandedVotes = {
                  ...expandedVotes
                };
                newExpandedVotes[vote.id] = !expandedVotes[vote.id];
                setExpandedVotes(newExpandedVotes);
              }}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap mr-2">
                                  <VoteIcon className="h-3 w-3 mr-1" />
                                  Vote
                                </span>
                                <h4 className="text-sm font-medium text-slate-800 mr-2">
                                  {vote.title}
                                </h4>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap">
                                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  Completed
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex mr-4">
                                  <div className="bg-emerald-500 h-full" style={{
                        width: `${Math.round(vote.votes.yes / vote.votes.total * 100)}%`
                      }}></div>
                                  <div className="bg-red-500 h-full" style={{
                        width: `${Math.round(vote.votes.no / vote.votes.total * 100)}%`
                      }}></div>
                                  <div className="bg-amber-400 h-full" style={{
                        width: `${Math.round(vote.votes.abstain / vote.votes.total * 100)}%`
                      }}></div>
                                </div>
                                {/* User's vote */}
                                <div className="flex items-center">
                                  <span className="text-xs text-slate-600 mr-2">
                                    Your vote:
                                  </span>
                                  {vote.userVote === 'yes' && <span className="flex items-center text-xs text-emerald-600">
                                      <ThumbsUpIcon className="h-3 w-3 mr-1" />
                                      Yes
                                    </span>}
                                  {vote.userVote === 'no' && <span className="flex items-center text-xs text-red-600">
                                      <ThumbsDownIcon className="h-3 w-3 mr-1" />
                                      No
                                    </span>}
                                  {vote.userVote === 'abstain' && <span className="flex items-center text-xs text-amber-600">
                                      <MinusCircleIcon className="h-3 w-3 mr-1" />
                                      Abstain
                                    </span>}
                                </div>
                              </div>
                            </div>
                            <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform ${expandedVotes[vote.id] ? 'transform rotate-180' : ''}`} />
                          </div>
                          {/* Expanded committee member votes */}
                          {expandedVotes[vote.id] && <div className="bg-slate-50 p-4 border-t border-slate-200">
                              <h5 className="text-sm font-medium text-slate-700 mb-3">
                                Committee Member Votes
                              </h5>
                              <div className="space-y-2">
                                {committeeMembers.map(member => <div key={member.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-6 h-6 rounded-full mr-2" /> : <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-slate-600 text-xs font-medium">
                                          {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>}
                                      <div>
                                        <p className="text-sm text-slate-700">
                                          {member.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                          {member.company}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      {member.vote === 'yes' && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-md flex items-center">
                                          <ThumbsUpIcon className="h-3 w-3 mr-1" />
                                          Yes
                                        </span>}
                                      {member.vote === 'no' && <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center">
                                          <ThumbsDownIcon className="h-3 w-3 mr-1" />
                                          No
                                        </span>}
                                      {member.vote === 'abstain' && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-md flex items-center">
                                          <MinusCircleIcon className="h-3 w-3 mr-1" />
                                          Abstain
                                        </span>}
                                    </div>
                                  </div>)}
                              </div>
                              <div className="mt-3 pt-3 border-t border-slate-200">
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                  <div>
                                    <span className="font-medium">
                                      Final Result:
                                    </span>
                                    <span className="ml-1 text-emerald-600 font-medium">
                                      Approved
                                    </span>
                                    <span className="ml-1">
                                      ({vote.votes.yes} of {vote.votes.total}{' '}
                                      voted yes)
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Closed:</span>{' '}
                                    {vote.dueDate}
                                  </div>
                                </div>
                              </div>
                            </div>}
                        </div>) :
            // Upcoming meeting votes - simplified, non-expandable with tags
            associatedVotes.map(vote => <div key={vote.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap mr-2">
                                <VoteIcon className="h-3 w-3 mr-1" />
                                Vote
                              </span>
                              <h4 className="text-sm font-medium text-slate-800 mr-2">
                                {vote.title}
                              </h4>
                              <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Available during meeting
                              </span>
                            </div>
                          </div>
                        </div>)}
                  {/* Polls Section */}
                  {isPastMeeting ?
            // Past meeting polls with committee member voting details
            pastAssociatedPolls.map(poll => <div key={poll.id} className="border border-slate-200 rounded-md overflow-hidden">
                          {/* Poll header */}
                          <div className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer" onClick={() => {
                // Toggle expanded state for this specific poll
                const newExpandedPolls = {
                  ...expandedPolls
                };
                newExpandedPolls[poll.id] = !expandedPolls[poll.id];
                setExpandedPolls(newExpandedPolls);
              }}>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap mr-2">
                                  <BarChart3Icon className="h-3 w-3 mr-1" />
                                  Poll
                                </span>
                                <h4 className="text-sm font-medium text-slate-800 mr-2">
                                  {poll.title}
                                </h4>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap">
                                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  Completed
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-slate-600 mr-2">
                                  Your response:
                                </span>
                                <span className="text-xs font-medium text-azure-600">
                                  {poll.options.find(opt => opt.id === poll.userVote)?.text}
                                </span>
                                <span className="ml-2 text-xs text-slate-500">
                                  ({poll.totalVotes} total responses)
                                </span>
                              </div>
                            </div>
                            <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform ${expandedPolls[poll.id] ? 'transform rotate-180' : ''}`} />
                          </div>
                          {/* Expanded committee member poll responses */}
                          {expandedPolls[poll.id] && <div className="bg-slate-50 p-4 border-t border-slate-200">
                              <h5 className="text-sm font-medium text-slate-700 mb-3">
                                Committee Member Responses
                              </h5>
                              <div className="space-y-2">
                                {pollResponses.map(member => <div key={member.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-6 h-6 rounded-full mr-2" /> : <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-slate-600 text-xs font-medium">
                                          {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>}
                                      <div>
                                        <p className="text-sm text-slate-700">
                                          {member.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                          {member.company}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md">
                                        {member.response}
                                      </span>
                                    </div>
                                  </div>)}
                              </div>
                              <div className="mt-4">
                                <h5 className="text-sm font-medium text-slate-700 mb-2">
                                  Results
                                </h5>
                                <div className="space-y-2">
                                  {poll.options.map(option => {
                      const percentage = Math.round(option.votes / poll.totalVotes * 100);
                      return <div key={option.id} className="space-y-1">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm text-slate-700">
                                            {option.text}
                                          </span>
                                          <span className="text-xs text-slate-500">
                                            {option.votes} votes ({percentage}%)
                                          </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                          <div className={`h-full ${option.id === poll.userVote ? 'bg-azure-500' : 'bg-slate-300'}`} style={{
                            width: `${percentage}%`
                          }}></div>
                                        </div>
                                      </div>;
                    })}
                                </div>
                              </div>
                            </div>}
                        </div>) :
            // Upcoming meeting polls - simplified, non-expandable with tags
            associatedPolls.map(poll => <div key={poll.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap mr-2">
                                <BarChart3Icon className="h-3 w-3 mr-1" />
                                Poll
                              </span>
                              <h4 className="text-sm font-medium text-slate-800 mr-2">
                                {poll.title}
                              </h4>
                              <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Available during meeting
                              </span>
                            </div>
                          </div>
                        </div>)}
                  {/* View All Link */}
                  <div className="text-right">
                    <a href="#" className="text-sm text-azure-600 hover:text-azure-700 flex items-center justify-end">
                      View all votes & polls
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>}
          </div>}
        {/* Zoom Meeting Information */}
        <div>
          <button className="w-full py-2 flex items-center hover:bg-slate-50 px-4" onClick={() => setIsZoomInfoOpen(!isZoomInfoOpen)}>
            <div className="flex items-center flex-grow">
              <VideoIcon className="h-5 w-5 text-azure-500 mr-2" />
              <span className="text-sm text-slate-700">
                Zoom Meeting Information
              </span>
              {/* Copy button moved next to title */}
              <button onClick={e => {
              e.stopPropagation();
              copyZoomInfo();
            }} className="ml-4 text-slate-500 hover:text-slate-700 transition-colors" title="Copy Zoom information">
                {copySuccess ? <span className="text-xs text-emerald-500">Copied!</span> : <CopyIcon className="h-4 w-4" />}
              </button>
            </div>
            <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isZoomInfoOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isZoomInfoOpen && <div className="py-2 text-sm text-slate-600 space-y-4 px-4">
              <div>
                <p>
                  <span className="font-medium">Meeting ID:</span> 123 456 7890
                </p>
                <p>
                  <span className="font-medium">Passcode:</span> 654321
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">One tap mobile:</p>
                <p className="pl-4">
                  +16699009128,,12345678901#,,,,*654321# US (San Jose)
                </p>
                <p className="pl-4">
                  +13462487799,,12345678901#,,,,*654321# US (Houston)
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Dial by your location:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 pl-4 gap-y-0.5">
                  <p>+1 669 900 9128 US (San Jose)</p>
                  <p>+1 346 248 7799 US (Houston)</p>
                  <p>+1 253 215 8782 US (Tacoma)</p>
                  <p>+1 312 626 6799 US (Chicago)</p>
                  <p>+1 646 558 8656 US (New York)</p>
                  <p>+1 301 715 8592 US (Washington DC)</p>
                </div>
                <p className="mt-1">
                  <span className="font-medium">Find your local number:</span>{' '}
                  <a href="https://zoom.us/u/abcdefghij" target="_blank" rel="noopener noreferrer" className="text-azure-500 hover:underline">
                    https://zoom.us/u/abcdefghij
                  </a>
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Join by SIP:</span>{' '}
                  12345678901@zoomcrc.com
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">Join by H.323:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 pl-4 gap-y-0.5">
                  <p>162.255.37.11 (US West)</p>
                  <p>162.255.36.11 (US East)</p>
                  <p>115.114.131.7 (India Mumbai)</p>
                  <p>115.114.115.7 (India Hyderabad)</p>
                  <p>213.19.144.110 (Amsterdam Netherlands)</p>
                  <p>213.244.140.110 (Germany)</p>
                  <p>103.122.166.55 (Australia Sydney)</p>
                  <p>103.122.167.55 (Australia Melbourne)</p>
                  <p>149.137.40.110 (Singapore)</p>
                  <p>64.211.144.160 (Brazil)</p>
                  <p>69.174.57.160 (Canada Toronto)</p>
                  <p>65.39.152.160 (Canada Vancouver)</p>
                  <p>207.226.132.110 (Japan Tokyo)</p>
                  <p>149.137.24.110 (Japan Osaka)</p>
                </div>
              </div>
            </div>}
        </div>
        {/* Attendees Section */}
        <div>
          {isLFXProjectsFeedback ?
        // For LFX Projects Community Feedback, show non-expandable attendee summary
        <div className="w-full py-2 px-4">
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 text-azure-500 mr-2" />
                <span className="text-sm text-slate-700">
                  People Invited ({meeting.attendees.total})
                </span>
                {/* RSVP counts */}
                <div className="ml-2 flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    <CheckIcon className="h-3 w-3 text-emerald-500 mr-0.5" />
                    <span className="text-slate-600">
                      {meeting.attendees.accepted || 0}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <XIcon className="h-3 w-3 text-red-500 mr-0.5" />
                    <span className="text-slate-600">
                      {meeting.attendees.declined || 0}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HelpCircleIcon className="h-3 w-3 text-amber-500 mr-0.5" />
                    <span className="text-slate-600">
                      {meeting.attendees.tentative || 0}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-0.5"></span>
                    <span className="text-slate-600">
                      {meeting.attendees.total - (meeting.attendees.accepted || 0) - (meeting.attendees.declined || 0) - (meeting.attendees.tentative || 0) || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div> :
        // For all other meetings, show expandable attendee section
        <>
              <button className="w-full py-2 flex items-center hover:bg-slate-50 px-4" onClick={() => setIsAttendeesOpen(!isAttendeesOpen)}>
                <div className="flex items-center flex-grow">
                  <UsersIcon className="h-5 w-5 text-azure-500 mr-2" />
                  <span className="text-sm text-slate-700">
                    {isPastMeeting ? 'People in Attendance' : 'People Invited'}{' '}
                    ({meeting.attendees.total})
                  </span>
                  {/* RSVP counts */}
                  <div className="ml-2 flex items-center space-x-2 text-xs">
                    <div className="flex items-center">
                      <CheckIcon className="h-3 w-3 text-emerald-500 mr-0.5" />
                      <span className="text-slate-600">
                        {meeting.attendees.accepted || 0}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <XIcon className="h-3 w-3 text-red-500 mr-0.5" />
                      <span className="text-slate-600">
                        {meeting.attendees.declined || 0}
                      </span>
                    </div>
                    {!isPastMeeting && <>
                        <div className="flex items-center">
                          <HelpCircleIcon className="h-3 w-3 text-amber-500 mr-0.5" />
                          <span className="text-slate-600">
                            {meeting.attendees.tentative || 0}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-0.5"></span>
                          <span className="text-slate-600">
                            {meeting.attendees.total - (meeting.attendees.accepted || 0) - (meeting.attendees.declined || 0) - (meeting.attendees.tentative || 0) || 0}
                          </span>
                        </div>
                      </>}
                  </div>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isAttendeesOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isAttendeesOpen && <div className="py-3 px-4">
                  {meeting.attendees.people ? <div className="space-y-4">
                      {(() => {
                // Get unique committees (excluding null)
                const committees = [...new Set(meeting.attendees.people.filter(person => person.committee).map(person => person.committee))];
                return <>
                            {/* Committee members */}
                            {committees.map(committee => {
                    const committeeMembers = getSortedAttendees(meeting.attendees.people, committee);
                    return <div key={committee} className="space-y-2">
                                  <h4 className="text-sm font-medium text-slate-700">
                                    {committee} Members
                                  </h4>
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    {committeeMembers.map((person, idx) => <div key={idx} className="flex items-center justify-between py-1">
                                        <div className="flex items-center">
                                          {person.profileImage ? <img src={person.profileImage} alt={person.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                                              {person.name.split(' ').map(n => n[0]).join('')}
                                            </div>}
                                          <div>
                                            <p className="text-sm font-medium text-slate-700 flex items-center">
                                              {person.name}
                                              {person.isOrganizer && <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                  Organizer
                                                </span>}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                              {person.company}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          {isPastMeeting ?
                            // For past meetings, show attended/not attended
                            person.attended ? <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md flex items-center">
                                                <CheckIcon className="h-3 w-3 mr-1" />
                                                Attended
                                              </span> : <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md flex items-center">
                                                <XIcon className="h-3 w-3 mr-1" />
                                                Not Attended
                                              </span> :
                            // For upcoming meetings, show RSVP status
                            <>
                                              {person.rsvpStatus === 'accepted' && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md flex items-center">
                                                  <CheckIcon className="h-3 w-3 mr-1" />
                                                  Going
                                                </span>}
                                              {person.rsvpStatus === 'declined' && <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md flex items-center">
                                                  <XIcon className="h-3 w-3 mr-1" />
                                                  Not Going
                                                </span>}
                                              {person.rsvpStatus === 'tentative' && <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-md flex items-center">
                                                  <HelpCircleIcon className="h-3 w-3 mr-1" />
                                                  Maybe
                                                </span>}
                                              {person.rsvpStatus === 'notResponded' && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-md">
                                                  No Response
                                                </span>}
                                            </>}
                                        </div>
                                      </div>)}
                                  </div>
                                </div>;
                  })}
                            {/* Others invited/attended */}
                            {getSortedAttendees(meeting.attendees.people).length > 0 && <div className="space-y-2">
                                <h4 className="text-sm font-medium text-slate-700">
                                  Others{' '}
                                  {isPastMeeting ? 'in Attendance' : 'Invited'}
                                </h4>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                  {getSortedAttendees(meeting.attendees.people).map((person, idx) => <div key={idx} className="flex items-center justify-between py-1">
                                      <div className="flex items-center">
                                        {person.profileImage ? <img src={person.profileImage} alt={person.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                                            {person.name.split(' ').map(n => n[0]).join('')}
                                          </div>}
                                        <div>
                                          <p className="text-sm font-medium text-slate-700">
                                            {person.name}
                                          </p>
                                          <p className="text-xs text-slate-500">
                                            {person.company}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        {isPastMeeting ?
                          // For past meetings, show attended/not attended
                          person.attended ? <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md flex items-center">
                                              <CheckIcon className="h-3 w-3 mr-1" />
                                              Attended
                                            </span> : <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md flex items-center">
                                              <XIcon className="h-3 w-3 mr-1" />
                                              Not Attended
                                            </span> :
                          // For upcoming meetings, show RSVP status
                          <>
                                            {person.rsvpStatus === 'accepted' && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md flex items-center">
                                                <CheckIcon className="h-3 w-3 mr-1" />
                                                Going
                                              </span>}
                                            {person.rsvpStatus === 'declined' && <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md flex items-center">
                                                <XIcon className="h-3 w-3 mr-1" />
                                                Not Going
                                              </span>}
                                            {person.rsvpStatus === 'tentative' && <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-md flex items-center">
                                                <HelpCircleIcon className="h-3 w-3 mr-1" />
                                                Maybe
                                              </span>}
                                            {person.rsvpStatus === 'notResponded' && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-md">
                                                No Response
                                              </span>}
                                          </>}
                                      </div>
                                    </div>)}
                                </div>
                              </div>}
                            {/* Uninvited People in Attendance - only for past meetings */}
                            {isPastMeeting && meeting.uninvitedAttendees && meeting.uninvitedAttendees.length > 0 && <div className="space-y-2">
                                  <h4 className="text-sm font-medium text-slate-700">
                                    Uninvited People in Attendance
                                  </h4>
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    {meeting.uninvitedAttendees.map((person, idx) => <div key={idx} className="flex items-center justify-between py-1">
                                          <div className="flex items-center">
                                            {person.profileImage ? <img src={person.profileImage} alt={person.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                                                {person.name.split(' ').map(n => n[0]).join('')}
                                              </div>}
                                            <div>
                                              <p className="text-sm font-medium text-slate-700">
                                                {person.name}
                                              </p>
                                              <p className="text-xs text-slate-500">
                                                {person.company}
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md flex items-center">
                                              <CheckIcon className="h-3 w-3 mr-1" />
                                              Attended
                                            </span>
                                          </div>
                                        </div>)}
                                  </div>
                                </div>}
                          </>;
              })()}
                    </div> : <p className="text-sm text-slate-500 italic">
                      Attendee details not available.
                    </p>}
                </div>}
            </>}
        </div>
        {/* Join Call Button - only for first meeting that is not past */}
        {isFirstMeeting && !isPastMeeting && <div className="pt-4 mt-2">
            {/* Left aligned "Starting in 10 min..." text as regular text */}
            <div className="mb-3 ml-1">
              <span className="text-sm text-azure-700">
                Starting in 10 min...
              </span>
            </div>
            <button className="w-full py-2.5 bg-azure-500 hover:bg-azure-600 text-white rounded-md font-medium flex items-center justify-center transition-colors" onClick={() => console.log('Joining call...')}>
              <VideoIcon className="h-5 w-5 mr-2" />
              Join Call
            </button>
          </div>}
        {/* Past Meeting Buttons - only for past meetings */}
        {isPastMeeting && <div className="pt-4 mt-2 grid grid-cols-2 gap-4">
            <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-medium flex items-center justify-center transition-colors" onClick={() => console.log('View recording...')}>
              <VideoIcon className="h-5 w-5 mr-2" />
              See Recording
            </button>
            <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-medium flex items-center justify-center transition-colors" onClick={() => console.log('View AI summary...')}>
              <BotIcon className="h-5 w-5 mr-2" />
              See AI Summary
            </button>
          </div>}
      </ItemCard>
      {/* Invite People Modal */}
      {showInviteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">
                Invite People to Meeting
              </h3>
              <button className="text-slate-500 hover:text-slate-700" onClick={() => setShowInviteModal(false)}>
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div ref={searchRef} className="relative">
                  <label htmlFor="participant-search" className="block text-sm font-medium text-slate-700 mb-1">
                    Search Project Participant
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" id="participant-search" value={searchQuery} onChange={handleParticipantSearch} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Search by name, email, or LFID..." />
                  </div>
                  {/* Search results dropdown */}
                  {showParticipantResults && getFilteredParticipants().length > 0 && <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {getFilteredParticipants().map(participant => <div key={participant.id} className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={() => handleSelectParticipant(participant)}>
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  {participant.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {participant.email} • {participant.company}
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>}
                </div>
                <div>
                  <label htmlFor="invite-email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="invite-email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Enter email address" />
                </div>
                <div>
                  <label htmlFor="invite-message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message (optional)
                  </label>
                  <textarea id="invite-message" value={inviteMessage} onChange={e => setInviteMessage(e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" placeholder="Add a personal message"></textarea>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Or share invitation link
                  </h4>
                  <div className="flex items-center">
                    <div className="flex-1 border border-slate-300 rounded-l-md px-3 py-2 bg-slate-50 text-slate-600 text-sm truncate">
                      https://meetings.kubernetes.io/join/a7f9e2c3
                    </div>
                    <button className="bg-slate-100 hover:bg-slate-200 border border-l-0 border-slate-300 rounded-r-md px-3 py-2 text-slate-700 flex items-center" onClick={handleCopyLink}>
                      {copyLinkSuccess ? <CheckIcon className="h-4 w-4 text-emerald-500" /> : <LinkIcon className="h-4 w-4" />}
                      <span className="ml-1 text-sm">
                        {copyLinkSuccess ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-azure-500 text-white rounded-md hover:bg-azure-600 text-sm font-medium flex items-center" onClick={handleSendInvitation}>
                  <MailIcon className="h-4 w-4 mr-2" />
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Delete Meeting Modal */}
      {showDeleteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">
                Delete Meeting
              </h3>
              <button className="text-slate-500 hover:text-slate-700" onClick={() => setShowDeleteModal(false)}>
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              {deleteStep === 1 ? <div>
                  <p className="text-slate-700 mb-4">
                    Is this a recurring meeting? Please select which meetings
                    you want to delete:
                  </p>
                  <div className="space-y-3">
                    <button className="w-full flex items-center p-3 border border-slate-200 rounded-md hover:bg-slate-50 text-left" onClick={() => handleDeleteTypeSelect('single')}>
                      <div className="flex-shrink-0 mr-3 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-800">
                          This event only
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Delete only this specific meeting occurrence
                        </p>
                      </div>
                    </button>
                    <button className="w-full flex items-center p-3 border border-slate-200 rounded-md hover:bg-slate-50 text-left" onClick={() => handleDeleteTypeSelect('series')}>
                      <div className="flex-shrink-0 mr-3 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-800">
                          All events in the series
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Delete this meeting and all future occurrences
                        </p>
                      </div>
                    </button>
                  </div>
                </div> : <div className="text-center py-2">
                  <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">
                    {deleteType === 'single' ? 'Delete this meeting?' : 'Delete entire meeting series?'}
                  </h4>
                  <p className="text-sm text-slate-600 mb-6">
                    {deleteType === 'single' ? 'This will permanently delete this meeting occurrence. Participants will be notified of the cancellation.' : 'This will permanently delete all future occurrences of this meeting. All participants will be notified of the cancellation.'}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium" onClick={() => setDeleteStep(1)}>
                      Back
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium" onClick={handleDeleteConfirm}>
                      Yes, Delete
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>}
      {/* Invitation Sent Toast */}
      {showInviteToast && <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-50 border-emerald-200 text-emerald-800 p-4 rounded-lg border shadow-md max-w-md flex items-start" role="alert">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">
                {selectedParticipant ? `Invitation sent to ${selectedParticipant.name} successfully.` : inviteEmail ? `Invitation sent to ${inviteEmail} successfully.` : 'Invitation sent successfully.'}
              </p>
              <p className="text-xs text-emerald-700 mt-1">
                They will receive an email with meeting details and calendar
                invite.
              </p>
            </div>
            <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={() => setShowInviteToast(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>}
      {/* Delete Confirmation Toast */}
      {showDeleteToast && <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-red-50 border-red-200 text-red-800 p-4 rounded-lg border shadow-md max-w-md flex items-start" role="alert">
            <div className="flex-shrink-0 mr-3 mt-0.5">
              <AlertTriangleIcon className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium">
                {deleteType === 'single' ? 'Meeting has been deleted. All participants have been notified of the cancellation.' : 'Meeting series has been deleted. All participants have been notified of the cancellation.'}
              </p>
            </div>
            <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={() => setShowDeleteToast(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>}
    </>;
};