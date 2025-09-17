import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { CircularGauge } from "./CircularGauge";
import { TrendChart } from "./TrendChart";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimal: { min: number; max: number };
  icon: LucideIcon;
  color: 'success' | 'warning' | 'destructive';
  trend: Array<{ time: string; value: number }>;
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  min, 
  max, 
  optimal, 
  icon: Icon, 
  color,
  trend 
}: MetricCardProps) => {
  const getStatus = () => {
    if (value >= optimal.min && value <= optimal.max) return 'success';
    if (value < min || value > max) return 'destructive';
    return 'warning';
  };

  const getStatusText = () => {
    const status = getStatus();
    switch (status) {
      case 'success': return 'Optimal';
      case 'warning': return 'Caution';
      case 'destructive': return 'Critical';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
          </div>
          <Badge 
            variant={getStatus() === 'success' ? 'default' : getStatus() === 'warning' ? 'secondary' : 'destructive'}
            className="text-xs font-medium"
          >
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Gauge Section */}
        <div className="flex justify-center">
          <CircularGauge 
            value={value}
            min={min}
            max={max}
            unit={unit}
            optimal={optimal}
            size={140}
          />
        </div>
        
        {/* Current Value */}
        <div className="text-center">
          <div className="text-3xl font-bold text-card-foreground">
            {value.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">{unit}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Optimal: {optimal.min} - {optimal.max} {unit}
          </div>
        </div>
        
        {/* Trend Chart */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-card-foreground mb-3">24h Trend</h4>
          <TrendChart data={trend} color={getStatus()} />
        </div>
      </CardContent>
    </Card>
  );
};