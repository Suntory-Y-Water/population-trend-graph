'use client';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { populations } from '@/db';
import type { ChartParams, Municipality, MunicipalityName, Population } from '@/types';

export const description = 'A multiple line chart';

const colorPalette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

function aggregateByYear(municipalities: Municipality[], populations: Population[]) {
  const result: ChartParams[] = [];

  for (const population of populations) {
    // 対象の年のエントリがあるか確認
    let yearEntry = result.find((entry) => entry.year === population.year);

    // 年がまだない場合、新しい年のエントリを作成
    if (!yearEntry) {
      yearEntry = { year: population.year };
      result.push(yearEntry);
    }

    // 対象の市区町村名を取得して人口データを追加
    const municipality = municipalities.find(
      (muni) => muni.municipality_code === population.municipality_code,
    );

    if (municipality) {
      yearEntry[municipality.municipality_name] = population.young_population;
    }
  }

  // 要素を年の昇順に並び替え
  result.sort((a, b) => a.year - b.year);

  return result;
}

function createChartConfig(selectedMunicipalities: MunicipalityName[]): ChartConfig {
  return selectedMunicipalities.reduce((config, municipalityName, index) => {
    // 5色を循環させる
    const color = colorPalette[index % colorPalette.length];
    config[municipalityName] = {
      label: municipalityName,
      color: color,
    };
    return config;
  }, {} as ChartConfig);
}

function extractMunicipalityNames(params: ChartParams[]): MunicipalityName[] {
  const municipalityNames = new Set<MunicipalityName>();

  for (const param of params) {
    for (const key in param) {
      if (key !== 'year') {
        // 'year'以外を市区町村名として扱う
        municipalityNames.add(key as MunicipalityName);
      }
    }
  }
  return Array.from(municipalityNames);
}

type Props = {
  params: Municipality[];
};

export function ChartComponents({ params }: Props) {
  const chartParams: ChartParams[] = aggregateByYear(params, populations);
  const selectedMunicipalities = extractMunicipalityNames(chartParams);
  const chartParamsConfig = createChartConfig(selectedMunicipalities);

  return (
    <Card>
      <CardHeader>
        <CardTitle>人口推移グラフ</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartParamsConfig}>
          <LineChart
            accessibilityLayer
            data={chartParams}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis dataKey='year' tickLine={false} axisLine={false} tickMargin={4} />
            <YAxis tickLine={false} axisLine={false} tickMargin={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey={'none'} />} />
            {selectedMunicipalities.map((municipalityName, index) => {
              return (
                <Line
                  key={municipalityName}
                  dataKey={municipalityName}
                  type='monotone'
                  stroke={colorPalette[index % colorPalette.length]}
                  strokeWidth={2}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
