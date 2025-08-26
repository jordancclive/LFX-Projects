import React, { useEffect, useState } from 'react';
import { VotesPollsSidebar } from '../components/votes/VotesPollsSidebar';
import { VoteCard } from '../components/votes/VoteCard';
import { PollCard } from '../components/votes/PollCard';
import { CreateVoteModal } from '../components/votes/CreateVoteModal';
import { CreatePollModal } from '../components/votes/CreatePollModal';
import { VoteIcon, BarChart3Icon, UsersIcon } from 'lucide-react';
export const VotesPollsPage = () => {
  const [activeTab, setActiveTab] = useState('votes');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    committee: 'All committees',
    viewStatus: 'upcoming'
  });
  const [showCreateVoteModal, setShowCreateVoteModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const votingCommittees = ['Technical Steering Committee', 'Governing Board'];
  // Sample data for votes - only from voting committees
  const [votes, setVotes] = useState([{
    id: 1,
    title: 'Add additional maintainers to the API server component',
    description: 'We need to add two additional maintainers to the API server component to help with the increased workload and provide better coverage across time zones.',
    committee: 'Technical Steering Committee',
    status: 'active',
    dueDate: 'Jul 10, 2023',
    isUrgent: false,
    createdAt: 'Jun 20, 2023',
    isFromMeeting: true,
    meetingTitle: 'TSC Monthly Planning',
    meetingDate: 'Jun 18, 2023',
    meetingSeries: 'Monthly TSC Meeting',
    votes: {
      yes: 8,
      no: 0,
      abstain: 1,
      notVoted: 6,
      total: 15
    },
    userVote: null,
    createdBy: {
      name: 'David Martinez',
      profileImage: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    type: 'vote'
  }, {
    id: 2,
    title: 'Approve budget for Kubernetes community event',
    description: 'This vote is to approve the proposed budget of $25,000 for the upcoming Kubernetes community event in September.',
    committee: 'Governing Board',
    status: 'active',
    dueDate: 'Aug 20, 2025',
    isUrgent: true,
    createdAt: 'Jun 22, 2023',
    isFromMeeting: true,
    meetingTitle: 'Governing Board Budget Review',
    meetingDate: 'Jun 21, 2023',
    meetingSeries: 'Quarterly Budget Meeting',
    votes: {
      yes: 5,
      no: 2,
      abstain: 0,
      notVoted: 3,
      total: 10
    },
    userVote: 'abstain',
    createdBy: {
      name: 'Emma Davis',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    type: 'vote'
  }, {
    id: 3,
    title: 'Extend the deprecation timeline for v1beta1 APIs',
    description: 'This vote is to extend the deprecation timeline for v1beta1 APIs by an additional 6 months to allow more time for users to migrate.',
    committee: 'Technical Steering Committee',
    status: 'completed',
    dueDate: 'May 28, 2023',
    isUrgent: false,
    createdAt: 'May 15, 2023',
    isFromMeeting: true,
    meetingTitle: 'API Working Group',
    meetingDate: 'May 14, 2023',
    meetingSeries: 'API WG Bi-weekly',
    votes: {
      yes: 10,
      no: 4,
      abstain: 1,
      notVoted: 0,
      total: 15
    },
    userVote: 'no',
    createdBy: {
      name: 'James Wilson',
      profileImage: null
    },
    type: 'vote'
  }, {
    id: 4,
    title: 'Approve new governance structure for Kubernetes project',
    description: 'This vote is to approve the proposed changes to the governance structure for the Kubernetes project, including the creation of new working groups and committees.',
    committee: 'Governing Board',
    status: 'completed',
    dueDate: 'Apr 15, 2023',
    isUrgent: false,
    createdAt: 'Apr 1, 2023',
    isFromMeeting: true,
    meetingTitle: 'Governing Board Special Session',
    meetingDate: 'Mar 30, 2023',
    meetingSeries: 'Governance Review',
    votes: {
      yes: 9,
      no: 1,
      abstain: 0,
      notVoted: 0,
      total: 10
    },
    userVote: 'yes',
    createdBy: {
      name: 'Ashley Crickenberger',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'vote'
  }]);
  // Sample data for polls - can be from any committee
  const [polls, setPolls] = useState([{
    id: 1,
    title: 'Which name do you prefer for the new feature?',
    description: 'We need to decide on a name for the new auto-scaling feature in Kubernetes v1.28.',
    committee: 'Kubernetes Community',
    status: 'active',
    dueDate: 'Aug 3, 2025',
    isUrgent: true,
    createdAt: 'Jun 25, 2023',
    isFromMeeting: true,
    meetingTitle: 'Kubernetes Community Call',
    meetingDate: 'Jun 24, 2023',
    meetingSeries: 'Monthly Community Call',
    options: [{
      id: 1,
      text: 'AutoScaler Pro',
      votes: 8
    }, {
      id: 2,
      text: 'KubeScale',
      votes: 12
    }, {
      id: 3,
      text: 'ElastiKube',
      votes: 5
    }, {
      id: 4,
      text: 'ScaleForce',
      votes: 3
    }],
    totalVotes: 28,
    userVote: 2,
    createdBy: {
      name: 'Alex Johnson',
      profileImage: null
    },
    type: 'poll'
  }, {
    id: 2,
    title: 'Which day works best for the monthly community meeting?',
    description: "We're considering changing the day of our monthly community meeting to improve attendance.",
    committee: 'Kubernetes Community',
    status: 'active',
    dueDate: 'Jul 7, 2023',
    isUrgent: false,
    createdAt: 'Jun 23, 2023',
    isFromMeeting: true,
    meetingTitle: 'Community Working Group',
    meetingDate: 'Jun 22, 2023',
    meetingSeries: 'CWG Weekly',
    options: [{
      id: 1,
      text: 'Tuesday',
      votes: 15
    }, {
      id: 2,
      text: 'Wednesday',
      votes: 22
    }, {
      id: 3,
      text: 'Thursday',
      votes: 18
    }],
    totalVotes: 55,
    userVote: null,
    createdBy: {
      name: 'Sarah Wilson',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'poll'
  }, {
    id: 3,
    title: 'Which area needs the most documentation improvement?',
    description: 'Help us prioritize our documentation efforts by indicating which area you think needs the most improvement.',
    committee: 'Documentation Team',
    status: 'active',
    dueDate: 'Jul 12, 2023',
    isUrgent: false,
    createdAt: 'Jun 28, 2023',
    isFromMeeting: true,
    meetingTitle: 'Documentation Team Weekly',
    meetingDate: 'Jun 27, 2023',
    meetingSeries: 'Weekly Docs Meeting',
    options: [{
      id: 1,
      text: 'Installation guides',
      votes: 7
    }, {
      id: 2,
      text: 'API reference',
      votes: 12
    }, {
      id: 3,
      text: 'Tutorials',
      votes: 9
    }, {
      id: 4,
      text: 'Troubleshooting',
      votes: 18
    }, {
      id: 5,
      text: 'Concepts',
      votes: 5
    }],
    totalVotes: 51,
    userVote: 4,
    createdBy: {
      name: 'Michael Chen',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    type: 'poll'
  }, {
    id: 4,
    title: 'Preferred location for the next KubeCon',
    description: "We're gathering input on preferred locations for the next KubeCon event.",
    committee: 'Governing Board',
    status: 'completed',
    dueDate: 'Jun 15, 2023',
    isUrgent: false,
    createdAt: 'Jun 1, 2023',
    isFromMeeting: true,
    meetingTitle: 'Events Planning Committee',
    meetingDate: 'May 31, 2023',
    meetingSeries: 'Events Committee Monthly',
    options: [{
      id: 1,
      text: 'San Francisco',
      votes: 42
    }, {
      id: 2,
      text: 'Berlin',
      votes: 38
    }, {
      id: 3,
      text: 'Singapore',
      votes: 27
    }, {
      id: 4,
      text: 'Sydney',
      votes: 21
    }],
    totalVotes: 128,
    userVote: 2,
    createdBy: {
      name: 'Emma Davis',
      profileImage: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    type: 'poll'
  }, {
    id: 5,
    title: 'What security topics should we focus on next?',
    description: 'Help us prioritize the security topics for our upcoming meetings and documentation.',
    committee: 'Security Working Group',
    status: 'active',
    dueDate: 'Jul 20, 2023',
    isUrgent: false,
    createdAt: 'Jul 1, 2023',
    isFromMeeting: true,
    meetingTitle: 'Security Working Group Weekly',
    meetingDate: 'Jun 30, 2023',
    meetingSeries: 'Weekly Security Meeting',
    options: [{
      id: 1,
      text: 'Container vulnerabilities',
      votes: 14
    }, {
      id: 2,
      text: 'RBAC best practices',
      votes: 19
    }, {
      id: 3,
      text: 'Supply chain security',
      votes: 23
    }, {
      id: 4,
      text: 'Network policies',
      votes: 8
    }],
    totalVotes: 64,
    userVote: 3,
    createdBy: {
      name: 'Sarah Wilson',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    type: 'poll'
  }]);
  // Helper function to convert date string to Date object for sorting
  const parseDateString = dateStr => {
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    };
    const [month, day, year] = dateStr.split(' ');
    return new Date(parseInt(year), months[month], parseInt(day));
  };
  // Combine votes and polls into a single array
  const allItems = [...votes, ...polls].filter(item => {
    // Filter by committee
    if (filters.committee !== 'All committees' && item.committee !== filters.committee) return false;
    // Filter by search query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Filter by view status (upcoming/past)
    if (filters.viewStatus === 'upcoming' && item.status !== 'active') return false;
    if (filters.viewStatus === 'past' && item.status !== 'completed') return false;
    return true;
  });
  // Sort items by due date
  // For upcoming: sort by what's coming next (ascending)
  // For past: sort by most recent (descending)
  const sortedItems = [...allItems].sort((a, b) => {
    const dateA = parseDateString(a.dueDate);
    const dateB = parseDateString(b.dueDate);
    if (filters.viewStatus === 'upcoming') {
      return dateA - dateB; // Ascending order for upcoming
    } else {
      return dateB - dateA; // Descending order for past
    }
  });
  // Handle filter changes from sidebar
  const handleFilterChange = filterUpdate => {
    setFilters(prev => ({
      ...prev,
      [filterUpdate.type]: filterUpdate.value
    }));
  };
  // Handle search changes from sidebar
  const handleSearchChange = query => {
    setSearchQuery(query);
  };
  // Check if the current committee can vote
  const canCurrentCommitteeVote = () => {
    return filters.committee === 'All committees' || votingCommittees.includes(filters.committee);
  };
  // Handle modal close
  const handleModalClose = action => {
    if (showCreateVoteModal) {
      setShowCreateVoteModal(false);
      if (action === 'create') {
        // In a real app, we would add the new vote to the list
        console.log('Vote created');
      }
    }
    if (showCreatePollModal) {
      setShowCreatePollModal(false);
      if (action === 'create') {
        // In a real app, we would add the new poll to the list
        console.log('Poll created');
      }
    }
  };
  return <main className="flex-1 p-6 w-full bg-slate-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Votes & Polls
          </h1>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button onClick={() => setShowCreatePollModal(true)} className="flex items-center border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-sm transition-colors">
              <BarChart3Icon className="h-4 w-4 mr-2" />
              Create Poll
            </button>
            <button onClick={() => setShowCreateVoteModal(true)} className="flex items-center px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm font-medium transition-colors" disabled={!canCurrentCommitteeVote()} title={!canCurrentCommitteeVote() ? 'Only voting committees can create votes' : ''}>
              <VoteIcon className="h-4 w-4 mr-1.5" />
              Create Vote
            </button>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            <VotesPollsSidebar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} activeTab={activeTab} filters={filters} votingCommittees={votingCommittees} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {!canCurrentCommitteeVote() && filters.committee !== 'All committees' && <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-700 flex items-center">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    <span>
                      <strong>{filters.committee}</strong> is not a voting
                      committee. Only voting committees can create votes.
                    </span>
                  </p>
                </div>}

            {/* Items Section */}
            {sortedItems.length > 0 ? <div className="mb-8">
                <div className="space-y-4">
                  {sortedItems.map(item => item.type === 'vote' ? <VoteCard key={`vote-${item.id}`} vote={item} /> : <PollCard key={`poll-${item.id}`} poll={item} />)}
                </div>
              </div> : <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-slate-500">
                  No votes or polls found matching your criteria.
                </p>
                {canCurrentCommitteeVote() ? <button onClick={() => setShowCreateVoteModal(true)} className="mt-4 px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm">
                    Create a Vote
                  </button> : <button onClick={() => setShowCreatePollModal(true)} className="mt-4 px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-sm">
                    Create a Poll
                  </button>}
              </div>}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateVoteModal && <CreateVoteModal onClose={handleModalClose} />}
      {showCreatePollModal && <CreatePollModal onClose={handleModalClose} />}
    </main>;
};