import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3Icon, ClockIcon, AlertTriangleIcon, UserIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { ItemCard } from '../ItemCard';
export const PollCard = ({
  poll
}) => {
  // Find the option with the most votes
  const maxVotes = Math.max(...poll.options.map(option => option.votes));
  return <ItemCard>
      <div className="p-4">
        {/* Title and urgency tag */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md flex items-center whitespace-nowrap">
                <BarChart3Icon className="h-3 w-3 mr-1" />
                Poll
              </span>
              <h3 className="text-base font-medium text-slate-800">
                {poll.title}
              </h3>
              {poll.isUrgent && <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-md flex items-center whitespace-nowrap">
                  <AlertTriangleIcon className="h-3 w-3 mr-1" />
                  Urgent
                </span>}
            </div>
            {/* Description - now shown by default */}
            <p className="text-sm text-slate-600 mt-2">{poll.description}</p>
          </div>
        </div>
        {/* Committee, date, and progress */}
        <div className="mt-3">
          <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-4 gap-y-2 mb-3">
            <div className="flex items-center">
              <UsersIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>{poll.committee}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>
                {poll.status === 'active' ? 'Due' : 'Closed'}: {poll.dueDate}
              </span>
            </div>
            {poll.isFromMeeting && <div className="flex items-center">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                <span>From: {poll.meetingTitle}</span>
              </div>}
            <div className="flex items-center">
              <UserIcon className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
              <span>Created by: {poll.createdBy.name}</span>
            </div>
          </div>
          {/* Poll results */}
          <div className="mt-3 space-y-2">
            {poll.options.map(option => {
            const percentage = Math.round(option.votes / poll.totalVotes * 100) || 0;
            return <div key={option.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-700">
                      {option.text}
                      {poll.userVote === option.id && <span className="ml-2 text-xs text-azure-600 font-medium">
                          (Your choice)
                        </span>}
                    </span>
                    <span className="text-xs text-slate-500">
                      {option.votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${option.votes === maxVotes ? 'bg-azure-500' : 'bg-slate-300'}`} style={{
                  width: `${percentage}%`
                }}></div>
                  </div>
                </div>;
          })}
          </div>
          {/* Total responses */}
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-slate-500">
              {poll.totalVotes} total responses
            </span>
            {poll.status === 'active' && poll.userVote === null && <span className="text-xs text-amber-600 font-medium">
                Your response required
              </span>}
          </div>
        </div>
      </div>
    </ItemCard>;
};