export const LOGIN_URL = '/auth/sign_in';
export const SIGN_UP_URL = '/auth/';
export const LOGOUT_URL = '/auth/sign_out';
export const FORGOT_URL = '/auth/password';

export const ANIME_API = '/api/v1/animes';
export const GET_TOP_ANIME = ANIME_API + '/top_animes';
export const GET_RECENTLY_REVIEWED_ANIME = ANIME_API + '/recent_reviewed';
export const GENRE_API = '/api/v1/genres';
export const GET_GENRES_LIST = GENRE_API + '/all_genres';
export const REVIEW_API = '/api/v1/reviews';
export const GET_RECENT_REVIEWS = REVIEW_API + '/recent';
export const GET_REVIEWS_BY_ANIME = REVIEW_API + '/get_by_anime';
export const getAnimeListGenre = id => `/api/v1/genres/${id}/anime_list`;

export const SEARCH_ANIME = '/api/v1/search/search';

export const USER_API = '/api/v1/users';
