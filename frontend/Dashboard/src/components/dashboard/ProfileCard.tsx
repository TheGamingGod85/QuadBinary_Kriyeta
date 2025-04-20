import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { userProfile } from "@/data/mockData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export function ProfileCard() {
  const handleSignOut = () => {
    // Add any cleanup logic here (e.g., clearing local storage, cookies, etc.)
    window.location.href = "https://sentinel-login-forge.vercel.app/";
  };

  return (
    <div className="bg-[#e8f5e9]/60 backdrop-blur-xl rounded-[2rem] border border-[#4caf50]/20 shadow-[0_8px_32px_rgba(76,175,80,0.08)] hover:shadow-[0_8px_32px_rgba(76,175,80,0.12)] transition-all duration-500">
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#022F40] font-poppins mb-2">User Profile</h2>
          <p className="text-[#022F40]/70">Manage your account details</p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-[#022F40]/10 flex items-center justify-center border border-white/20 shadow-[0_4px_16px_rgba(2,47,64,0.08)]">
              <User className="h-12 w-12 text-[#022F40]" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#022F40] font-medium">Name</Label>
              <Input 
                id="name" 
                defaultValue={userProfile.name}
                className="bg-white/50 border-[#4caf50]/20 focus:border-[#022F40]/20 rounded-xl h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#022F40] font-medium">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={userProfile.email}
                className="bg-white/50 border-[#4caf50]/20 focus:border-[#022F40]/20 rounded-xl h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#022F40] font-medium">Password</Label>
              <Input 
                id="password" 
                type="password" 
                defaultValue="********"
                className="bg-white/50 border-[#4caf50]/20 focus:border-[#022F40]/20 rounded-xl h-11"
              />
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                variant="ghost"
                onClick={handleSignOut}
                className="bg-white/50 text-[#022F40]/80 hover:bg-red-50 hover:text-red-600 border border-[#4caf50]/20 hover:border-red-200 rounded-xl transition-all duration-300 flex items-center gap-2 px-4 py-2 min-w-[120px]"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
              <Button 
                className="bg-[#022F40] text-white hover:bg-[#022F40]/90 rounded-xl px-6 transition-all duration-300"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
