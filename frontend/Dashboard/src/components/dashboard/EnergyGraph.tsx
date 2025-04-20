import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function EnergyGraph() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:9090/api/energy-usage')
      .then(res => res.json())
      .then(res => {
        const formatted = res.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          power_kW: (item.power_usage / 1000).toFixed(3),
        }));
        setData(formatted);
      })
      .catch(error => {
        console.error("Error fetching energy usage data:", error);
      });
  }, [timeRange]);

  const currentUsage = data.reduce((sum, item) => sum + parseFloat(item.power_kW || 0), 0).toFixed(2);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#022F40] font-poppins">Energy Usage</h2>
          <p className="text-[#022F40]/70 text-lg">Total: {currentUsage} kW</p>
        </div>
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range as any)}
              className="bg-[#022F40] text-white hover:bg-[#022F40]/90"
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#022F40" strokeOpacity={0.1} />
            <XAxis dataKey="timestamp" stroke="#022F40" tick={{ fill: '#022F40', opacity: 0.7 }} />
            <YAxis unit=" kW" stroke="#022F40" tick={{ fill: '#022F40', opacity: 0.7 }} />
            <Tooltip
              formatter={(value: number) => [`${value} kW`, 'Usage']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '1rem',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#022F40" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#022F40" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="power_kW"
              name="Actual Power"
              stroke="#022F40"
              fill="url(#colorUsage)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
