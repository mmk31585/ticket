import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Calendar, AlertCircle } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignee: { name: string; avatar: string };
  description: string;
}

interface TicketCardProps {
  ticket: Ticket;
  isSelected: boolean;
  onClick: () => void;
}

export function TicketCard({ ticket, isSelected, onClick }: TicketCardProps) {
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

  return (
    <Card 
      onClick={onClick}
      className={`p-5 cursor-pointer transition-all duration-200 border rounded-xl hover:shadow-lg hover:-translate-y-0.5 ${
        isSelected 
          ? 'border-teal-300 bg-teal-50 shadow-lg ring-2 ring-teal-100' 
          : 'border-slate-200 hover:border-teal-200 bg-white'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 flex-1 leading-relaxed">{ticket.title}</h3>
          <Badge className={`${getStatusColor(ticket.status)} border text-xs px-2 py-1 rounded-lg`}>
            {formatStatus(ticket.status)}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className={getPriorityColor(ticket.priority)} />
              <span className="text-sm text-slate-600 capitalize">{ticket.priority}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-slate-200">
                <AvatarFallback className="text-xs bg-slate-100 text-slate-600">
                  {ticket.assignee.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600">{ticket.assignee.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Calendar size={14} />
            <span>{ticket.date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}