import ChartData from '@/components/chart-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComboboxComponents } from '@/components/ui/combobox';
import { municipalities, prefecture } from '@/db';
import type { ConmoboxProps, Municipality } from '@/types';

type Props = {
  searchParams?: {
    prefecture?: string;
  };
};

export default function Home({ searchParams }: Props) {
  const query = searchParams?.prefecture || '';
  const prefecturesCombobox: ConmoboxProps = {
    items: prefecture.map((pref) => ({
      value: pref.prefectureName,
      label: pref.prefectureName,
    })),
    buttonLabel: '都道府県を選択...',
    placeholder: '東京都...',
    notFoundMessage: '都道府県が見つかりません',
  };

  const selectedMunicipalities: Municipality[] = municipalities.filter(
    (municipality) => municipality.prefectureName === query,
  );

  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72 py-8'>
      <ComboboxComponents params={prefecturesCombobox} />
      <Card>
        <CardHeader>
          <CardTitle>比較したい市区町村を選択してください</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartData params={selectedMunicipalities} />
        </CardContent>
      </Card>
    </div>
  );
}
