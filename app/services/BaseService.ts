export interface ArtistDoc {
  name: string;
  path: string;
  type: 'artist';
}
export interface SongDoc {
  title: string;
  artist: string;
  lyricist: string;
  chordSheet: string;
  path: string;
  type: 'song';
  lyrics: string;
}
export type Doc = ArtistDoc | SongDoc;

export abstract class BaseService {
  name!: string;
  baseUrl!: string;
  searchUrl!: string;
  id!: number;
  constructor() {}
  abstract async getSearch(query: string): Promise<Doc[]>;
  abstract async getArtistSongs(path: string): Promise<SongDoc[]>;
  abstract async getChordProSong(path: string): Promise<string>;
  abstract postSong(content: string): boolean;
  // abstract async getLyricsSongs(path: string): Promise<string>;
  abstract async getAllSong(): Promise<SongDoc[]>;
}
