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
export interface AUTH_USER_STATE {
    error: ERROR;
    isLoginView: boolean;
    isLoading: boolean;
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

export interface SPOT {
    id: number;
    profile: SPOT_PROFILE;
    multiProfiles: SPOT_MULTI_PROFILE[];
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