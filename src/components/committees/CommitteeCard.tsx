import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, ChevronDownIcon, ChevronRightIcon, ExternalLinkIcon, VoteIcon } from 'lucide-react';
import { ItemCard } from '../ItemCard';
export const CommitteeCard = ({
  committee
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const votingMembers = committee.members.filter(member => member.isVoting);
  return <ItemCard className="overflow-hidden">
      {/* Committee Header */}
      <div className="flex justify-between items-start py-2">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-slate-900 mr-3">
            {committee.name}
          </h3>
          {committee.isVotingCommittee && <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
              <VoteIcon className="h-3 w-3 mr-1" />
              Voting Committee
            </span>}
        </div>
        <Link to={`/committees/${committee.id}`} className="text-sm text-azure-600 hover:text-azure-700 font-medium flex items-center">
          View Details
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {/* Committee Description */}
      <div className="py-2">
        <p className="text-sm text-slate-600">{committee.description}</p>
      </div>
      {/* Management Info & Member Count */}
      <div className="flex flex-wrap items-center py-2">
        <div className="flex items-center mr-6">
          <span className="text-sm text-slate-600 mr-2">Managed on:</span>
          {committee.managedOn === 'github' ? <a href={committee.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-azure-600 hover:text-azure-700" onClick={e => e.stopPropagation()}>
              GitHub <ExternalLinkIcon className="h-3.5 w-3.5 ml-1" />
            </a> : <span className="text-sm font-medium text-slate-800">LFX</span>}
        </div>
        <div className="flex items-center">
          <UsersIcon className="h-4 w-4 mr-1.5 text-azure-500" />
          <span className="text-sm text-slate-600">
            {committee.members.length} members ({votingMembers.length} voting)
          </span>
        </div>
      </div>
      {/* Members Section */}
      <div>
        <button className="w-full py-2 flex items-center hover:bg-slate-50" onClick={toggleExpand}>
          <div className="flex items-center flex-grow">
            <UsersIcon className="h-5 w-5 text-azure-500 mr-2" />
            <span className="text-sm text-slate-700">Committee Members</span>
          </div>
          <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
        </button>
        {isExpanded && <div className="py-2 px-4 bg-slate-50 border-t border-b border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {committee.members.map(member => <div key={member.id} className="flex items-center p-2 rounded-md hover:bg-slate-100">
                  <div className="flex items-center flex-1">
                    {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600 text-xs font-medium">
                        {member.name.charAt(0)}
                      </div>}
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-slate-800">
                          {member.name}
                        </p>
                        {member.role === 'Chair' && <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md">
                            Chair
                          </span>}
                        {member.role === 'Vice Chair' && <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md">
                            Vice Chair
                          </span>}
                      </div>
                      <p className="text-xs text-slate-500">{member.company}</p>
                    </div>
                  </div>
                  {member.isVoting && <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                      <VoteIcon className="h-3 w-3 mr-1" />
                      Voting
                    </span>}
                </div>)}
            </div>
          </div>}
      </div>
    </ItemCard>;
};