
import { ChatMessage, ConsumptionStats, Device, EnergyData, UserProfile } from "@/types/dashboard";

export const userProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg"
};

export const energyData: EnergyData[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const baseUsage = 3 + Math.sin(hour / 24 * Math.PI * 2) * 2;
  const usage = Math.max(0.5, baseUsage + Math.random() * 0.5);
  
  return {
    timestamp: `${hour}:00`,
    usage: parseFloat(usage.toFixed(2)),
    prediction: hour > 18 ? undefined : parseFloat((usage * (1 + Math.random() * 0.2 - 0.1)).toFixed(2))
  };
});

export const weeklyEnergyData: EnergyData[] = [
  { timestamp: "Mon", usage: 7.2 },
  { timestamp: "Tue", usage: 6.8 },
  { timestamp: "Wed", usage: 7.5 },
  { timestamp: "Thu", usage: 8.1 },
  { timestamp: "Fri", usage: 7.9 },
  { timestamp: "Sat", usage: 6.5 },
  { timestamp: "Sun", usage: 5.8 }
];

export const devices: Device[] = [
  {
    id: "dev-001",
    name: "Living Room TV",
    type: "Electronics",
    location: "Living Room",
    status: "online",
    consumption: 0.12,
    critical: false
  },
  {
    id: "dev-002",
    name: "Kitchen Refrigerator",
    type: "Appliance",
    location: "Kitchen",
    status: "online",
    consumption: 0.85,
    critical: true
  },
  {
    id: "dev-003",
    name: "Bedroom AC",
    type: "Climate",
    location: "Bedroom",
    status: "online",
    consumption: 1.45,
    critical: false
  },
  {
    id: "dev-004",
    name: "Home Office Computer",
    type: "Electronics",
    location: "Office",
    status: "offline",
    consumption: 0,
    critical: false
  },
  {
    id: "dev-005",
    name: "Water Heater",
    type: "Appliance",
    location: "Bathroom",
    status: "online",
    consumption: 2.1,
    critical: true
  }
];

export const consumptionStats: ConsumptionStats = {
  current: 4.52,
  previous: 5.21,
  highestToday: 8.75,
  lowestToday: 1.25,
  limit: 10
};

export const chatHistory: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "assistant",
    content: "Hello! I'm your Sentinel AI assistant. How can I help you optimize your energy usage today?",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: "msg-2",
    sender: "user",
    content: "Can you tell me which device is using the most energy right now?",
    timestamp: new Date(Date.now() - 3500000)
  },
  {
    id: "msg-3",
    sender: "assistant",
    content: "Currently, your Water Heater is consuming the most energy at 2.1 kWh. Would you like me to suggest ways to optimize its usage?",
    timestamp: new Date(Date.now() - 3400000)
  }
];
