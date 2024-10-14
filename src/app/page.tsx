'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  Title as ChartTitle,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { municipalities, populations, prefecture } from '@/db';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
);

// populationType の型をリテラル型にする
type PopulationType = 'total' | 'youth' | 'working' | 'elderly';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]); // 型を修正
  const [populationType, setPopulationType] = useState<PopulationType>('total');
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [chartData, setChartData] = useState<any>({});

  const regionCodeMap: { [key: string]: string } = prefecture.reduce(
    (map, region) => {
      map[region.prefecture_code] = region.prefecture_name;
      return map;
    },
    {} as { [key: string]: string },
  );

  const municipalitiesCodeMap: { [key: string]: string } = municipalities.reduce(
    (map, region) => {
      map[region.municipality_code] = region.municipality_name;
      return map;
    },
    {} as { [key: string]: string },
  );

  const populationData: {
    [region: string]: {
      [municipality: string]: {
        total: number[];
        youth: number[];
        working: number[];
        elderly: number[];
      };
    };
  } = populations.reduce(
    (acc, population) => {
      const prefectureCode = population.municipality_code.slice(0, 2);
      const prefectureName = regionCodeMap[prefectureCode];
      const municipalityName = municipalitiesCodeMap[population.municipality_code];

      if (prefectureName && municipalityName) {
        if (!acc[prefectureName]) {
          acc[prefectureName] = {};
        }
        if (!acc[prefectureName][municipalityName]) {
          acc[prefectureName][municipalityName] = {
            total: [],
            youth: [],
            working: [],
            elderly: [],
          };
        }

        acc[prefectureName][municipalityName].total.push(
          population.young_population +
            population.working_age_population +
            population.elderly_population,
        );
        acc[prefectureName][municipalityName].youth.push(population.young_population);
        acc[prefectureName][municipalityName].working.push(population.working_age_population);
        acc[prefectureName][municipalityName].elderly.push(population.elderly_population);
      }

      return acc;
    },
    {} as {
      [region: string]: {
        [municipality: string]: {
          total: number[];
          youth: number[];
          working: number[];
          elderly: number[];
        };
      };
    },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedRegion && selectedMunicipalities.length > 0) {
      updateChartData();
    } else {
      setChartData({});
    }
  }, [selectedRegion, selectedMunicipalities, populationType]);

  function updateChartData() {
    const labels = ['2019', '2020', '2021', '2022', '2023', '2024'];
    const regionName = regionCodeMap[selectedRegion];

    const datasets = selectedMunicipalities.map((municipality: string) => {
      // populationType は 'total' | 'youth' | 'working' | 'elderly' のいずれか
      const data = populationData[regionName][municipality][populationType];
      return {
        label: `${municipality}の${
          populationType === 'total'
            ? '総人口'
            : populationType === 'youth'
              ? '年少人口'
              : populationType === 'working'
                ? '生産年齢人口'
                : '老年人口'
        }`,
        data: data,
        borderColor: getRandomColor(),
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        fill: false,
      };
    });

    setChartData({
      labels,
      datasets,
    });
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }

  return (
    <div>
      <section className='mb-5 bg-white p-4 rounded shadow'>
        <label htmlFor='region-select' className='font-bold'>
          地域を選択してください：
        </label>
        <select
          id='region-select'
          className='mt-2 p-2 text-base border rounded'
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setSelectedMunicipalities([]);
          }}
        >
          <option value=''>地域を選択</option>
          {prefecture.map((region) => {
            return (
              <option key={region.prefecture_code} value={region.prefecture_code}>
                {region.prefecture_name}
              </option>
            );
          })}
        </select>
        {selectedRegion && (
          <div id='municipality-container' className='mt-4'>
            <label htmlFor='municipality-select' className='font-bold'>
              市区町村を選択してください：
            </label>
            <div id='municipality-select' className='mt-2 border border-gray-400 p-2 rounded'>
              {municipalities
                .filter((municipality) => municipality.prefecture_code === selectedRegion)
                .map((municipality) => (
                  <label key={municipality.municipality_code} className='block'>
                    <input
                      type='checkbox'
                      value={municipality.municipality_name}
                      checked={selectedMunicipalities.includes(municipality.municipality_name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMunicipalities([
                            ...selectedMunicipalities,
                            municipality.municipality_name,
                          ]);
                        } else {
                          setSelectedMunicipalities(
                            selectedMunicipalities.filter(
                              (m) => m !== municipality.municipality_name,
                            ),
                          );
                        }
                      }}
                      className='mr-2'
                    />
                    {municipality.municipality_name}
                  </label>
                ))}
            </div>
            <label htmlFor='population-type-select' className='font-bold mt-4 block'>
              人口タイプを選択してください：
            </label>
            <select
              id='population-type-select'
              className='mt-2 p-2 text-base border rounded'
              value={populationType}
              onChange={(e) => setPopulationType(e.target.value as PopulationType)}
            >
              <option value='total'>総人口</option>
              <option value='youth'>年少人口</option>
              <option value='working'>生産年齢人口</option>
              <option value='elderly'>老年人口</option>
            </select>
          </div>
        )}
      </section>
      <section className='graph-section mb-5 bg-white p-4 rounded shadow'>
        <h2 className='text-xl font-bold mb-4'>人口動態グラフ</h2>
        <div id='chart-container'>
          {chartData.datasets && chartData.datasets.length > 0 ? (
            <Line
              data={chartData}
              options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
            />
          ) : (
            <p className='text-gray-500'>
              グラフを表示するには、地域と市区町村を選択してください。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
