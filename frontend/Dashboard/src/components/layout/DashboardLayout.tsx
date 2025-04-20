import { Suspense, ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Mountain Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#e8f5e9]/90 via-[#c8e6c9]/80 to-[#b2dfb2]/70 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 flex h-screen">
        <Suspense fallback={<LoadingFallback />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <header className="mb-6">
            <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-10 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)]">
              <h1 className="text-6xl font-extrabold text-[#022F40] font-poppins mb-4 tracking-tight leading-tight">
                {title}
              </h1>
              {description && (
                <p className="text-2xl font-poppins text-[#022F40]/70 tracking-wide max-w-2xl">
                  {description}
                </p>
              )}
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
} 