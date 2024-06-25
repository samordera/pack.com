import { writable } from "svelte/store";
import type { Address, Position } from "../types/location";
import type { Writable } from "svelte/store";

export const position: Position = { latitude: null, longitude: null, error: null };
export const address: Writable<Address> = writable({ country: null, state: null, city: null, town: null, error: null });