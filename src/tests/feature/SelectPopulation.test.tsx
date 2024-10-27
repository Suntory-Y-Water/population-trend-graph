import SelectPopulation from '@/components/feature/SelectPopulation';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SelectPopulation コンポーネント', () => {
  // mock
  const mockOnChange = jest.fn();

  const selectItems = {
    items: [
      { value: 'totalPopulation', label: '総人口' },
      { value: 'youngPopulation', label: '幼年人口' },
      { value: 'workingPopulation', label: '生産年齢人口' },
      { value: 'elderlyPopulation', label: '老年人口' },
    ],
    placeholder: '総人口',
    selectLabel: '人口データ',
  };

  beforeEach(() => {
    // 各テスト前にコールバックをリセット
    mockOnChange.mockClear();
  });

  it('初期状態でプレースホルダーが表示されている', () => {
    render(<SelectPopulation params={selectItems} onChange={mockOnChange} />);

    expect(screen.getByText('総人口')).toBeInTheDocument();
  });

  it('ドロップダウンの選択肢が表示される', () => {
    render(<SelectPopulation params={selectItems} onChange={mockOnChange} />);

    // ドロップダウンをクリック
    fireEvent.click(screen.getByText('総人口'));

    // 選択肢の確認
    expect(screen.getByText('幼年人口')).toBeInTheDocument();
    expect(screen.getByText('生産年齢人口')).toBeInTheDocument();
    expect(screen.getByText('老年人口')).toBeInTheDocument();
  });

  it('選択した値がコールバック関数に渡される', () => {
    render(<SelectPopulation params={selectItems} onChange={mockOnChange} />);

    // ドロップダウンをクリック
    fireEvent.click(screen.getByText('総人口'));

    // 「生産年齢人口」を選択
    fireEvent.click(screen.getByText('生産年齢人口'));

    // コールバック関数が呼ばれたか確認

    // 呼び出した際の引数の確認
    expect(mockOnChange).toHaveBeenCalledWith('workingPopulation');
    // モック関数が期待した回数だけ呼ばれたことを確認する
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
