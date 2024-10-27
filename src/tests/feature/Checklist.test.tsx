import Checklist from '@/components/feature/Checklist';
import type { Municipality } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Checklist コンポーネント', () => {
  const mockOnChange = jest.fn();

  const municipalities: Municipality[] = [
    {
      municipalityCode: '012025',
      prefectureCode: '01',
      prefectureName: '北海道',
      municipalityName: '函館市',
    },
    {
      municipalityCode: '012033',
      prefectureCode: '01',
      prefectureName: '北海道',
      municipalityName: '小樽市',
    },
    {
      municipalityCode: '012041',
      prefectureCode: '01',
      prefectureName: '北海道',
      municipalityName: '旭川市',
    },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('市区町村のリストが正しく表示される', () => {
    render(<Checklist params={municipalities} onChange={mockOnChange} />);

    // 各市区町村が表示されているか確認
    expect(screen.getByLabelText('函館市')).toBeInTheDocument();
    expect(screen.getByLabelText('小樽市')).toBeInTheDocument();
    expect(screen.getByLabelText('旭川市')).toBeInTheDocument();
  });

  it('チェックボックスの選択が反映される', () => {
    render(<Checklist params={municipalities} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText('函館市');

    // チェックボックスをクリック
    fireEvent.click(checkbox);

    // コールバック関数が呼ばれたか確認
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(municipalities[0]);
  });

  it('選択状態がトグルされる', () => {
    render(<Checklist params={municipalities} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText('函館市');

    // チェックボックスを2回クリックしてトグルを確認
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    // コールバックが2回呼ばれていることを確認
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange.mock.calls[1][0]).toBe(municipalities[0]);
  });
});
