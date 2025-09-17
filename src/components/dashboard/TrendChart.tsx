import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts';

interface TrendChartProps {
  data: Array<{ time: string; value: number }>;
  color: 'success' | 'warning' | 'destructive';
}

export const TrendChart = ({ data, color }: TrendChartProps) => {
  const getStrokeColor = () => {
    switch (color) {
      case 'success': return 'hsl(var(--success))';
      case 'warning': return 'hsl(var(--warning))';
      case 'destructive': return 'hsl(var(--destructive))';
    }
  };

  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getStrokeColor()}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: getStrokeColor() }}
            className="drop-shadow-sm"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};