<script lang="ts">
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';
	import { googleApiKey } from '../../api';
  
    let mapElement: HTMLElement;
    let map: google.maps.Map;
    let userPosition: Writable<google.maps.LatLngLiteral | null> = { set: () => {} };
  
    onMount(() => {
      // Initialize the Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        initMap();
      };
    });
  
    const initMap = () => {
      // Get the user's current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            userPosition.set(userLatLng);
  
            // Create a new map instance
            map = new google.maps.Map(mapElement, {
              center: userLatLng,
              zoom: 15,
            });
  
            // Add a marker for the user's location
            new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: 'Your Location',
            });
          },
          () => {
            handleLocationError(true);
          }
        );
      } else {
        handleLocationError(false);
      }
    };
  
    const handleLocationError = (browserHasGeolocation: boolean) => {
      const message = browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation.";
      console.error(message);
    };
  </script>
  
  <div bind:this={mapElement} class="h-80 w-80"></div>