import React, { useState } from 'react';

export const AnalyticsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const data = {
    '7d': [65, 78, 92, 81, 56, 120, 98],
    '30d': [45, 62, 78, 91, 67, 83, 95, 87, 72, 88, 76, 92, 105, 98, 87, 76, 84, 91, 103, 97, 82, 89, 94, 101, 87, 92, 96, 104, 112, 98],
    '90d': [35, 42, 58, 61, 47, 53, 65, 57, 62, 68, 72, 78, 82, 85, 79, 83, 87, 91, 95, 88, 92, 96, 101, 97, 102, 98, 105, 112, 108, 115]
  };

  const currentData = data[timeRange];
  const maxValue = Math.max(...currentData);
  const labels = timeRange === '7d' ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] :
                Array.from({length: currentData.length}, (_, i) => (i + 1).toString());

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">📈 Analytics em Tempo Real</h3>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg fade-in">
          <p className="text-2xl font-bold text-blue-600">{Math.max(...currentData)}</p>
          <p className="text-sm text-blue-800">Pico de Engajamento</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg fade-in">
          <p className="text-2xl font-bold text-green-600">+{((currentData[currentData.length - 1] - currentData[0]) / currentData[0] * 100).toFixed(1)}%</p>
          <p className="text-sm text-green-800">Crescimento</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg fade-in">
          <p className="text-2xl font-bold text-purple-600">{currentData.reduce((a, b) => a + b, 0).toLocaleString()}</p>
          <p className="text-sm text-purple-800">Total Engajamento</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg fade-in">
          <p className="text-2xl font-bold text-orange-600">{(currentData.reduce((a, b) => a + b, 0) / currentData.length).toFixed(1)}</p>
          <p className="text-sm text-orange-800">Média Diária</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h4 className="font-semibold mb-4 text-gray-800">Engajamento - Últimos {timeRange}</h4>
        <div className="flex items-end justify-between h-48 space-x-1">
          {currentData.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1 group">
              <div
                className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t w-full max-w-8 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 cursor-pointer group-hover:shadow-lg"
                style={{ height: `${(value / maxValue) * 80}%` }}
                title={`${value} engajamentos`}
              ></div>
              <span className="text-xs mt-2 text-gray-600">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
