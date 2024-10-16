'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectItems } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  params: SelectItems;
};

export default function SelectPrefecture({ params }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 現在選択している値をクエリパラメータに設定する
  function handleSelect(currentValue: string) {
    const params = new URLSearchParams(searchParams);
    params.set('prefecture', currentValue);
    // 都道府県をクエリパラメータに設定
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={params.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{params.selectLabel}</SelectLabel>
          {params.items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
