'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { ConmoboxProps } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
  params: ConmoboxProps;
};

export function ComboboxComponents({ params }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value ? params.items.find((param) => param.value === value)?.label : params.buttonLabel}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={params.placeholder} />
          <CommandList>
            <CommandEmpty>{params.notFoundMessage}</CommandEmpty>
            <CommandGroup>
              {params.items.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    handleSelect(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
