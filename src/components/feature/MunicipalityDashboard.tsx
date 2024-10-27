'use client';
import type { Municipality } from '@/types';
import { useState } from 'react';
import { ChartComponents } from './ChartComponents';
import MunicipalityChecklist from './MunicipalityChecklist';

type Props = {
  params: Municipality[];
};

export default function MunicipalityDashboard({ params }: Props) {
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<Municipality[]>([]);

  // 子コンポーネントで選択された値を受け取る
  function handleSelectChange(value: Municipality[]) {
    setSelectedMunicipalities(value);
  }

  return (
    <>
      <MunicipalityChecklist params={params} onChange={handleSelectChange} />
      {selectedMunicipalities.length > 0 && <ChartComponents params={selectedMunicipalities} />}
    </>
  );
}
