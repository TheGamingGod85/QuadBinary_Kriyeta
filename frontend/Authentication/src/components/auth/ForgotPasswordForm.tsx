
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <div className="w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold tracking-tight text-white">Reset Password</h2>
        <p className="text-sm text-white/50">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/70">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="sentinel-glass pl-10 placeholder:text-white/30"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          </div>
        </div>

        <Button className="w-full sentinel-gradient-btn">
          Send Reset Instructions
        </Button>

        <div className="text-center space-y-2">
          <Link to="/login" className="text-sm text-white/50 hover:text-white block">
            Remember your password? Log in
          </Link>
          <Link to="/" className="text-sm text-white/50 hover:text-white block">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
