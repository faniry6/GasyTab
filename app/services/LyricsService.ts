import axios from 'axios';
import {BaseService, Doc, SongDoc} from './BaseService';
import ChordSheetJS from 'chordsheetjs';
import {Alert} from 'react-native';

export default class LyricsService extends BaseService {
  constructor() {
    super();
    this.name = 'LyricsService';
    this.baseUrl =
      'https://bvbpqj6ug9.execute-api.eu-central-1.amazonaws.com/dev';
  }

  async getSearch(query: string): Promise<Doc[]> {
    const result = await axios.get(this.baseUrl + '/api/v1/search/' + query);
    Alert.alert(query);
    return result.data;
  }

  async getArtistSongs(path: string): Promise<SongDoc[]> {
    const result = await axios.get(this.baseUrl + path + '/songs');
    return result.data;
  }

  async getChordProSong(path: string) {
    const result = await axios.get(this.baseUrl + path);
    return result.data.lyrics;
  }
}
