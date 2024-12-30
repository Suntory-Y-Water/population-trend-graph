import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Municipality } from '@/types';

type Props = {
  params: Municipality[];
  selectedList: Municipality[]; // 既に選択されている市区町村の一覧
  onChange: (values: Municipality) => void; // 選択された市区町村を親に返すコールバック
};

export default function Checklist({ params, selectedList, onChange }: Props) {
  return (
    <>
      {params.map((municipality) => {
        const isSelected = selectedList.some(
          (m) => m.municipalityCode === municipality.municipalityCode,
        );
        return (
          <div
            key={municipality.municipalityCode}
            className='border flex flex-1 relative flex-row items-start space-x-3 space-y-0 rounded-md p-2'
          >
            <Checkbox
              id={municipality.municipalityCode}
              /**
               * 親からもらった selectedListに含まれているかどうかでチェック状態を制御する
               */
              checked={isSelected}
              onCheckedChange={() => onChange(municipality)}
            />
            <div className='space-y-1 leading-none'>
              <Label htmlFor={municipality.municipalityCode}>{municipality.municipalityName}</Label>
            </div>
          </div>
        );
      })}
    </>
  );
}
