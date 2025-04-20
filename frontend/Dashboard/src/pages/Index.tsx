import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EnergyGraph } from "@/components/dashboard/EnergyGraph";
import { DevicesUsage } from "@/components/dashboard/DevicesUsage";
import { ConsumptionStats } from "@/components/dashboard/ConsumptionStats";
// import { ChatbotSection } from "@/components/dashboard/ChatbotSection";
import { RoomUsage } from "@/components/dashboard/RoomUsage";
import { Component, ReactNode } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center glass-card rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Index = () => {
  return (
    <ErrorBoundaryWrapper>
      <div className="flex h-screen bg-[#E2F3F0]">
        <Suspense fallback={<LoadingFallback />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <header className="mb-6">
            <div className="relative bg-[#022F40] backdrop-blur-md rounded-[2rem] border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ 
                backgroundImage: `url('/images/mountain-landscape.png')`,
                opacity: 0.6,
                mixBlendMode: 'soft-light'
              }} />
              <div className="relative z-10 p-10">
                <h1 className="text-6xl font-extrabold text-white font-poppins mb-4 tracking-tight leading-tight">
                  Energy Analytics<br/>
                  <span className="text-white/90">Dashboard</span>
                </h1>
                <p className="text-2xl font-poppins text-white/70 tracking-wide max-w-2xl">
                  Monitor and optimize your energy consumption
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-4">
              <div className="grid gap-6">
                <ErrorBoundaryWrapper>
                  <Suspense fallback={<LoadingFallback />}>
                    <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
                      <EnergyGraph />
                    </div>
                  </Suspense>
                </ErrorBoundaryWrapper>

                <ErrorBoundaryWrapper>
                  <Suspense fallback={<LoadingFallback />}>
                    <div className="bg-[#A1CDA8]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)] transition-all duration-500">
                      <DevicesUsage />
                    </div>
                  </Suspense>
                </ErrorBoundaryWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ErrorBoundaryWrapper>
                    <Suspense fallback={<LoadingFallback />}>
                      <div className="bg-[#B5DFCA]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)] transition-all duration-500">
                        <RoomUsage />
                      </div>
                    </Suspense>
                  </ErrorBoundaryWrapper>

                  <ErrorBoundaryWrapper>
                    <Suspense fallback={<LoadingFallback />}>
                      <div className="bg-[#A1CDA8]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)] transition-all duration-500">
                        <ConsumptionStats />
                      </div>
                    </Suspense>
                  </ErrorBoundaryWrapper>
                </div>
              </div>
            </div>

            {/* <div className="space-y-6">
              <ErrorBoundaryWrapper>
                <Suspense fallback={<LoadingFallback />}>
                  <div className="bg-[#022F40]/90 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 text-white">
                    <ChatbotSection />
                  </div>
                </Suspense>
              </ErrorBoundaryWrapper>
            </div> */}
          </div>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default Index;
