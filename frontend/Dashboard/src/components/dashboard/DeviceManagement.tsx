import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Device } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import axios from "axios";

export function DeviceManagement() {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [roomMap, setRoomMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchRooms();
    fetchDevices();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/rooms");
      const roomData: Record<string, string> = {};
      res.data.forEach((room: any) => {
        roomData[room.id] = room.name;
      });
      setRoomMap(roomData);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/devices");
      const data = response.data.map((d: any) => ({
        id: d.id,
        name: d.name,
        location: d.room_id,
        type: "Unknown",
        consumption: d.power_usage,
        status: d.status,
        critical: d.critical ?? false,
      }));
      setDeviceList(data);
    } catch (error) {
      console.error("Failed to fetch devices", error);
    }
  };

  const toggleCritical = async (id: string, currentStatus: boolean) => {
    try {
      const newCriticalStatus = !currentStatus;
      await axios.put(`http://localhost:8000/devices/${id}/critical`, {
        critical: newCriticalStatus,
      });
      setDeviceList((prev) =>
        prev.map((device) =>
          device.id === id ? { ...device, critical: newCriticalStatus } : device
        )
      );
    } catch (error) {
      console.error("Failed to update critical status", error);
    }
  };

  const removeDevice = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/devices/${id}`);
      setDeviceList((prev) => prev.filter((device) => device.id !== id));
    } catch (error) {
      console.error("Failed to delete device", error);
    }
  };

  const updateStatus = async (id: string, newStatus: "online" | "offline") => {
    try {
      await axios.put(`http://localhost:8000/devices/${id}/status`, {
        status: newStatus,
      });
      setDeviceList((prev) =>
        prev.map((device) =>
          device.id === id ? { ...device, status: newStatus } : device
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Device Management</CardTitle>
          <CardDescription>Manage your connected devices</CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Device
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deviceList.map((device) => (
            <div
              key={device.id}
              className={cn(
                "p-4 rounded-lg border flex flex-col gap-2 transition-colors",
                device.critical ? "border-sentinel-danger bg-red-50" : "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{device.name}</h3>
                  <Badge
                    variant={device.status === "online" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {device.status}
                  </Badge>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeDevice(device.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Location: {roomMap[device.location] || "Unknown"} • Type: {device.type}
              </div>

              <div className="text-sm font-medium">
                Current consumption: {device.consumption} kWh
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={cn(
                      "h-4 w-4",
                      device.critical ? "text-sentinel-danger" : "text-muted-foreground"
                    )}
                  />
                  <span className="text-sm">Mark as critical</span>
                </div>
                <Switch
                  checked={device.critical}
                  onCheckedChange={() => toggleCritical(device.id, device.critical)}
                />
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(device.id, "online")}
                  disabled={device.status === "online"}
                >
                  Turn On
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(device.id, "offline")}
                  disabled={device.status === "offline"}
                >
                  Turn Off
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
