import { Sidebar } from "@/components/dashboard/Sidebar";
import { CriticalSystemControl } from "@/components/dashboard/CriticalSystemControl";
import { AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const CriticalSystemPage = () => {
  return (
    <DashboardLayout
      title="Critical System Management"
      description="Manage emergency power settings and critical devices"
    >
      <div className="grid gap-6">
        <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
          <CriticalSystemControl />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CriticalSystemPage;
