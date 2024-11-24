declare module 'tinro' {
  import type { SvelteComponentTyped } from 'svelte';
  
  export class Route extends SvelteComponentTyped<{
    path?: string;
  }> {}
  
  export const router: {
    goto: (path: string) => void;
    subscribe: (callback: (route: { path: string }) => void) => void;
    mode: {
      hash: () => void;
    };
  };
} 