
import { Shield } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import SocialLinks from "@/components/SocialLinks";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden sentinel-bg">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sentinel-lightGreen/20 to-sentinel-green/50">
          <img
            src={`/lovable-uploads/3f9e3d69-3685-4c33-a9e4-972acdb48f13.png`}
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 p-12 flex flex-col h-full">
          <div className="flex items-center space-x-2 text-white">
            <Shield className="w-6 h-6" />
            <span className="text-xl font-semibold">SentinelAI</span>
          </div>
          <div className="flex-1 flex flex-col justify-end pb-20">
            <h1 className="text-4xl font-bold text-white mb-4">
              Forgot your password?
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-md">
              Don't worry! Reset your password in a few easy steps.
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[500px] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
