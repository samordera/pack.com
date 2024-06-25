<script lang="ts">
    import { onMount } from 'svelte';
    let countries: Array<any> = [];
    let selectedCountryCode = '';
    let phoneNumber = '';
  
    onMount(async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      countries = data.map((country: any) => ({
        name: country.name.common,
        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
      })).filter((country: any) => country.code);
    });
  
    function handleCountryChange(event: any) {
      selectedCountryCode = event.target.value;
      phoneNumber = selectedCountryCode + ' ' + phoneNumber.replace(/^\+\d+\s?/, '');
    }
  </script>
  
  <label for="country-code">
    <select class="select" id="country-code" bind:value={selectedCountryCode} on:change={handleCountryChange}>
        <option value="" disabled selected>Select your country code</option>
        {#each countries as country}
          <option value={country.code}>{country.name} ({country.code})</option>
        {/each}
    </select>
</label>
  <label for="phone">
    <input type="tel" class="input" bind:value={phoneNumber} placeholder="Enter phone number" required>
  </label>
  