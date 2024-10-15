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
import type {
  ChartParams,
  Municipality,
  MunicipalityName,
  Population,
  SelectPopulationItems,
} from '@/types';
import { useState } from 'react';
import SelectPopulation from './select-population';

export const description = 'A multiple line chart';

const colorPalette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const selectPopulationParams: SelectPopulationItems = {
  items: [
    {
      value: 'totalPopulation',
      label: '総人口',
    },
    {
      value: 'youngPopulation',
      label: '幼年人口',
    },
    {
      value: 'working_population',
      label: '生産年齢人口',
    },
    {
      value: 'elderlyPopulation',
      label: '老年人口',
    },
  ],
  placeholder: '人口データを選択',
  selectLabel: '人口データ',
};

function aggregateByYear(
  municipalities: Municipality[],
  populations: Population[],
  selectedPopulation: string,
) {
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
      (muni) => muni.municipalityCode === population.municipalityCode,
    );

    if (municipality) {
      switch (selectedPopulation) {
        case 'totalPopulation':
          yearEntry[municipality.municipalityName] =
            population.youngPopulation +
            population.workingPopulation +
            population.elderlyPopulation;
          break;
        case 'youngPopulation':
          yearEntry[municipality.municipalityName] = population.youngPopulation;
          break;
        case 'working_population':
          yearEntry[municipality.municipalityName] = population.workingPopulation;
          break;
        case 'elderlyPopulation':
          yearEntry[municipality.municipalityName] = population.elderlyPopulation;
          break;
      }
    }
  }

  // 要素を年の昇順に並び替え
  result.sort((a, b) => a.year - b.year);

  return result;
}

function createChartConfig(selectedMunicipalities: MunicipalityName[]): ChartConfig {
  return selectedMunicipalities.reduce((config, municipalityName, index) => {
    const color = colorPalette[index];
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
  const [selectedValue, setSelectedValue] = useState<string>('');

  const chartParams: ChartParams[] = aggregateByYear(params, populations, selectedValue);
  const selectedMunicipalities = extractMunicipalityNames(chartParams);
  const chartParamsConfig = createChartConfig(selectedMunicipalities);

  // 子コンポーネントで選択された値を受け取るコールバック関数
  function handleSelectChange(value: string) {
    setSelectedValue(value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>人口推移グラフ</CardTitle>
      </CardHeader>
      <CardContent>
        <SelectPopulation params={selectPopulationParams} onChange={handleSelectChange} />
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
            {selectedMunicipalities.map((municipalityName, index) => (
              <Line
                key={municipalityName}
                dataKey={municipalityName}
                type='monotone'
                stroke={colorPalette[index % colorPalette.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
