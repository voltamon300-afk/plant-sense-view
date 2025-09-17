interface CircularGaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  optimal: { min: number; max: number };
  size?: number;
}

export const CircularGauge = ({ 
  value, 
  min, 
  max, 
  optimal, 
  size = 120 
}: CircularGaugeProps) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = ((value - min) / (max - min)) * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const optimalStart = ((optimal.min - min) / (max - min)) * 100;
  const optimalEnd = ((optimal.max - min) / (max - min)) * 100;
  
  const getColor = () => {
    if (value >= optimal.min && value <= optimal.max) return 'hsl(var(--success))';
    if (value < min || value > max) return 'hsl(var(--destructive))';
    return 'hsl(var(--warning))';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        
        {/* Optimal Range Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--success) / 0.2)"
          strokeWidth="12"
          strokeDasharray={`${(optimalEnd - optimalStart) / 100 * circumference} ${circumference}`}
          strokeDashoffset={circumference - (optimalStart / 100) * circumference}
          className="transition-all duration-700 ease-out"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 8px ${getColor()}40)`
          }}
        />
        
      </svg>
      
      {/* Percentage Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: getColor() }}>
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};