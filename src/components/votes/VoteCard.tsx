import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUpIcon, ThumbsDownIcon, MinusCircleIcon, ClockIcon, AlertTriangleIcon, VoteIcon, UserIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { ItemCard } from '../ItemCard';
export const VoteCard = ({
  vote
}) => {
  const totalVoted = vote.votes.yes + vote.votes.no + vote.votes.abstain;
  const percentageVoted = Math.round(totalVoted / vote.votes.total * 100);
  return <ItemCard>
      <div className="p-4">
        {/* Title and urgency tag */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-azure-50 text-azure-700 text-xs rounded-md flex items-center whitespace-nowrap">
                <VoteIcon className="h-3 w-3 mr-1" />
                Vote
              </span>
              <h3 className="text-base font-medium text-slate-800">
                {vote.title}
              </h3>
              {vote.isUrgent && <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center whitespace-nowrap">
                  <AlertTriangleIcon className="h-3 w-3 mr-1" />
                  Urgent
                </span>}
            </div>
            {/* Description - now shown by default */}
            <p className="text-sm text-slate-600 mt-2">{vote.description}</p>
          </div>
        </div>
        {/* Committee, date, and progress */}
        <div className="mt-3">
          <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-4 gap-y-2 mb-3">
            <div className="flex items-center">
              <UsersIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>{vote.committee}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>
                {vote.status === 'active' ? 'Due' : 'Closed'}: {vote.dueDate}
              </span>
            </div>
            {vote.isFromMeeting && <div className="flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                <span>From: {vote.meetingTitle}</span>
              </div>}
            <div className="flex items-center">
              <UserIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>Created by: {vote.createdBy.name}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500">
                {totalVoted} of {vote.votes.total} voted ({percentageVoted}%)
              </span>
              {vote.status === 'active' && vote.userVote === null && <span className="text-xs text-amber-600 font-medium">
                  Your vote required
                </span>}
              {vote.status === 'active' && vote.userVote !== null && <div className="flex items-center">
                  <span className="text-xs text-slate-500 mr-1">
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
                </div>}
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
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
            {/* Vote counts */}
            <div className="flex mt-2 text-xs gap-3">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></div>
                <span className="text-slate-600">Yes: {vote.votes.yes}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                <span className="text-slate-600">No: {vote.votes.no}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 mr-1.5"></div>
                <span className="text-slate-600">
                  Abstain: {vote.votes.abstain}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-slate-300 mr-1.5"></div>
                <span className="text-slate-600">
                  Not voted: {vote.votes.notVoted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemCard>;
};