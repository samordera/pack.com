<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
  
    interface Address {
      country: string | null;
      state: string | null;
      city: string | null;
      town: string | null;
      error: string | null;
    }
  
    const address: Writable<Address> = getContext('address');
  </script>
  
  {#if $address.error}
  <p>Error: {$address.error}</p>
  {:else}
  <p>
    {`${$address.town}, ${$address.city}, ${$address.state},${$address.country}`}
  </p>
  {/if}
  