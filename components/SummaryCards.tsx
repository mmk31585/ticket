import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface SummaryCardsProps {
  tickets: any[];
}

export function SummaryCards({ tickets }: SummaryCardsProps) {
  const openCount = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressCount = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const closedCount = tickets.filter(ticket => ticket.status === 'closed').length;

  const summaryData = [
    {
      title: 'Open',
      count: openCount,
      badge: 'open',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      bgGradient: 'from-emerald-50 to-emerald-100'
    },
    {
      title: 'In Progress',
      count: inProgressCount,
      badge: 'in-progress',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      bgGradient: 'from-amber-50 to-amber-100'
    },
    {
      title: 'Closed',
      count: closedCount,
      badge: 'closed',
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      bgGradient: 'from-slate-50 to-slate-100'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {summaryData.map((item) => (
        <Card key={item.title} className={`p-6 bg-gradient-to-br ${item.bgGradient} border border-slate-200 rounded-2xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 mb-2 text-sm">{item.title} Tickets</p>
              <p className="text-3xl text-slate-800">{item.count}</p>
            </div>
            <Badge className={`${item.color} border text-xs px-3 py-1 rounded-lg`}>
              {item.title}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}