import { EnergyGraph } from "@/components/dashboard/EnergyGraph";
import { DevicesUsage } from "@/components/dashboard/DevicesUsage";
import { RoomUsage } from "@/components/dashboard/RoomUsage";
import { ConsumptionStats } from "@/components/dashboard/ConsumptionStats";
// import { ChatbotSection } from "@/components/dashboard/ChatbotSection";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Suspense } from "react";
// import { Calendar } from "@/components/ui/calendar";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const GraphsPage = () => {
  return (
    <DashboardLayout
      title="Energy Analytics Dashboard"
      description="Monitor and optimize your energy consumption"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-4">
          <div className="grid gap-6">
            <Suspense fallback={<LoadingFallback />}>
              <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
                <EnergyGraph />
              </div>
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
                <DevicesUsage />
              </div>
            </Suspense>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense fallback={<LoadingFallback />}>
                <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
                  <RoomUsage />
                </div>
              </Suspense>

              <Suspense fallback={<LoadingFallback />}>
                <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
                  <ConsumptionStats />
                </div>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 space-y-6">
          {/* <Suspense fallback={<LoadingFallback />}>
            <div className="bg-[#022F40]/90 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-500 text-white h-[calc(75vh)]">
              <ChatbotSection />
            </div>
          </Suspense> */}
          
          {/* <Suspense fallback={<LoadingFallback />}>
            <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] p-6 border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500 h-[calc(55vh-1rem)]">
              {/* <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md w-full h-full"
                classNames={{
                  months: "w-full h-full flex flex-col",
                  month: "w-full space-y-1",
                  caption: "flex justify-center pt-1 relative items-center mb-2",
                  caption_label: "text-sm font-medium",
                  table: "w-full h-full",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] pb-1",
                  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-[#c8e6c9]/50",
                  nav: "space-x-1 flex items-center mb-1",
                  row: "flex w-full mt-1"
                }}
              />
            </div>
          </Suspense> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GraphsPage;
