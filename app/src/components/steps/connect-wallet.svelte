<script>
  import { ArweaveWebWallet } from "arweave-wallet-connector";
  import { Othent } from "@othent/kms";
  import { router } from "tinro";
  import { address } from "../../store.js";
  import StepCard from "../step-card.svelte";
  import ActionCard from "../action-card.svelte";
  import Button from "../button.svelte";
  import Icon from "../svg/icon.svelte";

  async function setActiveAddress(addr = null) {
    const activeAddress = addr || (await globalThis.arweaveWallet.getActiveAddress());
    $address = activeAddress;
    localStorage.setItem("arweave-address", activeAddress);
    router.goto("/signin");
  }

  async function arConnect() {
    if (!globalThis.arweaveWallet) {
      alert("ArConnect is not installed. goto https://arconnect.io");
      return;
    }
    await globalThis.arweaveWallet.connect(["ACCESS_ADDRESS"]);
    setActiveAddress();
  }

  async function arweaveApp() {
    const wallet = new ArweaveWebWallet({
      name: "VouchX(DecentraMind)",
    });
    wallet.setUrl("arweave.app");
    await wallet.connect();
    setActiveAddress();
  }

  async function othentConnect() {
    const othent = new Othent({ appInfo: {
      name: "VouchX(DecentraMind)",
      version: "1.0.0",
      env: "production",
    } });
    const result = await othent.connect();
    //console.log("result: ", result);
    setActiveAddress(result.walletAddress);
  }
</script>

<StepCard title="Connect your Arweave wallet to get yourself vouched using this VouchX
    service.">

  <ActionCard title="Choose your AR Wallet App to connect.">
    <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:text-white">
      {#each [
        { name: 'ArConnect', onClick: arConnect },
        { name: 'Arweave Wallet', onClick: arweaveApp },
        { name: 'Othent', onClick: othentConnect }
      ] as wallet}
        <Button onClick={wallet.onClick}>
          <Icon href="#lucide-wallet" className="mr-2" />
          {wallet.name}
        </Button>
      {/each}
    </div>
  </ActionCard>
</StepCard>