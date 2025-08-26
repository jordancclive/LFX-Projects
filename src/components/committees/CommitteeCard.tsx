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
  return <ItemCard>
      <div className="p-5">
        {/* Header with expand/collapse functionality */}
        <div className="flex items-start justify-between cursor-pointer" onClick={toggleExpand}>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-slate-900 mr-3">
                {committee.name}
              </h3>
              {committee.isVotingCommittee && <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                  <VoteIcon className="h-3 w-3 mr-1" />
                  Voting Committee
                </span>}
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {committee.description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {isExpanded ? <ChevronDownIcon className="h-5 w-5 text-slate-400" /> : <ChevronRightIcon className="h-5 w-5 text-slate-400" />}
          </div>
        </div>
        {/* Management Info */}
        <div className="flex items-center mt-4 text-sm">
          <span className="text-slate-600 mr-2">Managed on:</span>
          {committee.managedOn === 'github' ? <a href={committee.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-azure-600 hover:text-azure-700" onClick={e => e.stopPropagation()}>
              GitHub <ExternalLinkIcon className="h-3.5 w-3.5 ml-1" />
            </a> : <span className="text-slate-800">LFX</span>}
        </div>
        {/* Member count */}
        <div className="flex items-center mt-2 text-sm text-slate-600">
          <UsersIcon className="h-4 w-4 mr-1.5 text-azure-500" />
          <span>
            {committee.members.length} members ({votingMembers.length} voting)
          </span>
        </div>
        {/* Expanded content - Member list */}
        {isExpanded && <div className="mt-5 border-t border-slate-200 pt-4">
            <h4 className="text-sm font-medium text-slate-800 mb-3">
              Committee Members
            </h4>
            <div className="space-y-3">
              {committee.members.map(member => <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-slate-600">
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
                        {member.isVoting && <span className="ml-2 px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center">
                            <VoteIcon className="h-3 w-3 mr-1" />
                            Voting
                          </span>}
                        {!member.isVoting && <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                            Non-voting
                          </span>}
                      </div>
                      <div className="flex items-center text-xs text-slate-500 mt-0.5">
                        <span>{member.company}</span>
                        <span className="mx-1.5">•</span>
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <Link to={`/committees/${committee.id}`} className="text-sm text-azure-600 hover:text-azure-700 font-medium flex items-center">
                View Committee Details
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>}
      </div>
    </ItemCard>;
};