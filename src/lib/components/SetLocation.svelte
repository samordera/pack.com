<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import { googleApiKey } from '../../api';
    import { setContext } from 'svelte';
    import { address, position } from '../../stores/location';

    const location = writable<{ city: string; state: string }>({ city: '', state: '' });
    
    let input: HTMLInputElement;
    
    setContext('address', address);
    
    onMount(() => {
        getGeolocation();
    });

    async function getGeolocation() {
        try {
        const geolocationResponse = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        const geolocationData = await geolocationResponse.json();
        if (geolocationData.location) {
            const { lat, lng } = geolocationData.location;
            position.latitude = lat;
            position.longitude = lng;
            getAddress(lat, lng);
        } else {
            address.set({ country: null, state: null, city: null, town: null, error: "No location found" });
        }
        } catch (error: any) {
        address.set({ country: null, state: null, city: null, town: null, error: error.message });
        console.error("Error fetching geolocation:", error);
        }
    }

    async function getAddress(lat: number, lon: number) {
        try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`);
        const data = await response.json();
        if (data.results.length > 0) {
            const components = data.results[0].address_components;
            const getComponent = (types: string[]) =>
            components.find((component: any) => types.some((type) => component.types.includes(type)))?.long_name || null;

            address.set({
            country: getComponent(["country"]),
            state: getComponent(["administrative_area_level_1"]),
            city: getComponent(["locality"]),
            town: getComponent(["sublocality", "neighborhood"]),
            error: null,
            });
        } else {
            address.set({ country: null, state: null, city: null, town: null, error: "No address found" });
        }
        } catch (error: any) {
        address.set({ country: null, state: null, city: null, town: null, error: error.message });
        console.error("Error fetching address:", error);
        }
    }

    function loadGoogleMapsAPI(): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
        });
    }

    onMount(async () => {
        await loadGoogleMapsAPI();

        const options: google.maps.places.AutocompleteOptions = {
            types: ['(cities)'],
            componentRestrictions: { country: 'ng' },
        };

        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.address_components) {
                const city = place.address_components.find((component: any) =>
                    component.types.includes('locality')
                )?.long_name || '';
                const state = place.address_components.find((component: any) =>
                    component.types.includes('administrative_area_level_1')
                )?.short_name || '';
                location.set({ city, state });
            }
        });
    });
</script>

{#if $address.town}
<input
class="input text-sm w-72"
bind:this={input}
value="{`${$address.town}, ${$address.city}, ${$address.state}, ${$address.country}`}"
type="text" />
{:else}
<input
class="input text-sm"
bind:this={input}
value="Enter your city"
type="text" />
{/if}