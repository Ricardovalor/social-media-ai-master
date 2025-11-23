import { PredictiveAnalytics } from '@/components/analytics/PredictiveAnalytics';
import { RealTimeAnalytics } from '@/components/analytics/RealTimeAnalytics';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <RealTimeAnalytics />
      <PredictiveAnalytics />
    </div>
  );
}
