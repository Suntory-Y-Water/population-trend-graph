'use clinet';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectPopulationItems } from '@/types';

type Props = {
  params: SelectPopulationItems;
  onChange: (value: string) => void;
};

export default function SelectPopulation({ params, onChange }: Props) {
  return (
    <Select onValueChange={onChange}>
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
