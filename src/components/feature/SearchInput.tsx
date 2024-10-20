import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className='mb-4'>
      <Input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='address-level2'
        className='w-full'
      />
    </div>
  );
}
