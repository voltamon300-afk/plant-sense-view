import { useState, useEffect } from 'react';
import { Droplets, Beaker, Wind, Sun, Zap, Lightbulb, Fan } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { MetricBar } from './MetricBar';
import { ActuatorCard } from './ActuatorCard';

// Mock data generator for environmental metrics
const generateMockData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      soilMoisture: 35 + Math.random() * 30 + Math.sin(i * 0.1) * 10,
      soilPH: 6.2 + Math.random() * 1.6 + Math.sin(i * 0.15) * 0.3,
      co2: 380 + Math.random() * 240 + Math.sin(i * 0.2) * 50,
      lightIntensity: Math.max(0, 40 + Math.sin(i * 0.3) * 45 + Math.random() * 20)
    });
  }
  
  return data;
};

export const GreenhouseDashboard = () => {
  const [historicalData, setHistoricalData] = useState(generateMockData());
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  
  // Actuator states
  const [actuators, setActuators] = useState({
    irrigationPump: false,
    uvLamp: true,
    ventilationFan: false
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData(generateMockData());
      setLastUpdate(new Date().toLocaleTimeString());
      
      // Occasionally simulate connection issues
      if (Math.random() < 0.05) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 3000);
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const currentData = historicalData[historicalData.length - 1];

  const handleActuatorToggle = (actuatorKey: keyof typeof actuators) => {
    setActuators(prev => ({
      ...prev,
      [actuatorKey]: !prev[actuatorKey]
    }));
  };

  const metrics = [
    {
      title: 'Soil Moisture',
      value: currentData?.soilMoisture || 0,
      unit: '%',
      min: 0,
      max: 100,
      optimal: { min: 40, max: 70 },
      icon: Droplets,
      color: 'success' as const,
      trend: historicalData.map(d => ({ time: d.time, value: d.soilMoisture }))
    },
    {
      title: 'Soil pH',
      value: currentData?.soilPH || 0,
      unit: 'pH',
      min: 4.0,
      max: 9.0,
      optimal: { min: 6.0, max: 7.5 },
      icon: Beaker,
      color: 'warning' as const,
      trend: historicalData.map(d => ({ time: d.time, value: d.soilPH }))
    },
    {
      title: 'CO₂ Concentration',
      value: currentData?.co2 || 0,
      unit: 'ppm',
      min: 300,
      max: 800,
      optimal: { min: 400, max: 600 },
      icon: Wind,
      color: 'success' as const,
      trend: historicalData.map(d => ({ time: d.time, value: d.co2 }))
    },
    {
      title: 'Light Intensity',
      value: currentData?.lightIntensity || 0,
      unit: 'klux',
      min: 0,
      max: 100,
      optimal: { min: 20, max: 80 },
      icon: Sun,
      color: 'warning' as const,
      trend: historicalData.map(d => ({ time: d.time, value: d.lightIntensity }))
    }
  ];

  const actuatorList = [
    {
      title: 'Irrigation Pump',
      key: 'irrigationPump' as const,
      isOn: actuators.irrigationPump,
      icon: Zap,
      description: 'Automated water distribution system'
    },
    {
      title: 'UV Lamp',
      key: 'uvLamp' as const,
      isOn: actuators.uvLamp,
      icon: Lightbulb,
      description: 'Supplemental growing light source'
    },
    {
      title: 'Ventilation Fan',
      key: 'ventilationFan' as const,
      isOn: actuators.ventilationFan,
      icon: Fan,
      description: 'Air circulation and temperature control'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <DashboardHeader isConnected={isConnected} lastUpdate={lastUpdate} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Environmental Overview
          </h2>
          <p className="text-muted-foreground">
            Real-time monitoring of greenhouse conditions for optimal plant growth
          </p>
        </div>

        {/* Environmental Metrics - Horizontal Bar Layout */}
        <div className="space-y-4 mb-8">
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

        {/* Actuators Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Actuator Controls
          </h2>
          <p className="text-muted-foreground mb-6">
            Monitor and control greenhouse automation systems
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {actuatorList.map((actuator) => (
              <div key={actuator.key} className="flex-1 min-w-[280px] max-w-[320px]">
                <ActuatorCard
                  title={actuator.title}
                  isOn={actuator.isOn}
                  onToggle={() => handleActuatorToggle(actuator.key)}
                  icon={actuator.icon}
                  description={actuator.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-12 bg-gradient-card rounded-lg border border-border/50 shadow-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">98.5%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Active Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">2</div>
              <div className="text-sm text-muted-foreground">Alerts Today</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};