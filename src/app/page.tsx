import DailyStatistics from '@/components/home/DailyStatistics';
import StatisticalData from '@/components/home/StatisticalData';
import VaccinationPointRegion from '@/components/home/VaccinationPointRegion';
import RootLayout from '@/components/layout/RootLayout';

export default function Home() {
  return (
    <RootLayout>
      <StatisticalData />
      <DailyStatistics />
      <VaccinationPointRegion />
    </RootLayout>
  );
}
