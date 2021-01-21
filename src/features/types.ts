/* Common types */
export interface ERROR {
    isError: boolean;
    message: string;
}

export interface ERROR_RESPONSE {
    errors: {
        [key: string]: string[]
    }
}

/* authUserSlice.ts */
export interface CRED {
    email: string;
    password: string;
}

export interface JWT {
    token: string;
    email: string;
}

export interface POST_PROFILE {
    id: number;
    username: string;
    sex: number;
    birth: number;
    country: string;
    lang: string;
}

export interface POST_THUMBNAIL {
    id: number;
    imageFile: string;
}

export interface USER {
    id: number;
    email: string;
    username: string;
    thumbnailUrl: string;
    sex: number;
    birth: number;
    country: string;
    lang: string;
}

export interface AUTH_USER_STATE {
    error: ERROR;
    isLoginView: boolean;
    isLoading: boolean;
    user: USER;
    editedProfile: POST_PROFILE;
    editedThumbnail: POST_THUMBNAIL;
}

/* spotsSlice */
export interface SPOT_PROFILE {
    id: number;
    userId: number;
    majorCategory: number;
    telephone: string;
    companySite: string;
    url: string;
    rating: number;
    ratingCount: number;
    latitude: number | null;
    longitude: number | null;
}

export interface SPOT_MULTI_PROFILE {
    id: number;
    userId: number;
    lang: string;
    username: string;
    selfIntro: string;
    addressPrefecture: string;
    addressCity: string;
    addressStreet: string;
    entranceFee: string;
    businessHours: string;
    holiday: string;
}

export interface REVIEW_OWNER {
    id: number;
    username: string;
    thumbnailUrl: string;
}
export interface REVIEW {
    id: number;
    userId: number;
    touristId: number;
    lang: string;
    postReview: string;
    rating: number;
    createdAt: string;
    tourist: REVIEW_OWNER;
}

export interface POST_REVIEW {
    userId: number;
    lang: string;
    postReview: string;
    rating: number;
}

export interface POST_FAVORITE {
    userId: number;
}

export interface FAVORITE {
    id: number;
    userId: number;
    touristId: number;
}

export interface SPOT {
    id: number;
    isFavorite: boolean;
    profile: SPOT_PROFILE;
    multiProfiles: SPOT_MULTI_PROFILE[];
    reviews: REVIEW[];
}

export interface SPOT_SEARCH_PARAMS {
    last: number;
    page: number;
    count: number;
    query: string;
    category: number;
    prefecture: string;
}

export interface SPOT_GET_PARAMS {
    [key: string]: number | string;
}

export interface SPOT_PAGINATE_INDEX {
    data: SPOT[];
    meta: {
        params: SPOT_SEARCH_PARAMS;
    }
}

export interface SPOT_STATE {
    error: ERROR;
    spots: SPOT[];
    params: SPOT_SEARCH_PARAMS;
    selectSpot: SPOT;
    favorites: SPOT[];
}

/* exhibitSlice */
export interface PICTURE {
    id: number;
    url: string;
}

export interface MULTI_EXHIBIT {
    id: number;
    exhibitId: number;
    lang: string;
    name: string;
    description: string;
}

export interface READ_EXHIBIT {
    id: number;
    pictures: PICTURE[];
    multiExhibits: MULTI_EXHIBIT[];
}

export interface EXHIBIT_STATE {
    error: ERROR;
    exhibits: READ_EXHIBIT[];
    selectExhibit: READ_EXHIBIT;
}

export interface USER_STATISTICS_PARAMS {
    userId: number;
}
export interface USER_STATISTICS_RESPONSE {
    isErrors: boolean;
    message: string;
}