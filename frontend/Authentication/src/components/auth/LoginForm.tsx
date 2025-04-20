
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">Log in</h2>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/70">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="bg-white/5 border-white/10 text-white pl-10 placeholder:text-white/30"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/70">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-white/5 border-white/10 text-white pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/50 hover:text-white/80"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded bg-white/5 border-white/10" />
            <label htmlFor="remember" className="text-sm text-white/50">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-white/50 hover:text-white">
            Forgot password?
          </a>
        </div>

        <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
          Log in
        </Button>

        <div className="text-center">
          <Link to="/" className="text-sm text-white/50 hover:text-white">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
