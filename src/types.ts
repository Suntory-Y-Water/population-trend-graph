import type { municipalities, populations } from './db';

export type MunicipalityName = (typeof municipalities)[number]['municipalityName'];

export type Municipality = (typeof municipalities)[number];

export type Population = (typeof populations)[number];

// yearとMunicipalityNameを動的にキーとする型
export type ChartParams = {
  year: number;
} & {
  [key in MunicipalityName]?: number; // 各市区町村の人口データは任意で数値
};

export type SelectItems = {
  items: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  selectLabel: string;
};
