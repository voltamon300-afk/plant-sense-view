import { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { MicroGreenhouseCard } from './MicroGreenhouseCard';

// Plant types for different micro greenhouses
const PLANT_TYPES = ['Tomato', 'Lettuce', 'Basil', 'Strawberry'];

// Mock data generator for micro greenhouses
const generateMicroGreenhouseData = () => {
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    plantType: PLANT_TYPES[index],
    soilMoisture: 35 + Math.random() * 30 + Math.sin(index * 0.1) * 10,
    soilPH: 6.2 + Math.random() * 1.6 + Math.sin(index * 0.15) * 0.3,
    co2: 380 + Math.random() * 240 + Math.sin(index * 0.2) * 50,
    lightIntensity: Math.max(0, 40 + Math.sin(index * 0.3) * 45 + Math.random() * 20),
    actuators: {
      irrigationPump: Math.random() > 0.5,
      uvLamp: Math.random() > 0.3,
      ventilationFan: Math.random() > 0.6
    }
  }));
};

export const GreenhouseDashboard = () => {
  const [microGreenhouses, setMicroGreenhouses] = useState(generateMicroGreenhouseData());
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMicroGreenhouses(generateMicroGreenhouseData());
      setLastUpdate(new Date().toLocaleTimeString());
      
      // Occasionally simulate connection issues
      if (Math.random() < 0.05) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 3000);
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleActuatorToggle = (id: number, actuatorKey: string) => {
    setMicroGreenhouses(prev => 
      prev.map(greenhouse => 
        greenhouse.id === id 
          ? {
              ...greenhouse,
              actuators: {
                ...greenhouse.actuators,
                [actuatorKey]: !greenhouse.actuators[actuatorKey as keyof typeof greenhouse.actuators]
              }
            }
          : greenhouse
      )
    );
  };

  // Calculate overall system stats
  const totalSensors = microGreenhouses.length * 4; // 4 sensors per micro greenhouse
  const activeActuators = microGreenhouses.reduce((count, gh) => 
    count + Object.values(gh.actuators).filter(Boolean).length, 0
  );
  const alertsToday = microGreenhouses.filter(gh => 
    gh.soilMoisture < 40 || gh.soilMoisture > 70 || 
    gh.soilPH < 6.0 || gh.soilPH > 7.5
  ).length;

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <DashboardHeader isConnected={isConnected} lastUpdate={lastUpdate} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Micro Greenhouse Management System
          </h2>
          <p className="text-muted-foreground">
            Individual monitoring and control for 4 micro plantations with specialized growing conditions
          </p>
        </div>

        {/* Micro Greenhouses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {microGreenhouses.map((greenhouse) => (
            <MicroGreenhouseCard
              key={greenhouse.id}
              data={greenhouse}
              onActuatorToggle={handleActuatorToggle}
            />
          ))}
        </div>

        {/* System Status */}
        <div className="bg-gradient-card rounded-lg border border-border/50 shadow-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            System Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">98.5%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalSensors}</div>
              <div className="text-sm text-muted-foreground">Total Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{activeActuators}</div>
              <div className="text-sm text-muted-foreground">Active Actuators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{alertsToday}</div>
              <div className="text-sm text-muted-foreground">Alerts Today</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};