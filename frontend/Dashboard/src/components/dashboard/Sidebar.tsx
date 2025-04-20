import { cn } from "@/lib/utils";
import { userProfile } from "@/data/mockData";
import { 
  BarChart2, 
  PlusCircle, 
  AlertTriangle,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Bot
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: "Graphs",
      icon: BarChart2,
      href: "/graphs",
      active: location.pathname === "/graphs"
    },
    {
      title: "Add Device",
      icon: PlusCircle,
      href: "/add-device",
      active: location.pathname === "/add-device"
    },
    {
      title: "Critical System",
      icon: AlertTriangle,
      href: "/critical-system",
      active: location.pathname === "/critical-system"
    },
    {
      title: "Chat Bot",
      icon: Bot,
      href: "/chat-bot",
      active: location.pathname === "/chat-bot"
    }
  ];

  return (
    <div className="p-4 h-screen bg-[#E2F3F0]">
      <div className={cn(
        "bg-[#A1CDA8]/80 backdrop-blur-md h-full rounded-[2rem] relative transition-all duration-500 ease-in-out flex flex-col border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)]",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-50 h-8 w-8 rounded-full bg-[#022F40] text-white hover:bg-[#022F40]/90 transition-all duration-500 ease-in-out shadow-lg backdrop-blur-sm border border-white/20"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? 
            <PanelLeftOpen className="h-4 w-4 transition-transform duration-500 ease-in-out" /> : 
            <PanelLeftClose className="h-4 w-4 transition-transform duration-500 ease-in-out" />
          }
        </Button>

        <div className="p-6">
          <h1 className={cn(
            "text-3xl font-bold text-[#022F40] flex items-center gap-3 font-poppins transition-all duration-500 ease-in-out",
            isCollapsed && "justify-center"
          )}>
            <span className="w-3 h-3 bg-[#022F40] inline-block rounded-full animate-pulse-slow"></span>
            {!isCollapsed && (
              <span className="transition-opacity duration-500 ease-in-out tracking-tight">
                Sentinel AI
              </span>
            )}
          </h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-in-out font-medium backdrop-blur-sm",
                    item.active
                      ? "bg-[#022F40]/10 text-[#022F40] shadow-[inset_0_0_16px_rgba(2,47,64,0.08)] border border-white/20"
                      : "text-[#022F40]/80 hover:bg-[#B5DFCA]/30 hover:text-[#022F40] hover:shadow-[inset_0_0_16px_rgba(2,47,64,0.04)] hover:border hover:border-white/10",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-500 ease-in-out" />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-500 ease-in-out">
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full flex items-center gap-3 text-[#022F40]/80 rounded-2xl hover:bg-[#B5DFCA]/30 hover:text-[#022F40] transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-[0_4px_16px_rgba(2,47,64,0.08)] hover:border hover:border-white/10",
              isCollapsed ? "justify-center" : "justify-start"
            )}
            onClick={() => navigate('/profile')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#022F40]/10 flex items-center justify-center transition-transform duration-500 ease-in-out border border-white/10">
              <User className="h-5 w-5 text-[#022F40]" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left transition-opacity duration-500 ease-in-out">
                <p className="text-sm font-medium truncate font-poppins">{userProfile.name}</p>
                <p className="text-xs text-[#022F40]/60 truncate">{userProfile.email}</p>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
