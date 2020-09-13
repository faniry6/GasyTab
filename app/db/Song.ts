import uuid from 'uuid';
import { Artist } from './Artist';
//import allSongs from '../assets/chordpro/songs.json';
import ChordSheetJS from 'chordsheetjs';
import { SongBundle } from './bundler';
import realm from '.';

export class Song {
  id!: string;
  title!: string;
  content!: string;
  artist!: Artist;
  transposeAmount?: number | null;
  fontSize?: number | null;
  showTablature?: boolean;
  updated_at!: Date;
  lyricist!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Song',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      content: 'string',
      transposeAmount: 'int?',
      fontSize: 'int?',
      showTablature: 'bool?',
      artist: { type: 'Artist' },
      updated_at: 'date',
      lyricist: 'string',
    },
  };
  static search(query: string) {
    return realm
      .objects<Song>('Song')
      .filtered('title CONTAINS[c] $0 OR artist.name CONTAINS[c] $0', query);
  }
  static getById(id: string) {
    return realm.objectForPrimaryKey<Song>('Song', id);
  }
  static getByArtist(artistId: string) {
    return realm
      .objects<Song>('Song')
      .filtered('artist.id = $0', artistId)
      .sorted('title');
  }
  static getByCategory(id: string) { }
  // static shouldUpdateDb() {
  //   let s = this.getAll().find(() => true);
  //   let newSongsDate = new Date(allSongs.updated_at);
  //   if (s == null) return true;
  //   else return newSongsDate > s.updated_at;
  // }
  // static populateDb() {
  //   if (this.shouldUpdateDb()) {
  //     for (var i = 0; i < allSongs.data.length; i++) {
  //       let s: string = allSongs.data[i];
  //       const parser = new ChordSheetJS.ChordProParser();
  //       const formatter = new ChordSheetJS.ChordProFormatter();
  //       const parsedSong = parser.parse(s);
  //       let artistName = parsedSong.getMetaData('artist')!;
  //       let songTitle = parsedSong.getMetaData('title')!;
  //       let lyricist = parsedSong.getMetaData('lyricist')!;
  //       let songContent = formatter.format(parsedSong);

  //       let artist: Artist | undefined = Artist.getByName(artistName);
  //       if (artist == null) {
  //         artist = Artist.create(artistName);
  //       }
  //       // let artist = Artist.create(artistName)
  //       Song.create(artist, songTitle, lyricist, songContent);
  //     }
  //   }
  // }

  static getAll() {
    return realm.objects<Song>('Song').sorted('title');
  }
  static getChordPro(song: Song) {
    let headerlessContent = song.content;

    // headerlessContent = headerlessContent.replace(/{title:(.*)}\n/g, '')
    // headerlessContent = headerlessContent.replace(/{artist:(.*)}\n/g, '')
    // headerlessContent = headerlessContent.replace(/{lyricist:(.*)}\n/g, '')
    headerlessContent = headerlessContent.replace(/{artist:[^}]*}\s\n/g, '');
    headerlessContent = headerlessContent.replace(/{title:[^}]*}\s\n/g, '');
    headerlessContent = headerlessContent.replace(/{lyricist:[^}]*}\s\n/g, '');
    let header =
      `{title: ${song.title}}\n` +
      `{artist: ${song.artist.name}}\n` +
      `{lyricist: ${song.lyricist}}\n`;
    return header + headerlessContent;
  }
  static create(
    artist: Artist,
    title: string,
    lyricist: string,
    content: string,
    id?: string,
  ) {
    if (id == null) {
      id = uuid();
    } else if (Song.getById(id)) {
      throw new Error('Song id already exists');
    }

    if (title == null || title == '') {
      throw new Error(`Aiza ny lohatenin'ny hira?`);
    }
    if (content == null || content == '') {
      throw new Error(`Aiza ny tononkira?`);
    }

    if (lyricist == null || lyricist == '') {
      lyricist = '';
    }

    let song: Song | undefined;
    song = realm
      .objects<Song>('Song')
      .filtered('title = $0 && artist.name = $1', title, artist.name)
      .find(() => true);
    if (song == null) {
      realm.write(() => {
        song = realm.create<Song>('Song', {
          id,
          title,
          content,
          artist,
          updated_at: new Date(),
          lyricist,
        });
      });
    } else {
      // TODO: Enable multiple versions of same song
    }
    return song!;
  }
  static update(
    id: string,
    artist: Artist,
    title: string,
    lyricist: string,
    content: string,
  ) {
    if (title == null || title == '') {
      throw new Error(`Empty title not allowed`);
    }
    if (content == null || content == '') {
      throw new Error(`Empty content not allowed`);
    }
    let song = Song.getById(id);
    if (song != null) {
      realm.write(() => {
        song!.title = title;
        song!.artist = artist;
        song!.content = content;
        song!.updated_at = new Date();
        song!.lyricist = lyricist;
      });
    } else {
      throw new Error(`Song not found`);
    }
    return song!;
  }
  static delete(id: string) {
    realm.write(() => {
      let song = Song.getById(id);
      let artistId = song!.artist.id!;
      realm.delete(song);
      if (Song.getByArtist(artistId).length <= 0) {
        realm.delete(Artist.getById(artistId));
      }
    });
  }
  static setPreferences(
    song: Song,
    preferences: {
      showTablature?: boolean;
      fontSize?: number | null;
      transposeAmount?: number | null;
    },
  ) {
    let {
      showTablature = song.showTablature,
      fontSize = song.fontSize,
      transposeAmount = song.transposeAmount,
    } = preferences;
    realm.write(() => {
      song.showTablature = showTablature;
      song.fontSize = fontSize;
      song.transposeAmount = transposeAmount;
    });
  }
  static toBundle(song: Song): SongBundle {
    return {
      id: song.id,
      title: song.title,
      content: song.content,
      artist: song.artist.name,
      transposeAmount: song.transposeAmount,
      fontSize: song.fontSize,
      showTablature: song.showTablature != null ? song.showTablature : true,
      updated_at: song.updated_at.toJSON(),
      lyricist: song.lyricist,
    };
  }
}
