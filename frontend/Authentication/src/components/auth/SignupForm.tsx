
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">Sign up</h2>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/70">Full Name</Label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="bg-white/5 border-white/10 text-white pl-10 placeholder:text-white/30"
            />
            <User className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          </div>
        </div>

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
          <Label htmlFor="phone" className="text-white/70">Contact Number</Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (234) 567-8900"
              className="bg-white/5 border-white/10 text-white pl-10 placeholder:text-white/30"
            />
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white/70">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="bg-white/5 border-white/10 text-white pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-white/50 hover:text-white/80"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" className="rounded bg-white/5 border-white/10" />
          <label htmlFor="terms" className="text-sm text-white/50">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>

        <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
          Sign up
        </Button>

        <div className="text-center">
          <Link to="/login" className="text-sm text-white/50 hover:text-white">
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
