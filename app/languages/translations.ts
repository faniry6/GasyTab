export const languages = ['mg_md', 'en_us'] as const;
export const sentences = [
  'language_name',
  'language_english_name',
  'language',
  'settings',
  'playlists',
  'online_search',
  'artists',
  'lyricist_name',
  'songs',
  'preview',
  'add_songs',
  'edit_song',
  'edit',
  'delete',
  'go_to_online_search',
  'go_to_artist',
  'share',
  'create_new_playlist',
  'you_havent_created_any_playlist_yet',
  'you_havent_downloaded_any_song_yet',
  'you_havent_added_any_song_to_this_playlist_yet',
  'search',
  'create',
  'playlist_name',
  'playlist_edit',
  'create_backup',
  'create_backup_description',
  'import',
  'import_description',
  'invalid_title',
  'invalid_artist',
  'invalid_content',
  'song_title',
  'artist_name',
  'chords_over_lyrics',
  'auto_scroll',
  'show_tabs',
  'page_turner',
  'playlists_not_found',
  'close',
  'info',
  'playlist_saved',
  'share_message',
  'empty_name_not_allowed',
  'artist_or_song_not_found',
  'permission_title',
  'permission_message',
  'permission_button_negative',
  'permission_button_positive',
  'permission_denied',
  'success',
  'backup_saved_at_path',
  'songs_imported_successfully',
  'song_downloaded',
  'text_size',
  'show_tabs_by_default',
  'hide_tabs_by_default',
  'enable_page_turner_by_default',
  'disable_page_turner_by_default',
  'sort_by_title',
  'sort_by_artist',
  'custom_sort',
  'developed_by',
  'home',
  'online_search_not_available',
  'transpose',
  'add_to_playlist',
  'error',
  'invalid_file',
  'you_can_still_create_songs_manually',
  'create_song',
  'invalid_lyricist',
  'this_is_work_in_progress',
  'not_sharable_song',
  'not_sharable_playlist',
  'song_edit',
  'lyrics',
  'online_service',
  'upload_to_gasytab',
] as const;
export type SentenceID = typeof sentences[number];
export type LanguageID = typeof languages[number];
export type Translation = Record<SentenceID, string>;
export type Languages = Record<LanguageID, Translation>;

const translations: Languages = {
  en_us: {
    language_name: 'English',
    language_english_name: 'English',
    language: 'Language',
    settings: 'Settings',
    playlists: 'Playlists',
    artists: 'Artists',
    online_search: 'Online Search',
    songs: 'Songs',
    preview: 'Preview',
    add_songs: 'Add songs',
    edit_song: 'Edit Song',
    edit: 'Edit',
    delete: 'Delete',
    go_to_online_search: 'Go to Online Search',
    go_to_artist: 'Go To Artist',
    share: 'Share',
    create_new_playlist: 'Create New Playlist',
    you_havent_created_any_playlist_yet: "You haven't created any playlist yet",
    you_havent_downloaded_any_song_yet: "You haven't downloaded any song yet",
    you_havent_added_any_song_to_this_playlist_yet:
      "You haven't added any song to this playlist yet",
    search: 'Search',
    create: 'Create',
    playlist_name: 'Playlist name',
    playlist_edit: 'Playlist Edit',
    create_backup: 'Create Backup',
    create_backup_description:
      'Pack all songs and playlists into a .gasytab file',
    import: 'Import',
    import_description: 'Backups, Playlists and .gasytab files',
    artist_name: 'Artist Name',
    lyricist_name: 'Lyricist Name',
    chords_over_lyrics: 'Chords over Lyrics',
    invalid_artist: 'Invalid Artist',
    invalid_content: 'Invalid Content',
    invalid_title: 'Invalid Title',
    song_title: 'Song Title',
    auto_scroll: 'Auto Scroll',
    page_turner: 'Page-Turner',
    playlists_not_found: 'Playlists not found',
    show_tabs: 'Show Tablature',
    close: 'Close',
    info: 'Info',
    playlist_saved: 'Playlist saved',
    share_message:
      'Download GasyTab app, go to Settings > Import and select this file',
    empty_name_not_allowed: 'Empty name not allowed',
    artist_or_song_not_found: 'Artist or song not found',
    permission_title: 'Open Chord App Storage Permission',
    permission_message:
      'Open Chord App needs access to your storage so you can save your backups.',
    permission_button_positive: 'OK',
    permission_button_negative: 'Cancel',
    permission_denied: 'Write store permission denied',
    success: 'Success',
    backup_saved_at_path: 'Backup saved at path',
    songs_imported_successfully: 'Songs imported successfully',
    song_downloaded: 'Song downloaded',
    text_size: 'Font',
    show_tabs_by_default: 'Show tabs by default',
    hide_tabs_by_default: 'Hide tabs by default',
    enable_page_turner_by_default: 'Enable page turner by default',
    disable_page_turner_by_default: 'Disable page turner by default',
    sort_by_title: 'Sort by title',
    sort_by_artist: 'Sort by artist',
    custom_sort: 'Custom sort',
    developed_by: 'Developed by',
    home: 'Home',
    online_search_not_available:
      'Sorry, ONLINE SEARCH is not available for IOS yet',
    transpose: 'Transpose',
    add_to_playlist: 'Add to playlist',
    error: 'Error',
    invalid_file: 'Invalid file',
    you_can_still_create_songs_manually: 'You can still create songs manually',
    create_song: 'Create song',
    invalid_lyricist: 'Invalid lyricist',
    this_is_work_in_progress: 'This is a work in progress',
    not_sharable_song: 'This file belongs to GasyTab, sharing is prohibited',
    not_sharable_playlist:
      'Your playlist contains a GasyTab song, please remove it then share again',
    song_edit: 'Add/Edit Song',
    lyrics: 'Lyrics',
    online_service: 'Service',
    upload_to_gasytab: 'upload to gasytab',
  },
  // pt_br: {
  //   language_name: 'Português (Brasil)',
  //   language_english_name: 'Portuguese (Brazil)',
  //   language: 'Idioma',
  //   settings: 'Configurações',
  //   playlists: 'Playlists',
  //   artists: 'Artistas',
  //   online_search: 'Busca Online',
  //   songs: 'Músicas',
  //   preview: 'Pré-visualização',
  //   add_songs: 'Adicionar Músicas',
  //   edit_song: 'Editar Música',
  //   edit: 'Editar',
  //   lyricist_name: 'Lyricist Name',
  //   delete: 'Remover',
  //   go_to_online_search: 'Ir para Busca Online',
  //   go_to_artist: 'Ir para Artista',
  //   share: 'Compartilhar',
  //   create_new_playlist: 'Criar nova Playlist',
  //   you_havent_created_any_playlist_yet:
  //     'Você não criou nenhuma playlist ainda',
  //   you_havent_downloaded_any_song_yet: 'Você não baixou nenhuma música ainda',
  //   you_havent_added_any_song_to_this_playlist_yet:
  //     'Você ainda não adicionou nenhuma música para essa playlist',
  //   search: 'Busca',
  //   create: 'Criar',
  //   playlist_name: 'Nome da Playlist',
  //   playlist_edit: 'Editar Playlist',
  //   create_backup: 'Criar Backup',
  //   create_backup_description:
  //     'Empacota todas as músicas e playlists em um arquivo .gasytab',
  //   import: 'Importar',
  //   import_description: 'Backups, Playlist e arquivos .gasytab',
  //   artist_name: 'Nome do Artista',
  //   chords_over_lyrics: 'Acordes acima da letra',
  //   invalid_artist: 'Artista inválido',
  //   invalid_title: 'Título inválido',
  //   invalid_content: 'Conteúdo inválido',
  //   song_title: 'Título da Música',
  //   auto_scroll: 'Rolagem automática',
  //   page_turner: 'Passa-páginas',
  //   playlists_not_found: 'Playlists não encontradas',
  //   show_tabs: 'Mostrar tablaturas',
  //   close: 'Fechar',
  //   info: 'Aviso',
  //   playlist_saved: 'Playlist salva',
  //   share_message:
  //     'Baixe o aplicativo GasyTab, vá para Settings > Import e selecione este arquivo',
  //   empty_name_not_allowed: 'Nome vazio não permitido',
  //   artist_or_song_not_found: 'Artista ou Música não encontrada',
  //   permission_title: 'Permissão de Armazenamento do Open Chord App',
  //   permission_message:
  //     'Open Chord App precisa acessar seu armazenamento para salvar seus backups.',
  //   permission_button_positive: 'OK',
  //   permission_button_negative: 'Cancelar',
  //   permission_denied: 'Permissão de armazenamento negada',
  //   success: 'Sucesso',
  //   backup_saved_at_path: 'Backup salvo no caminho',
  //   songs_imported_successfully: 'Músicas importadas com sucesso',
  //   song_downloaded: 'Música baixada',
  //   text_size: 'Tamanho do texto',
  //   show_tabs_by_default: 'Mostrar tablaturas por padrão',
  //   hide_tabs_by_default: 'Esconder tablaturas por padrão',
  //   enable_page_turner_by_default: 'Ativar passa-páginas por padrão',
  //   disable_page_turner_by_default: 'Desativar passa-páginas por padrão',
  //   sort_by_title: 'Ordenar por título',
  //   sort_by_artist: 'Ordenar por artista',
  //   custom_sort: 'Classificação personalizada',
  //   developed_by: 'Desenvolvido por',
  //   home: 'Início',
  //   online_search_not_available:
  //     'Desculpe, a BUSCA ONLINE ainda não está disponivel para IOS',
  //   transpose: 'Mudar tom',
  //   add_to_playlist: 'Adicionar a playlist',
  //   error: 'Erro',
  //   invalid_file: 'Arquivo inválido',
  //   you_can_still_create_songs_manually:
  //     'Você ainda pode criar músicas manualmente',
  //   create_song: 'Criar música',
  //   invalid_lyricist: 'Invalid lyricist',
  // },
  mg_md: {
    language_name: 'Malagasy',
    language_english_name: 'Malagasy',
    language: 'Fiteny',
    settings: 'Kirakira',
    playlists: 'Lisitra',
    artists: 'Mpihira',
    lyricist_name: "Anaran'ny mpampiditra",
    online_search: 'Hitady Tranokala',
    songs: 'Hira',
    preview: 'Jerena',
    add_songs: 'Hampina hira',
    edit_song: 'Hovaina/Hampiditra hira',
    edit: 'Hovaina',
    delete: 'Esorina',
    go_to_online_search: 'Hijery tranokala',
    go_to_artist: 'Mpihira',
    share: 'Zaraina',
    create_new_playlist: 'Anamboatra Lisitra',
    you_havent_created_any_playlist_yet: 'Mbola tsy namboatra lisitra enao',
    you_havent_downloaded_any_song_yet: "Mbola tsy misy hira amin'ny lisitra",
    you_havent_added_any_song_to_this_playlist_yet:
      "Mbola tsy nanampy hira tamin'ny lisitra enao",
    search: 'Hitady Mpihira',
    create: 'Hamboatra',
    playlist_name: 'Anarana lisitra',
    playlist_edit: 'Ovaina lisitra',
    create_backup: 'Hamboatra tahiry (backup)',
    create_backup_description: 'Hira sy lisitra atao .gasytab',
    import: 'Hampiditra tahiry (backup)',
    import_description: 'Hira sy Lisitra',
    artist_name: 'Anarana Mpihira',
    chords_over_lyrics: 'Akoro + Tononkira',
    invalid_artist: 'Tsy manankery mpihira',
    invalid_content: 'Tsy manankery hira',
    invalid_title: 'Tsy mety lohateny',
    song_title: 'Lohateny Hira',
    auto_scroll: 'Auto',
    page_turner: 'Pejy',
    playlists_not_found: 'Tsy hita lisitra',
    show_tabs: 'Tab',
    close: 'Hidina',
    info: 'Info',
    error: 'Erreur',
    invalid_file: 'Tsy manakery ny fichier anao',
    playlist_saved: 'Votahiry lisitra',
    share_message:
      'Miarahaba anao\n\nAlaivo GasyTab app, mandehana  Kirakira > Hampiditra safidio ny .gasytab-nao\n\nMankasitraka\n\nGasyTab Team',
    empty_name_not_allowed: 'Tsy misy anarana tsy mety',
    artist_or_song_not_found: 'Tsy hita Mpihira na Hira',
    permission_title: 'GasyTab App Fitehirizana fahazoandalana',
    permission_message:
      'GasyTab App dia mila fahazoandalana mba ahafahana mitahiry ny hiranao.',
    permission_button_positive: 'Eny',
    permission_button_negative: 'Tsia',
    permission_denied: 'Tsy nahazo fahazoandalana anoratra',
    success: 'Mety!',
    backup_saved_at_path: 'Voatahiry eto ilay izy',
    songs_imported_successfully: 'Tafiditra soamantsara',
    song_downloaded: 'Tafiditra hira',
    text_size: 'Soratra',
    show_tabs_by_default: 'Aseho Tab',
    hide_tabs_by_default: 'Tsy aseho Tab',
    enable_page_turner_by_default: 'Alefa ny fanovana pejy',
    disable_page_turner_by_default: 'Tsy alefa ny fanovana pejy',
    sort_by_title: 'Alahatra Hira',
    sort_by_artist: 'Alahatra Mpihira',
    custom_sort: 'Alahatro Manokana',
    developed_by: 'Developed by',
    home: 'Home',
    online_search_not_available: "Miala tsiny, tsy misy amin'ny IOS ity",
    transpose: 'Transpose',
    add_to_playlist: 'Ampina lisitra',
    you_can_still_create_songs_manually: 'Afaka manamboatra eto enao',
    create_song: 'Hira vaovao',
    invalid_lyricist: 'Tsy manakery mpampiditra',
    this_is_work_in_progress: 'Hoavy tsy ho ela',
    not_sharable_song: "Ny hira nataon'ny GasyTab dia tsy afaka zaraina",
    not_sharable_playlist: "Misy akoron'ny GasyTab ao amin'ny lisitranao",
    song_edit: 'Hamboatra/Hampiditra',
    lyrics: 'Tononkira',
    online_service: 'Hitady',
    upload_to_gasytab: 'Alefa gasytab.com',
  },
};
export default translations;
