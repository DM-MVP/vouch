import { writable } from 'svelte/store'

// Initialize from localStorage if available
const storedAddress = localStorage.getItem('arweave-address');
export const address = writable(storedAddress || null);

// Subscribe to changes and update localStorage
address.subscribe(value => {
  if (value) {
    localStorage.setItem('arweave-address', value);
  }
});
