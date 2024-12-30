import MunicipalityChecklist from '@/components/feature/MunicipalityChecklist';
import type { Municipality } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import type { Mock } from 'vitest';

// mock
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('MunicipalityChecklist バグ修正テスト', () => {
  const mockReplace = vi.fn();
  const mockParams: Municipality[] = [
    {
      municipalityCode: '022011',
      prefectureCode: '02',
      prefectureName: '青森県',
      municipalityName: '青森市',
    },
    {
      municipalityCode: '022029',
      prefectureCode: '02',
      prefectureName: '青森県',
      municipalityName: '弘前市',
    },
    {
      municipalityCode: '022037',
      prefectureCode: '02',
      prefectureName: '青森県',
      municipalityName: '八戸市',
    },
  ];

  beforeEach(() => {
    // モック関数をリセット
    mockReplace.mockClear();
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
  });

  it('「あ」を入力後に削除して「青森市」を入力しても、青森市のチェックが外れずにグラフが描画されること', () => {
    render(<MunicipalityChecklist params={mockParams} onChange={() => {}} />);

    // 1. 「青森市」のチェックボックスをクリック => チェックがつく
    fireEvent.click(screen.getByLabelText('青森市'));

    // 2. 検索欄に「あ」と入力 => 表示から「青森市」が消える想定
    const input = screen.getByPlaceholderText('市区町村を検索...');
    fireEvent.change(input, { target: { value: 'あ' } });
    expect(screen.queryByLabelText('青森市')).toBeNull();

    // 3. 検索欄をクリアして「青森市」と再入力 => 「青森市」が再表示される
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: '青森市' } });

    // 4. 再表示された「青森市」がチェック済みになっていることを確認
    //    Radix UI のチェックボックスは input要素ではなく、aria-checked や data-state で判断する
    const aomoriCheckbox = screen.getByLabelText('青森市');
    expect(aomoriCheckbox).toBeInTheDocument();
    // aria-checked が "true" になっていればチェック済み
    expect(aomoriCheckbox).toHaveAttribute('aria-checked', 'true');
  });
});
