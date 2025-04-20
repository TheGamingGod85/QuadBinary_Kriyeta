
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">Sign up</h2>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/70">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="alexey@yandex.ru"
              className="sentinel-glass placeholder:text-white/30"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/70">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="sentinel-glass pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/50 hover:text-white/80"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" className="rounded bg-white/5 border-white/10" />
          <label htmlFor="terms" className="text-sm text-white/50">
            I agree to the all statements in Terms of service
          </label>
        </div>
        <Button className="w-full sentinel-gradient-btn">
          Sign up
        </Button>
        <div className="text-center">
          <Link to="/login" className="text-sm text-white/50 hover:text-white">
            Have an account?
          </Link>
        </div>
        <div className="text-center">
          <Link to="/forgot-password" className="text-sm text-white/50 hover:text-white">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
