'use client';
import type { Municipality } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChartComponents } from './line-chart';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type Props = {
  params: Municipality[];
};

export default function ChartData({ params }: Props) {
  // 選択された市区町村を管理するステート
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<Municipality[]>([]);

  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setSelectedMunicipalities([]);
  }, [searchParams.get('prefecture')]);

  // チェックボックスが変更されたときの処理
  function handleCheckboxChange(municipality: Municipality) {
    setSelectedMunicipalities((prevSelected) => {
      // 既に選択されている場合は削除、されていない場合は追加
      if (prevSelected.some((m) => m.municipalityCode === municipality.municipalityCode)) {
        return prevSelected.filter((m) => m.municipalityCode !== municipality.municipalityCode);
      }
      return [...prevSelected, municipality];
    });
  }

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {params.map((municipality) => {
          const isChecked = selectedMunicipalities.some(
            (m) => m.municipalityCode === municipality.municipalityCode,
          );
          return (
            <div
              key={municipality.municipalityCode}
              className='border flex flex-1 relative flex-row items-start space-x-3 space-y-0 rounded-md p-2'
            >
              <Checkbox
                id={municipality.municipalityCode}
                checked={isChecked}
                onCheckedChange={() => handleCheckboxChange(municipality)}
              />
              <div className='space-y-1 leading-none'>
                <Label htmlFor={municipality.municipalityCode}>
                  {municipality.municipalityName}
                </Label>
              </div>
            </div>
          );
        })}
      </div>
      {selectedMunicipalities.length > 0 && <ChartComponents params={selectedMunicipalities} />}
    </div>
  );
}
