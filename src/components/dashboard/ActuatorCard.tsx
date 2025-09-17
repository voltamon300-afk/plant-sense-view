import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface ActuatorCardProps {
  title: string;
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  icon: LucideIcon;
  description: string;
}

export const ActuatorCard = ({ 
  title, 
  isOn, 
  onToggle, 
  icon: Icon, 
  description 
}: ActuatorCardProps) => {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full transition-colors duration-300 ${
              isOn ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-card-foreground">
                {title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            </div>
          </div>
          <Badge 
            variant={isOn ? 'default' : 'secondary'}
            className={isOn ? 'bg-success/20 text-success border-success/30' : ''}
          >
            {isOn ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Status Control
          </span>
          <Switch
            checked={isOn}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </CardContent>
    </Card>
  );
};