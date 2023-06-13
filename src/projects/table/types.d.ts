export interface artefactResponce {
  name: string;
  date: string;
  duration: number;
  confidence: number;
  path: string;
  content: string[];
}

export type typeArtType = "all" | "Ошибка" | "Артефакт"; // ошибка - если есть только error.log, артефакт - если не пусто и не error.log, all - если пусто или ошибка + артефакт

export interface tableDataType {
  key: React.Key;
  name: string;
  date: string;
  duration: number;
  confidence: number;
  path: string;
  content: string[];
  seconds: number;
  camera: string;
  typeArt: "all" | "Ошибка" | "Артефакт";
  evaluation: string;
}

export interface countEvaluationType {
  TP: number;
  TN: number;
}

export type filtertype = {
  text: string;
  value: string | number;
};
