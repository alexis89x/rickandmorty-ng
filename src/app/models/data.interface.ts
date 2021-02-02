export interface RMCharacter {
  name: string;
}

export interface RMApiInfoResult {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface RMApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RMApiResult {
  info: RMApiInfoResult;
  results: RMApiCharacter[];
}

export interface RMApiEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
