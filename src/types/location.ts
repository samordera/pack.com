export interface Position {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

export interface Address {
    country: string | null;
    state: string | null;
    city: string | null;
    town: string | null;
    error: string | null;
}