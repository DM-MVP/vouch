<script>
  import { router } from "tinro";
  import Icon from "./svg/icon.svelte";
</script>

<div class="min-w-100 flex items-center justify-center gap-2 sm:gap-4 py-10">
  {#each [
    {
      step: 1,
      path: '/',
      icon: '#lucide-wallet',
      title: 'Connect Wallet',
      isIcon: true
    },
    {
      step: 2,
      path: '/signin', 
      icon: '#ri-twitter-x-line',
      title: 'Connect Social Account'
    },
    {
      step: 3,
      path: '/success',
      icon: '#lucide-user-round-check',
      title: 'Vouch Successful'
    }
  ] as {step, path, icon, title, isIcon}, i}
    {#if i > 0}
      <div class="h-[2px] w-8 bg-gray-200" />
    {/if}
    
    <div class="flex items-center sm:gap-2">
      <div class={`p-3 rounded-lg ${$router.path === path ? 'bg-indigo-500 text-white' : 'bg-zinc-100'}`}>
        {#if isIcon}
          <Icon href={icon} className="w-6 h-6" />
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href={icon} />
          </svg>
        {/if}
      </div>
      <div class="flex flex-col">
        <span class="hidden sm:block text-sm font-medium {$router.path === path ? 'text-zinc-900' : 'text-zinc-500'}">Step {step}</span>
        <span class={`hidden sm:block text-xs sm:text-sm ${$router.path === path ? 'text-zinc-900' : 'text-zinc-500'}`}>
          {title}
        </span>
      </div>
    </div>
  {/each}
</div>