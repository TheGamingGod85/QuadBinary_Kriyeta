import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { MonitorCheck, MonitorOff } from "lucide-react";

interface DeviceData {
  device_name: string;
  status: string;
  power_usage: number;
  total_units: number;
  critical?: boolean;
}

export function DevicesUsage() {
  const [devices, setDevices] = useState<DeviceData[]>([]);

  useEffect(() => {
    // Placeholder mock data
    const mockData: DeviceData[] = [
      {
        device_name: "AC - Living Room",
        status: "on",
        power_usage: 120,
        total_units: 5,
      },
      {
        device_name: "Refrigerator",
        status: "on",
        power_usage: 80,
        total_units: 3,
        critical: true,
      },
      {
        device_name: "Washing Machine",
        status: "off",
        power_usage: 0,
        total_units: 2,
      },
      {
        device_name: "Heater",
        status: "off",
        power_usage: 0,
        total_units: 4,
        critical: true,
      },
      {
        device_name: "Fan - Bedroom",
        status: "on",
        power_usage: 45,
        total_units: 1,
      },
    ];

    // Aggregate by device_name
    const aggregatedData: { [key: string]: DeviceData } = {};

    mockData.forEach((device) => {
      if (aggregatedData[device.device_name]) {
        aggregatedData[device.device_name].power_usage += device.power_usage;
        aggregatedData[device.device_name].total_units += device.total_units;
      } else {
        aggregatedData[device.device_name] = { ...device };
      }
    });

    setDevices(Object.values(aggregatedData));
  }, []);

  const onlineDevices = devices.filter((d) => d.status === "on");
  const offlineDevices = devices.filter((d) => d.status !== "on");

  const pieData = onlineDevices.map((device) => ({
    name: device.device_name,
    value: device.power_usage,
    critical: device.critical,
  }));

  const deviceStatusData = [
    { name: "Online", value: onlineDevices.length, color: "#10B981" },
    { name: "Offline", value: offlineDevices.length, color: "#EF4444" },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Devices Usage</CardTitle>
          <CardDescription>
            Total active devices: {onlineDevices.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.critical
                          ? "#EF4444"
                          : COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value} W`, "Usage"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Device Status</CardTitle>
          <CardDescription>Active vs Inactive Devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell key={`status-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MonitorCheck className="h-5 w-5 text-green-500" />
                <span>Online Devices</span>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600" variant="secondary">
                {onlineDevices.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <MonitorOff className="h-5 w-5 text-red-500" />
                <span>Offline Devices</span>
              </div>
              <Badge variant="destructive">{offlineDevices.length}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
