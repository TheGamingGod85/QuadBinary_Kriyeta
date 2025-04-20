import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Power } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Device } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function CriticalSystemControl() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [devicesList, setDevicesList] = useState<Device[]>([]);
  const [criticalDevices, setCriticalDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/devices")
      .then(res => res.json())
      .then(data => setDevicesList(data))
      .catch(err =>
        toast({
          title: "Error fetching devices",
          description: err.message,
          variant: "destructive",
        })
      );
  }, []);

  useEffect(() => {
    setCriticalDevices(devicesList.filter(device => device.critical));
  }, [devicesList]);

  const toggleCritical = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/devices/${id}/critical`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ critical: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update critical status.");
      }

      setDevicesList(prevDevices =>
        prevDevices.map(device =>
          device.id === id ? { ...device, critical: !device.critical } : device
        )
      );

      toast({
        title: "Updated",
        description: `Device marked as ${!currentStatus ? "Critical" : "Non-critical"}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const toggleEmergencyMode = async () => {
    const newMode = !emergencyMode;

    try {
      const response = await fetch("/api/emergency", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emergency: newMode }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle emergency mode.");
      }

      setEmergencyMode(newMode);

      toast({
        title: newMode ? "Emergency Mode Activated" : "Emergency Mode Deactivated",
        description: newMode
          ? "All non-critical devices have been powered off."
          : "All devices returned to normal operation.",
        variant: newMode ? "destructive" : undefined,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "p-8 rounded-[2rem] border-2 backdrop-blur-xl transition-all duration-500",
          emergencyMode
            ? "border-[#ef4444]/20 bg-red-50/60"
            : "border-[#4caf50]/20 bg-[#e8f5e9]/60"
        )}
      >
        <div className="flex flex-col items-center text-center gap-6">
          <div
            className={cn(
              "w-20 h-20 rounded-[1rem] flex items-center justify-center backdrop-blur-xl transition-all duration-500 border border-white/20",
              emergencyMode
                ? "bg-[#ef4444]/20 text-[#ef4444]"
                : "bg-[#4caf50]/20 text-[#4caf50]"
            )}
          >
            <Power className="h-10 w-10" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2 font-poppins">
                {emergencyMode ? "Emergency Mode Active" : "Normal Operation"}
              </h3>
              <p className="text-[#022F40]/70">
                {emergencyMode
                  ? "Only critical devices are powered"
                  : "All devices are functioning normally"}
              </p>
            </div>
            <Button
              onClick={toggleEmergencyMode}
              className={cn(
                "gap-2 rounded-xl px-6 py-2 transition-all duration-300",
                emergencyMode
                  ? "bg-white/80 text-[#ef4444] hover:bg-white border border-[#ef4444]/20"
                  : "bg-[#ef4444] text-white hover:bg-[#ef4444]/90"
              )}
            >
              <AlertTriangle className="h-4 w-4" />
              {emergencyMode ? "Deactivate Emergency Mode" : "Activate Emergency Mode"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold font-poppins text-[#022F40]">
          Critical Devices ({criticalDevices.length})
        </h3>
        <div className="space-y-3">
          {devicesList.map(device => (
            <div
              key={device.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border backdrop-blur-xl transition-all duration-300",
                device.critical
                  ? "bg-[#2e7d32]/10 border-[#2e7d32]/30"
                  : "bg-white/60 border-white/20 hover:border-[#4caf50]/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    device.status === "online"
                      ? device.critical
                        ? "bg-[#2e7d32]"
                        : "bg-[#4caf50]"
                      : "bg-gray-400"
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    device.critical ? "text-[#1b5e20]" : "text-[#022F40]"
                  )}
                >
                  {device.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#022F40]/70">
                  {device.consumption} kWh
                </span>
                <Button
                  size="sm"
                  className={cn(
                    "rounded-xl transition-all duration-300",
                    device.critical
                      ? "bg-[#2e7d32] text-white hover:bg-[#1b5e20]"
                      : "bg-white/80 text-[#022F40]/70 hover:text-[#022F40] hover:bg-white border border-[#4caf50]/20"
                  )}
                  onClick={() => toggleCritical(device.id, device.critical)}
                >
                  {device.critical ? "Critical" : "Set Critical"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#e8f5e9]/60 rounded-xl border border-[#4caf50]/20 backdrop-blur-xl">
          <p className="text-sm text-[#022F40]/70">
            In emergency mode, all non-critical devices will be automatically powered off to
            conserve energy.
          </p>
        </div>
      </div>
    </div>
  );
}
