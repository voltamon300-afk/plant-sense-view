import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MetricBarProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimal: { min: number; max: number };
  icon: LucideIcon;
}

export const MetricBar = ({ 
  title, 
  value, 
  unit, 
  min, 
  max, 
  optimal, 
  icon: Icon
}: MetricBarProps) => {
  const getStatus = () => {
    if (value >= optimal.min && value <= optimal.max) return 'success';
    if (value < min || value > max) return 'destructive';
    return 'warning';
  };

  const getStatusColor = () => {
    const status = getStatus();
    switch (status) {
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'destructive': return 'bg-destructive';
    }
  };

  const getStatusText = () => {
    const status = getStatus();
    switch (status) {
      case 'success': return 'Optimal';
      case 'warning': return 'Caution';
      case 'destructive': return 'Critical';
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-gradient-card rounded-lg border border-border/50 p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              Optimal: {optimal.min} - {optimal.max} {unit}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-card-foreground">
            {value.toFixed(1)} {unit}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            getStatus() === 'success' ? 'bg-success/20 text-success' :
            getStatus() === 'warning' ? 'bg-warning/20 text-warning' :
            'bg-destructive/20 text-destructive'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={Math.max(0, Math.min(100, percentage))} 
          className="h-2"
        />
        <div 
          className="absolute top-0 left-0 h-2 rounded-full opacity-30"
          style={{
            left: `${((optimal.min - min) / (max - min)) * 100}%`,
            width: `${((optimal.max - optimal.min) / (max - min)) * 100}%`,
            backgroundColor: 'hsl(var(--success))'
          }}
        />
      </div>
    </div>
  );
};