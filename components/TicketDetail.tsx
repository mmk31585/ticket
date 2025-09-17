import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Calendar, AlertCircle, Clock, User, X, MessageSquare, UserPlus, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignee: { name: string; avatar: string };
  description: string;
}

interface TicketDetailProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketDetail({ ticket, isOpen, onClose }: TicketDetailProps) {
  if (!isOpen || !ticket) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'closed':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-emerald-500';
      default:
        return 'text-slate-500';
    }
  };

  const formatStatus = (status: string) => {
    return status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
  };

  const activityItems = [
    { 
      time: '2 hours ago', 
      action: 'Ticket created', 
      user: 'John Doe',
      avatar: 'JD',
      type: 'created',
      message: 'Created this ticket and assigned to team member'
    },
    { 
      time: '1 hour ago', 
      action: 'Status changed to In Progress', 
      user: 'Jane Smith',
      avatar: 'JS',
      type: 'status',
      message: 'Started working on this issue'
    },
    { 
      time: '30 minutes ago', 
      action: 'Comment added', 
      user: 'Mike Johnson',
      avatar: 'MJ',
      type: 'comment',
      message: 'I think we should prioritize the mobile browser compatibility first, then work on the desktop version.'
    },
  ];

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-96 bg-white border-l border-slate-200 shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="leading-tight mb-3">{ticket.title}</h2>
              <Badge className={`${getStatusColor(ticket.status)} border text-xs px-3 py-1 rounded-full`}>
                {formatStatus(ticket.status)}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Ticket Details */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <AlertCircle size={16} className={getPriorityColor(ticket.priority)} />
              <span className="text-slate-600">Priority:</span>
              <span className="capitalize">{ticket.priority}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-slate-500" />
              <span className="text-slate-600">Assignee:</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-slate-200 text-slate-700">
                    {ticket.assignee.avatar}
                  </AvatarFallback>
                </Avatar>
                <span>{ticket.assignee.name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-slate-500" />
              <span className="text-slate-600">Created:</span>
              <span>{ticket.date}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-3">Description</h3>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-700 leading-relaxed">
                {ticket.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl h-11">
              <MessageSquare size={16} />
              Reply
            </Button>
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl h-11">
              <UserPlus size={16} />
              Assign
            </Button>
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50 rounded-xl h-11">
              <CheckCircle2 size={16} />
              Close
            </Button>
          </div>

          <Separator />

          {/* Activity Timeline */}
          <div>
            <h3 className="mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {activityItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-teal-100 to-blue-100 text-teal-700">
                          {item.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {index < activityItems.length - 1 && (
                        <div className="w-px h-8 bg-slate-200 mt-2"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="bg-white border border-slate-200 rounded-xl p-3 group-hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{item.user}</span>
                          <span className="text-xs text-slate-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{item.action}</p>
                        {item.message && (
                          <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-2">
                            {item.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}