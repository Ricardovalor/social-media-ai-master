'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Zap, TrendingUp } from 'lucide-react';

export function SmartScheduler() {
  const [schedule, setSchedule] = useState({
    date: '',
    time: '',
    platform: 'instagram',
    content: ''
  });

  const optimalTimes = [
    { time: '09:00', engagement: 'Alto', platform: 'Instagram' },
    { time: '12:00', engagement: 'Médio', platform: 'TikTok' },
    { time: '19:00', engagement: 'Alto', platform: 'Todos' },
    { time: '21:00', engagement: 'Máximo', platform: 'Instagram' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Agendar Conteúdo
          </CardTitle>
          <CardDescription>
            Programe seus posts para os melhores horários
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Data</label>
            <input 
              type="date" 
              value={schedule.date}
              onChange={(e) => setSchedule({...schedule, date: e.target.value})}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Horário</label>
            <input 
              type="time" 
              value={schedule.time}
              onChange={(e) => setSchedule({...schedule, time: e.target.value})}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Plataforma</label>
            <select 
              value={schedule.platform}
              onChange={(e) => setSchedule({...schedule, platform: e.target.value})}
              className="w-full mt-1 p-2 border rounded-md"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Conteúdo</label>
            <textarea 
              value={schedule.content}
              onChange={(e) => setSchedule({...schedule, content: e.target.value})}
              placeholder="Digite o conteúdo do post..."
              className="w-full mt-1 p-2 border rounded-md h-24"
            />
          </div>
          
          <Button className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Agendar Post
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Horários Otimizados
          </CardTitle>
          <CardDescription>
            Melhores horários baseados no seu engajamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimalTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-medium">{time.time}</p>
                    <p className="text-sm text-gray-600">{time.platform}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  time.engagement === 'Máximo' ? 'bg-green-100 text-green-800' :
                  time.engagement === 'Alto' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {time.engagement}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800">💡 Dica Profissional</h4>
            <p className="text-sm text-blue-700 mt-1">
              Posts entre 19h e 21h têm 47% mais engajamento no Instagram
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
