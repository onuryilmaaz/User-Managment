import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  timeLeft: number;
  formattedTime: string;
  isExpired: boolean;
  className?: string;
}

export function CountdownTimer({ 
  timeLeft, 
  formattedTime, 
  isExpired, 
  className 
}: CountdownTimerProps) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-sm",
      isExpired ? "text-red-500" : timeLeft < 60 ? "text-orange-500" : "text-muted-foreground",
      className
    )}>
      <Clock className="h-4 w-4" />
      <span>
        {isExpired 
          ? "Kod süresi doldu" 
          : `Kod süresi: ${formattedTime}`
        }
      </span>
    </div>
  );
}