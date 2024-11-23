<script>
  import { ArweaveWebWallet } from "arweave-wallet-connector";
  import { Othent } from "@othent/kms";
  import { router } from "tinro";
  import { address } from "../store.js";
  import WalletSvg from "./svg/wallet.svg.svelte";

  // if wallet is connected, redirect to /signin
  if ($address) {
    console.log("wallet is connected, redirecting to /signin. address: ", address);
    router.goto("/signin");
  }

  async function arConnect() {
    if (!globalThis.arweaveWallet) {
      alert("ArConnect is not installed. goto https://arconnect.io");
      return;
    }
    await globalThis.arweaveWallet.connect(["ACCESS_ADDRESS"]);
    const addr = await globalThis.arweaveWallet.getActiveAddress();
    localStorage.setItem("arweave-address", addr);
    $address = addr;
    router.goto("/signin");
  }

  async function arweaveApp() {
    const wallet = new ArweaveWebWallet({
      name: "VouchX",
    });
    wallet.setUrl("arweave.app");
    await wallet.connect();
    $address = await globalThis.arweaveWallet.getActiveAddress();
    router.goto("/signin");
  }

  async function othentConnect() {
    const othent = new Othent({ appInfo: {
      name: "VouchX(DecentraMind)",
      version: "1.0.0",
      env: "production",
    } });
    const result = await othent.connect();
    //console.log("result: ", result);
    $address = result.walletAddress;
    router.goto("/signin");
  }
</script>

<div class="flex-col justify-start items-start gap-6 flex">
  <div class="text-lg font-normal font-['Satoshi'] tracking-tight">
    Connect your Arweave wallet to get yourself vouched using this VouchX
    service.
  </div>

  <div
    class="w-full px-6 py-4 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-4 flex"
  >
    <div
      class="text-zinc-600 text-base font-['Satoshi'] tracking-tight"
    >
      Choose your AR Wallet App to connect.
    </div>
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:text-white">
      {#each [
        { name: 'ArConnect', onClick: arConnect },
        { name: 'Arweave Wallet', onClick: arweaveApp },
        { name: 'Othent', onClick: othentConnect }
      ] as wallet}
        <button
          class="flex justify-start items-center text-left gap-1.5 md:px-4 py-2 md:bg-indigo-500 md:rounded-xl md:shadow md:border"
          on:click={wallet.onClick}
        >
          <WalletSvg size={16} />
          {wallet.name}
        </button>
      {/each}
    </div>
  </div>
</div>
