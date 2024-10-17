'use client';
import { Input } from '@/components/ui/input';
import type { Municipality } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ChartComponents } from './line-chart';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type Props = {
  params: Municipality[];
};

export default function ChartData({ params }: Props) {
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<Municipality[]>([]);
  const [searchMunicipalities, setSearchMunicipalities] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(20);

  const searchParams = useSearchParams();

  const filteredMunicipalities = useMemo(
    () =>
      params.filter((param) =>
        param.municipalityName.toLowerCase().includes(searchMunicipalities.toLowerCase()),
      ),
    [searchMunicipalities, params],
  );

  const displayedMunicipalities = useMemo(
    () => filteredMunicipalities.slice(0, currentIndex),
    [filteredMunicipalities, currentIndex],
  );

  const showMore = useMemo(
    () =>
      (searchMunicipalities === '' ? params.length : filteredMunicipalities.length) > currentIndex,
    [searchMunicipalities, params.length, filteredMunicipalities.length, currentIndex],
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchMunicipalities(value);
    setCurrentIndex(10);
  }

  function handleShowMore() {
    setCurrentIndex(currentIndex + 10);
  }

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
      <div className='mb-4'>
        <Input
          type='text'
          name='municipality'
          value={searchMunicipalities}
          onChange={handleInputChange}
          placeholder='市区町村を検索...'
          autoComplete='address-level2'
          className='w-full'
        />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {displayedMunicipalities.map((municipality) => {
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
      {showMore && (
        <Button variant='default' className='mt-4 w-full' onClick={handleShowMore}>
          市区町村を読み込む...
        </Button>
      )}
      {selectedMunicipalities.length > 0 && <ChartComponents params={selectedMunicipalities} />}
    </div>
  );
}
