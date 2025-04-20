import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DeviceData {
  device_name: string;
  room_name: string;
  power_usage: number;
  critical?: boolean;
}

export function RoomUsage() {
  const [roomUsageData, setRoomUsageData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/energy-usage")
      .then((res) => res.json())
      .then((data) => {
        // Aggregate data by room_name
        const aggregatedRoomData: { [key: string]: number } = {};

        data.forEach((device: DeviceData) => {
          const room = device.room_name;
          aggregatedRoomData[room] = (aggregatedRoomData[room] || 0) + device.power_usage;
        });

        // Convert aggregated data into an array format
        const formattedRoomData = Object.entries(aggregatedRoomData).map(
          ([name, value]) => ({ name, value })
        );

        setRoomUsageData(formattedRoomData);
      })
      .catch((error) =>
        console.error("Failed to fetch room energy usage:", error)
      );
  }, []);

  const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Room Usage</CardTitle>
        <CardDescription>Energy consumption by room</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roomUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roomUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} W`, 'Consumption']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
