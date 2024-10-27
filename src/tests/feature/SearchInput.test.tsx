import SearchInput from '@/components/feature/SearchInput';
import { render, screen } from '@testing-library/react';

describe('SearchInput コンポーネント', () => {
  const mockOnChange = vi.fn();

  const placeholderText = '市区町村を検索...';

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('プレースホルダーが表示されている', () => {
    render(<SearchInput value='' onChange={mockOnChange} placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it('初期値が正しく表示される', () => {
    render(<SearchInput value='東京' onChange={mockOnChange} placeholder={placeholderText} />);

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toHaveValue('東京');
  });
});
