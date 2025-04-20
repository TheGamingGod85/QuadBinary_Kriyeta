
export interface EnergyData {
  timestamp: string;
  usage: number;
  prediction?: number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline';
  consumption: number;
  critical: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface ConsumptionStats {
  current: number;
  previous: number;
  highestToday: number;
  lowestToday: number;
  limit: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
