import DailyStatistics from '@/components/home/DailyStatistics';
import StatisticalData from '@/components/home/StatisticalData';
import RootLayout from '@/components/layout/RootLayout';

export default function Home() {
  return (
    <RootLayout>
      <StatisticalData />
      <DailyStatistics />
    </RootLayout>
  );
}
