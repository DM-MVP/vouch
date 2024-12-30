import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// export default {
//   // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
//   // for more information about preprocessors
//   preprocess: vitePreprocess(),
// }

import adapter from '@zeabur/svelte-adapter'; // <-- 注意这里
 
export default {
  kit: {
    adapter: adapter()
  }
}