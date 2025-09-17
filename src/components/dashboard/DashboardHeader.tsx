import { Leaf, Wifi, WifiOff } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  isConnected: boolean;
  lastUpdate: string;
}

export const DashboardHeader = ({ isConnected, lastUpdate }: DashboardHeaderProps) => {
  return (
    <header className="bg-gradient-card border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Greenhouse Monitor
              </h1>
              <p className="text-sm text-muted-foreground">
                Environmental Control Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium text-foreground">{lastUpdate}</p>
            </div>
            
            <Badge 
              variant={isConnected ? "default" : "destructive"}
              className="flex items-center gap-2 px-3 py-1"
            >
              {isConnected ? (
                <Wifi className="h-3 w-3" />
              ) : (
                <WifiOff className="h-3 w-3" />
              )}
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};