
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { consumptionStats, energyData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DataPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Energy Data</h1>
            <p className="text-muted-foreground">View and export your energy consumption data</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database className="h-5 w-5 text-sentinel-primary" />
                Consumption Database
              </CardTitle>
              <CardDescription>
                Detailed energy consumption records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={energyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" name="Energy Usage (kWh)" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Usage Statistics</CardTitle>
              <CardDescription>
                Highest and lowest consumption periods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sentinel-light p-4 rounded">
                  <p className="text-sm text-muted-foreground">Highest Today</p>
                  <p className="text-2xl font-semibold">{consumptionStats.highestToday} kWh</p>
                </div>
                <div className="bg-sentinel-light p-4 rounded">
                  <p className="text-sm text-muted-foreground">Lowest Today</p>
                  <p className="text-2xl font-semibold">{consumptionStats.lowestToday} kWh</p>
                </div>
                <div className="bg-sentinel-light p-4 rounded">
                  <p className="text-sm text-muted-foreground">Limit Set</p>
                  <p className="text-2xl font-semibold">{consumptionStats.limit} kWh</p>
                </div>
                <div className="bg-sentinel-light p-4 rounded">
                  <p className="text-sm text-muted-foreground">Current Usage</p>
                  <p className="text-2xl font-semibold">{consumptionStats.current} kWh</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {consumptionStats.current > consumptionStats.limit 
                    ? "⚠️ You have exceeded your energy consumption limit."
                    : "✅ Your energy consumption is within the set limit."
                  }
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      consumptionStats.current > consumptionStats.limit 
                        ? "bg-sentinel-danger" 
                        : "bg-sentinel-secondary"
                    }`}
                    style={{ width: `${Math.min(100, (consumptionStats.current / consumptionStats.limit) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 kWh</span>
                  <span>{consumptionStats.limit} kWh</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Energy Consumption Data</CardTitle>
            <CardDescription>
              Hourly energy consumption records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Usage (kWh)</TableHead>
                  <TableHead>Predicted (kWh)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {energyData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.timestamp}</TableCell>
                    <TableCell>{record.usage}</TableCell>
                    <TableCell>{record.prediction || '-'}</TableCell>
                    <TableCell>
                      {record.usage > (consumptionStats.limit / 24) 
                        ? <span className="text-sentinel-danger">High</span>
                        : <span className="text-sentinel-secondary">Normal</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataPage;
