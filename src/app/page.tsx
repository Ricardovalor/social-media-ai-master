import { PerformanceDashboard } from '@/components/dashboard/PerformanceDashboard';

export default function Home() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Principal
        </h1>
        <p className="text-gray-600">
          Visão geral do desempenho das suas redes sociais
        </p>
      </div>

      <PerformanceDashboard />
    </div>
  );
}
