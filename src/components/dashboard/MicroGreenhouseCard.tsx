import { useState } from 'react';
import { Droplets, Beaker, Wind, Sun, Zap, Lightbulb, Fan, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MetricBar } from './MetricBar';
import { ActuatorCard } from './ActuatorCard';

interface MicroGreenhouseData {
  id: number;
  plantType: string;
  soilMoisture: number;
  soilPH: number;
  co2: number;
  lightIntensity: number;
  actuators: {
    irrigationPump: boolean;
    uvLamp: boolean;
    ventilationFan: boolean;
  };
}

interface MicroGreenhouseCardProps {
  data: MicroGreenhouseData;
  onActuatorToggle: (id: number, actuatorKey: keyof MicroGreenhouseData['actuators']) => void;
}

export const MicroGreenhouseCard = ({ data, onActuatorToggle }: MicroGreenhouseCardProps) => {
  const metrics = [
    {
      title: 'Soil Moisture',
      value: data.soilMoisture,
      unit: '%',
      min: 0,
      max: 100,
      optimal: { min: 40, max: 70 },
      icon: Droplets
    },
    {
      title: 'Soil pH',
      value: data.soilPH,
      unit: 'pH',
      min: 4.0,
      max: 9.0,
      optimal: { min: 6.0, max: 7.5 },
      icon: Beaker
    },
    {
      title: 'CO₂',
      value: data.co2,
      unit: 'ppm',
      min: 300,
      max: 800,
      optimal: { min: 400, max: 600 },
      icon: Wind
    },
    {
      title: 'Light',
      value: data.lightIntensity,
      unit: 'klux',
      min: 0,
      max: 100,
      optimal: { min: 20, max: 80 },
      icon: Sun
    }
  ];

  const actuatorList = [
    {
      title: 'Pump',
      key: 'irrigationPump' as const,
      isOn: data.actuators.irrigationPump,
      icon: Zap,
      description: 'Water system'
    },
    {
      title: 'UV Lamp',
      key: 'uvLamp' as const,
      isOn: data.actuators.uvLamp,
      icon: Lightbulb,
      description: 'Light source'
    },
    {
      title: 'Fan',
      key: 'ventilationFan' as const,
      isOn: data.actuators.ventilationFan,
      icon: Fan,
      description: 'Air circulation'
    }
  ];

  // Calculate overall health status
  const getHealthStatus = () => {
    const inOptimalRange = metrics.filter(metric => 
      metric.value >= metric.optimal.min && metric.value <= metric.optimal.max
    ).length;
    
    if (inOptimalRange === 4) return { status: 'Excellent', color: 'bg-success/20 text-success' };
    if (inOptimalRange >= 3) return { status: 'Good', color: 'bg-warning/20 text-warning' };
    return { status: 'Needs Attention', color: 'bg-destructive/20 text-destructive' };
  };

  const health = getHealthStatus();

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/20 text-primary">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">
                Micro Greenhouse #{data.id}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {data.plantType}
              </p>
            </div>
          </div>
          <Badge className={health.color}>
            {health.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Environmental Metrics */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Environmental Conditions</h4>
          <div className="space-y-2">
            {metrics.map((metric) => (
              <MetricBar
                key={metric.title}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                min={metric.min}
                max={metric.max}
                optimal={metric.optimal}
                icon={metric.icon}
              />
            ))}
          </div>
        </div>

        {/* Actuator Controls */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Controls</h4>
          <div className="grid grid-cols-1 gap-3">
            {actuatorList.map((actuator) => (
              <ActuatorCard
                key={actuator.key}
                title={actuator.title}
                isOn={actuator.isOn}
                onToggle={() => onActuatorToggle(data.id, actuator.key)}
                icon={actuator.icon}
                description={actuator.description}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};