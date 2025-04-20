
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300",
      "border border-gray-100 hover:border-primary/20",
      "flex flex-col items-center md:items-start text-center md:text-left",
      "animate-fade-in",
      className
    )}>
      <div className="mb-4 text-primary p-3 bg-primary/10 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
