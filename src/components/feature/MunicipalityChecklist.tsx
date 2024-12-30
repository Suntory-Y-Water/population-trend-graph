import { Button } from '@/components/ui/button';
import type { Municipality } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Checklist from './Checklist';
import SearchInput from './SearchInput';

type Props = {
  params: Municipality[];
  onChange: (values: Municipality[]) => void;
};

export default function MunicipalityChecklist({ params, onChange }: Props) {
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
    setCurrentIndex(20);
  }

  function handleShowMore() {
    setCurrentIndex(currentIndex + 20);
  }

  // 選択された市区町村が変わったとき親に通知
  useEffect(() => {
    onChange(selectedMunicipalities);
  }, [selectedMunicipalities, onChange]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // 都道府県が変わったら選択状態をリセット
    setSelectedMunicipalities([]);
    setSearchMunicipalities('');
  }, [searchParams.get('prefecture')]);

  function handleCheckboxChange(municipality: Municipality) {
    setSelectedMunicipalities((prevSelected) => {
      if (prevSelected.some((m) => m.municipalityCode === municipality.municipalityCode)) {
        return prevSelected.filter((m) => m.municipalityCode !== municipality.municipalityCode);
      }
      return [...prevSelected, municipality];
    });
  }

  return (
    <div>
      <SearchInput
        value={searchMunicipalities}
        onChange={handleInputChange}
        placeholder='市区町村を検索...'
      />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        <Checklist
          params={displayedMunicipalities}
          selectedList={selectedMunicipalities}
          onChange={handleCheckboxChange}
        />
      </div>
      {showMore && (
        <Button variant='default' className='mt-4 w-full' onClick={handleShowMore}>
          市区町村を読み込む...
        </Button>
      )}
    </div>
  );
}
