export interface Character {
  id: string;
  name: string;
  house: string;
  status: 'alive' | 'dead';
  bio: string;
  actor: string;
  motto: string;
  sigil: string;
  image: any;
}

export interface Moment {
  id: string;
  title: string;
  number: string;
  season: string;
  detail: string;
  image: any;
  videoId: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // Index of correct option
}

export interface QuizCategory {
  id: string;
  title: string;
  icon: string;
  questions: QuizQuestion[];
}

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined; // Drawer navigator
};

export type DrawerParamList = {
  Home: undefined;
  Characters: undefined; // Stack
  Moments: undefined; // Stack
  About: undefined;
  Game: undefined;
  Contact: undefined;
  Settings: undefined;
};

export type CharactersStackParamList = {
  CharactersList: undefined;
  CharacterDetail: { character: Character };
};

export type MomentsStackParamList = {
  MomentsList: undefined;
  MomentDetail: { moment: Moment };
};
