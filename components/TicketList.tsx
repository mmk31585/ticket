import { TicketCard } from "./TicketCard";

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignee: { name: string; avatar: string };
  description: string;
}

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onTicketSelect: (ticketId: string) => void;
}

export function TicketList({ tickets, selectedTicketId, onTicketSelect }: TicketListProps) {
  return (
    <div className="space-y-3">
      <h2 className="mb-4">Recent Tickets</h2>
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            isSelected={selectedTicketId === ticket.id}
            onClick={() => onTicketSelect(ticket.id)}
          />
        ))}
      </div>
    </div>
  );
}