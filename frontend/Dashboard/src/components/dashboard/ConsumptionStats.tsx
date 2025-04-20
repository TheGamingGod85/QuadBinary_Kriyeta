import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp } from "lucide-react";

// Function to convert time (hh:mm:ss) to hours
const timeToHours = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours + minutes / 60 + seconds / 3600;
};

// Function to calculate energy consumption in kWh from wattage and time
const calculateEnergyUsage = (ratedPower: number, timeOn: string) => {
  const timeInHours = timeToHours(timeOn);
  return (ratedPower * timeInHours) / 1000; // Convert to kWh
};

export function ConsumptionStats() {
  const [consumptionStats, setConsumptionStats] = useState({
    current: 0,
    previous: 0,
    limit: 10, // Example, can be fetched or set from a config
    highestToday: 0,
    lowestToday: 0
  });

  useEffect(() => {
    fetch("http://localhost:9090/api/energy-usage")
      .then((res) => res.json())
      .then((data) => {
        // Calculate current usage in kWh
        const currentUsage = data.reduce((total, item) => {
          return total + calculateEnergyUsage(item.rated_power, item.time_on);
        }, 0);

        // Calculate the highest and lowest usage today (in kWh)
        const highestToday = Math.max(
          ...data.map((item) => calculateEnergyUsage(item.rated_power, item.time_on))
        );
        const lowestToday = Math.min(
          ...data.map((item) => calculateEnergyUsage(item.rated_power, item.time_on))
        );

        // Calculate previous day's usage (using mock data or another API endpoint for historical data)
        const previousUsage = 5; // Placeholder for previous day usage, can be calculated similarly or fetched from another API

        setConsumptionStats({
          current: currentUsage,
          previous: previousUsage,
          limit: 10, // This can be a dynamic value fetched from your system
          highestToday,
          lowestToday
        });
      })
      .catch((error) => console.error("Failed to fetch consumption data:", error));
  }, []);

  const percentOfLimit = (consumptionStats.current / consumptionStats.limit) * 100;
  const changePercent = ((consumptionStats.current - consumptionStats.previous) / consumptionStats.previous) * 100;
  const isDecreased = changePercent < 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Consumption Stats</CardTitle>
        <CardDescription>
          Current consumption vs. limit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Usage</span>
            <span className="font-medium">{consumptionStats.current.toFixed(3)} kWh</span>
          </div>
          <Progress value={percentOfLimit} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 kWh</span>
            <span>Limit: {consumptionStats.limit} kWh</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sentinel-light p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">vs Yesterday</div>
            <div className="flex items-center">
              <span className="text-xl font-semibold mr-2">
                {Math.abs(changePercent).toFixed(1)}%
              </span>
              {isDecreased ? (
                <div className="flex items-center text-sentinel-secondary">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-xs">Lower</span>
                </div>
              ) : (
                <div className="flex items-center text-sentinel-danger">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-xs">Higher</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-sentinel-light p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Peak Today</div>
            <div className="text-xl font-semibold">{consumptionStats.highestToday.toFixed(3)} kWh</div>
          </div>
          
          <div className="bg-sentinel-light p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Lowest Today</div>
            <div className="text-xl font-semibold">{consumptionStats.lowestToday.toFixed(3)} kWh</div>
          </div>
          
          <div className="bg-sentinel-light p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Efficiency</div>
            <div className="text-xl font-semibold">{isDecreased ? 'Good' : 'Poor'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
