"use client";

import { DeviceManagement } from "@/components/dashboard/DeviceManagement";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const AddDevicePage = () => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [deviceLocation, setDeviceLocation] = useState("");
  const [customRoom, setCustomRoom] = useState("");
  const [isCustomRoom, setIsCustomRoom] = useState(false);
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [ratedPower, setRatedPower] = useState<number>(70); // Default rated power

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:8000/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Failed to load rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleAddDevice = async () => {
    if (!deviceName || !deviceType || (!deviceLocation && !customRoom) || ratedPower <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to add a device.",
        variant: "destructive"
      });
      return;
    }

    try {
      const roomName = isCustomRoom ? customRoom : deviceLocation;
      let roomId: string | null = null;

      const existingRoom = rooms.find(
        (r) => r.name.toLowerCase() === roomName.toLowerCase()
      );

      if (!existingRoom) {
        const res = await fetch("http://localhost:8000/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: roomName })
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || "Room creation failed.");
        }

        const newRoom = await res.json();
        roomId = newRoom.id;
        setRooms((prev) => [...prev, newRoom]);
      } else {
        roomId = existingRoom.id;
      }

      // Create device body without device status
      const deviceBody = {
        name: deviceName,
        room_id: roomId,
        rated_power: ratedPower,
        status: "off", // Default status is 'off'
        time_on: "00:00:00", // Default time on
        power_usage: 0 // Initial power usage
      };

      const deviceRes = await fetch("http://localhost:8000/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deviceBody)
      });

      if (!deviceRes.ok) throw new Error("Failed to add device.");

      toast({
        title: "Device added",
        description: `${deviceName} was added to ${roomName}`
      });

      // Reset form fields
      setDeviceName("");
      setDeviceType("");
      setDeviceLocation("");
      setCustomRoom("");
      setIsCustomRoom(false);
      setRatedPower(70); // Reset rated power
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout
      title="Device Management"
      description="Add and manage your connected devices"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#A1CDA8]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)] transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-[#022F40]">
              <PlusCircle className="h-5 w-5" />
              Add New Device
            </CardTitle>
            <CardDescription className="text-[#022F40]/70">
              Register a new device to monitor its energy consumption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="device-name" className="text-[#022F40]">Device Name</Label>
              <Input 
                id="device-name" 
                placeholder="e.g., Living Room TV" 
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="bg-white/50 border-white/20 focus:border-[#022F40]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="device-type" className="text-[#022F40]">Device Type</Label>
              <Select value={deviceType} onValueChange={setDeviceType}>
                <SelectTrigger id="device-type" className="bg-white/50 border-white/20">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="appliance">Appliance</SelectItem>
                  <SelectItem value="climate">Climate Control</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="device-location" className="text-[#022F40]">Location</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsCustomRoom(!isCustomRoom)}
                  className="text-xs text-[#022F40] hover:text-[#022F40]/80"
                >
                  {isCustomRoom ? "Select existing room" : "Add custom room"}
                </Button>
              </div>
              {isCustomRoom ? (
                <Input
                  id="custom-room"
                  placeholder="Enter room name"
                  value={customRoom}
                  onChange={(e) => setCustomRoom(e.target.value)}
                  className="bg-white/50 border-white/20 focus:border-[#022F40]/20"
                />
              ) : (
                <Select value={deviceLocation} onValueChange={setDeviceLocation}>
                  <SelectTrigger id="device-location" className="bg-white/50 border-white/20">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.name}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rated-power" className="text-[#022F40]">Rated Power (W)</Label>
              <Input
                id="rated-power"
                type="number"
                value={ratedPower}
                onChange={(e) => setRatedPower(Number(e.target.value))}
                className="bg-white/50 border-white/20 focus:border-[#022F40]/20"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAddDevice} 
              className="w-full bg-[#022F40] text-white hover:bg-[#022F40]/90"
            >
              Add Device
            </Button>
          </CardFooter>
        </div>
        <div className="bg-[#B5DFCA]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-[0_8px_32px_rgba(2,47,64,0.12)] hover:shadow-[0_12px_40px_rgba(2,47,64,0.16)] transition-all duration-500">
          <DeviceManagement />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddDevicePage;
