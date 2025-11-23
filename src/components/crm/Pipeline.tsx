'use client';

interface PipelineProps {
  data: any[];
}

export function Pipeline({ data }: PipelineProps) {
  const stages = [
    { key: 'lead', label: 'Lead', color: 'bg-gray-200', count: 0, value: 0 },
    { key: 'prospect', label: 'Prospect', color: 'bg-blue-200', count: 0, value: 0 },
    { key: 'qualified', label: 'Qualified', color: 'bg-green-200', count: 0, value: 0 },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-yellow-200', count: 0, value: 0 },
    { key: 'won', label: 'Won', color: 'bg-purple-200', count: 0, value: 0 },
  ];

  // Calcular contagens por estágio
  data?.forEach(lead => {
    const stage = stages.find(s => s.key === lead.status);
    if (stage) {
      stage.count++;
      stage.value += Number(lead.value) || 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {stages.map((stage) => (
        <div key={stage.key} className={`p-4 rounded-lg ${stage.color}`}>
          <h3 className="font-semibold text-center mb-2">{stage.label}</h3>
          <div className="text-center">
            <p className="text-2xl font-bold">{stage.count}</p>
            <p className="text-sm text-gray-600">R$ {stage.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
