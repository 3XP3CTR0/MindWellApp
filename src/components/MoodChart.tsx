import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { MoodEntry } from '../types';
import { moods } from '../data';

interface MoodChartProps {
  moodHistory: MoodEntry[];
}

const MoodChart = ({ moodHistory }: MoodChartProps) => {
  const getChartData = () => {
    if (moodHistory.length === 0) return [];
    
    return moodHistory.slice(-14).map((entry) => ({
      day: new Date(entry.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      mood: entry.score,
      label: moods[entry.mood]?.label,
      emoji: moods[entry.mood]?.emoji,
      note: entry.note || ''
    }));
  };

  const data = getChartData();
    
  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Registre seu humor por alguns dias para ver o gráfico</p>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis 
            domain={[1, 8]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748b' }}
            ticks={[1, 2, 3, 4, 5, 6, 7, 8]}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload[0]) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{data.emoji}</span>
                      <span className="text-sm font-medium">{data.label}</span>
                    </div>
                    {data.note && (
                      <p className="text-xs text-gray-600 mt-1 italic">"{data.note}"</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="mood" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fill="url(#moodGradient)"
          />
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="w-4 h-2 bg-green-400 rounded mx-auto mb-1"></div>
          <span className="text-gray-600">Ótimo (7-8)</span>
        </div>
        <div className="text-center">
          <div className="w-4 h-2 bg-blue-400 rounded mx-auto mb-1"></div>
          <span className="text-gray-600">Bom (5-6)</span>
        </div>
        <div className="text-center">
          <div className="w-4 h-2 bg-yellow-400 rounded mx-auto mb-1"></div>
          <span className="text-gray-600">Regular (3-4)</span>
        </div>
        <div className="text-center">
          <div className="w-4 h-2 bg-red-400 rounded mx-auto mb-1"></div>
          <span className="text-gray-600">Baixo (1-2)</span>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;
