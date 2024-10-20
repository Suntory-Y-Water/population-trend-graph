import SelectPrefecture from '@/components/feature/SelectPrefecture';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// mock
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('SelectPrefecture コンポーネント', () => {
  const mockReplace = jest.fn();

  const selectItems = {
    items: [
      { value: '北海道', label: '北海道' },
      { value: '青森県', label: '青森県' },
      { value: '岩手県', label: '岩手県' },
    ],
    placeholder: '都道府県を選択...',
    selectLabel: '都道府県',
  };

  beforeEach(() => {
    // モック関数をリセット
    mockReplace.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('初期状態でプレースホルダーが表示されている', () => {
    render(<SelectPrefecture params={selectItems} />);

    expect(screen.getByText('都道府県を選択...')).toBeInTheDocument();
  });

  it('ドロップダウンの選択肢が表示される', () => {
    render(<SelectPrefecture params={selectItems} />);

    // ドロップダウンをクリック
    fireEvent.click(screen.getByText(selectItems.placeholder));

    // 選択肢の確認
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('青森県')).toBeInTheDocument();
    expect(screen.getByText('岩手県')).toBeInTheDocument();
  });

  it('都道府県を選択すると、クエリパラメータが更新される', () => {
    render(<SelectPrefecture params={selectItems} />);

    // ドロップダウンをクリック
    fireEvent.click(screen.getByText(selectItems.placeholder));

    // 「青森県」を選択
    fireEvent.click(screen.getByText('青森県'));

    const encodedPrefecture = encodeURIComponent('青森県');

    // クエリパラメータが更新されたか確認
    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining(`/?prefecture=${encodedPrefecture}`),
    );
    expect(mockReplace).toHaveBeenCalledTimes(1);
  });
});
