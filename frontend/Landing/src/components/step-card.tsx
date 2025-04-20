
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function StepCard({ number, title, description, icon, className }: StepCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center md:items-start text-center md:text-left",
      "p-6 relative",
      className
    )}>
      <div className="mb-4 relative">
        <div className="absolute -top-3 -left-3 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </div>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
