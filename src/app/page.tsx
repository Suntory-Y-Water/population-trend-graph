export const runtime = 'edge';
import MunicipalityDashboard from '@/components/feature/MunicipalityDashboard';
import SelectPrefecture from '@/components/feature/SelectPrefecture';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { municipalities, prefecture } from '@/db';
import type { Municipality, SelectItems } from '@/types';

type Props = {
  searchParams?: {
    prefecture?: string;
  };
};

export default function Home({ searchParams }: Props) {
  const query = searchParams?.prefecture || '';
  const selectPrefectureParams: SelectItems = {
    items: prefecture.map((pref) => ({
      value: pref.prefectureName,
      label: pref.prefectureName,
    })),
    placeholder: '都道府県を選択...',
    selectLabel: '都道府県',
  };

  const selectedMunicipalities: Municipality[] = municipalities.filter(
    (municipality) => municipality.prefectureName === query,
  );

  return (
    <div className='w-full px-2 sm:px-8 md:px-16 lg:px-32 xl:px-72 py-8'>
      <Card>
        <CardHeader>
          <CardTitle>比較したい都道府県と市区町村を選択</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='pb-4'>
            <SelectPrefecture params={selectPrefectureParams} />
          </div>
          {/* <ChartData params={selectedMunicipalities} /> */}
          <MunicipalityDashboard params={selectedMunicipalities} />
        </CardContent>
      </Card>
    </div>
  );
}
