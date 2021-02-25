import axios from 'axios';
import {Alert} from 'react-native';
import {BaseService, Doc, SongDoc} from './BaseService';

export default class CommunityTabService extends BaseService {
  constructor() {
    super();
    this.name = 'GasyMpiTab';
    this.baseUrl =
      'https://u9uolhl94e.execute-api.eu-central-1.amazonaws.com/dev';
    this.id = 0;
  }

  async getSearch(query: string): Promise<Doc[]> {
    const result = await axios.get(this.baseUrl + '/api/v1/search/' + query);
    return result.data;
  }

  async getArtistSongs(path: string): Promise<SongDoc[]> {
    const result = await axios.get(this.baseUrl + path + '/songs');
    return result.data;
  }

  async getChordProSong(path: string) {
    const result = await axios.get(this.baseUrl + path);
    return result.data.chordPro;
  }

  postSong(content: string) {
    axios
      .post(this.baseUrl + '/api/v1/songs', content)
      .then(function(response) {
        console.log(response);
      });
    return true;
  }

  async getLyricsSongs(path: string) {
    const result = await axios.get(this.baseUrl + path);
    return result.data.lyrics;
  }

  async getAllSong(): Promise<SongDoc[]> {
    const result = await axios.get(this.baseUrl + '/api/v1/community/songs');
    return result.data;
  }
}
