
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn(
      "py-16 md:py-24",
      className
    )}>
      <div className="max-w-sm mx-auto flex items-center justify-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </div>
  );
}
