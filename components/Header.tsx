import { Search, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onNewTicket: () => void;
}

export function Header({ onNewTicket }: HeaderProps) {
  return (
    <div className="bg-background border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search tickets..."
            className="pl-10 bg-slate-50 border-0 rounded-xl h-10 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
          />
        </div>
      </div>
      
      <Button onClick={onNewTicket} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <Plus size={18} />
        New Ticket
      </Button>
    </div>
  );
}