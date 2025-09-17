import { Home, Ticket, BarChart3, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'tickets', icon: Ticket, label: 'Tickets' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-slate-800 text-xl">TicketFlow</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your tickets</p>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 hover:shadow-sm ${
                activeTab === item.id
                  ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}