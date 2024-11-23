<script>
  import { address } from "../store.js";
  import { router } from "tinro";
  import Svgs from "./svg/svgs.svelte";
  import TelegramSVG from "./svg/telegram.svg.svelte";
  import { VOUCH_PROCESS } from "../constants";
</script>

<div class="min-h-screen w-full bg-gray-50 flex flex-col overflow-x-auto">
  <Svgs />
  <!-- Header bar -->
  <header class="sticky top-0 z-10">
    <div class="p-4 sm:p-8 mx-auto bg-white border-b border-gray-200 ">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex flex-col items-start gap-4">
          <a href="/" class="text-3xl font-medium">VouchX</a>
          <span class="text-zinc-500 text-sm">Voucher: <b>DecentraMind</b><span>
        </div>
        {#if $address}
          <div class="text-sm">
            Connected wallet: <span class="lg:inline hidden">{$address}</span><span class="inline lg:hidden">{$address.slice(0, 4)}...{$address.slice(-4)}</span>
          <button
            class="text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white 
                   rounded-md px-2 py-1 text-sm ml-2"
            on:click={() => {
              localStorage.removeItem("arweave-address");
              $address = null;
              router.goto("/");
            }}
          >
              Disconnect
            </button>
          </div>
        {/if}
      </div>
    </div>


    <!-- Steps indicator -->
    <slot name="nav" />
  </header>

  <!-- Main content -->
  <main class="flex-1 px-4 md:px-8 flex flex-col justify-between gap-4">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border-2 border-gray-200 px-4 md:px-8 pt-4 pb-6 md:pt-8 md:pb-8">
      <slot name="main" />
    </div>
    <p class="text-gray-400"><a href="https://t.me/+_hXYYS6ptK80NDlh" target="_blank" class="hover:text-indigo-500">
      <TelegramSVG class="w-4 h-4 inline-flex" /> Join DecentraMind's Telegram channel
    </a> for any assistance or feedback.</p>
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 p-4 sm:p-8 mt-8">
    <div class="max-w-7xl mx-auto text-center">
      <div class="text-gray-400 text-sm text-left mb-4 leading-loose">
        This is a <a href="https://github.com/DM-MVP/vouch" target="_blank" class="hover:text-indigo-500">permaweb/vouch-x fork</a>, maintained by <a href="https://decentramind.club" target="_blank" class="hover:text-indigo-500">DecentraMind</a>, using the same
        <a href={`https://www.ao.link/#/entity/${VOUCH_PROCESS}`} target="_blank" class="hover:text-indigo-500">
          AO process
        </a> as <a href="https://vouch-twitter.g8way.io/" target="_blank" class="hover:text-indigo-500">original VouchX</a>.<br>
      </div>
    </div>
  </footer>
</div>
