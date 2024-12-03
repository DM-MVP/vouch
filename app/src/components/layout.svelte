<script>
  import { address } from "../store.js";
  import { router } from "tinro";
  import Svgs from "./svg/svgs.svelte";
  import { VOUCH_PROCESS, VOUCHER_NAME } from "../constants";
  import Button from "./button.svelte";
  import Icon from "./svg/icon.svelte";
</script>

<div class="min-h-screen w-full bg-gray-50 flex flex-col overflow-x-auto">
  <Svgs />
  <!-- Header bar -->
  <header class="sticky top-0 z-10">
    <div class="p-4 sm:p-8 mx-auto bg-white border-b border-gray-200">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div class="flex flex-col items-start gap-4">
          <a href="/" class="text-3xl font-medium">VouchX</a>
          <span class="text-zinc-500 text-sm"
            >Voucher: <b>{VOUCHER_NAME}</b><span> </span></span
          >
        </div>
        {#if $address}
          <div class="text-sm">
            Connected wallet: <span
              >{$address.slice(0, 4)}...{$address.slice(-4)}</span
            >
            <Button
              size="md"
              onClick={() => {
                localStorage.removeItem("arweave-address");
                globalThis.arweaveWallet.disconnect();
                $address = null;
                router.goto("/");
              }}
              className="ml-2"
            >
              Disconnect
            </Button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Steps indicator -->
    <slot name="nav" />
  </header>

  <!-- Main content -->
  <main class="flex-1 px-4 md:px-8 flex flex-col justify-between gap-4">
    <div
      class="max-w-full md:max-w-3xl mx-auto bg-white rounded-xl shadow-sm border-2 border-gray-200 px-4 md:px-8 pt-4 pb-6 md:pt-8 md:pb-8"
    >
      <slot name="main" />
    </div>

    {#if VOUCHER_NAME === "DecentraMind"}
      <p class="text-gray-400 text-base inline-flex flex-wrap gap-1">
        <a
          href="https://t.me/+_hXYYS6ptK80NDlh"
          target="_blank"
          class="hover:text-indigo-500 inline-flex items-center flex-wrap"
        >
          <Icon
            href="#logos-telegram"
            size={16}
            className="mr-0.5 w-4 h-4"
          />Join DecentraMind Telegram channel
        </a><span>for any assistance or feedback.</span>
      </p>
    {/if}
  </main>

  <!-- Footer -->
  {#if VOUCHER_NAME === "DecentraMind"}
    <footer class="bg-white border-t border-gray-200 p-4 sm:p-8 mt-8">
      <div class="text-gray-400 text-sm text-left mb-4 leading-loose">
        This is a <a
          href="https://github.com/DM-MVP/vouch"
          target="_blank"
          class="hover:text-indigo-500">permaweb/vouch-x fork</a
        >, using the same
        <a
          href={`https://www.ao.link/#/entity/${VOUCH_PROCESS}`}
          target="_blank"
          class="hover:text-indigo-500"
        >
          Vouch process in AO
        </a>
        as
        <a
          href="https://vouch-twitter.g8way.io/"
          target="_blank"
          class="hover:text-indigo-500">original VouchX</a
        >, maintained by
        <a
          href="https://decentramind.club"
          target="_blank"
          class="hover:text-indigo-500">DecentraMind</a
        >.
      </div>
    </footer>
  {/if}
</div>
