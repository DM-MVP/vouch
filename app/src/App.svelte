<script lang="ts">
  import { Route, router } from "tinro";
  import Layout from "./components/layout.svelte";
  import Connect from "./components/steps/connect-wallet.svelte";
  import SignInX from "./components/steps/signin-x.svelte";
  import Success from "./components/steps/success.svelte";
  import Nav from "./components/nav.svelte";
  import { address } from "./store";
  import { onDestroy, onMount } from "svelte";

  router.mode.hash();

  let unsubscribe: () => void;

  // check if active address is same as address in store on every address change
  async function checkAddresses() {
    if (!globalThis.arweaveWallet) {
      return;
    }
    const activeAddress = await globalThis.arweaveWallet.getActiveAddress();
    console.log('checkAddresses', {activeAddress, $address});
    if ($address && activeAddress !== $address) {
      console.log('Address mismatch, clearing stored address');
      address.set(null);
      if (router.path !== '/') {
        router.goto('/');
      }
    }
  }

  async function addSwitchListener() {
    const onSwitch = async (e: any) => {
      console.log('onSwitch', e.detail.address, address)
      if (e.detail.address !== address) {
        console.log('Wallet switched, disconnect.', e.detail.address, address)
        address.set(null)
        removeEventListener('walletSwitch', onSwitch)
      }
    }
    console.log('add switch listener')
    addEventListener('walletSwitch', onSwitch)
  }

  onMount(() => {
    checkAddresses();
    // Set up store subscription
    unsubscribe = address.subscribe(() => {
      checkAddresses();
    });
    addSwitchListener();
  })
  onDestroy(() => {
    unsubscribe();
  })
  
  // Add router guard to check wallet connection
  // router.subscribe((route) => {
  //   if (!$address && route.path !== '/') {
  //     console.log("wallet is not connected, redirecting to connect-wallet page");
  //     router.goto("/");
  //   }
  //   if ($address && route.path === '/') {
  //     console.log("wallet is connected, redirecting to signin page");
  //     router.goto("/signin");
  //   }
  // });
</script>

<Layout>
  <div slot="main">
    <Route path="/">
      <Connect />
    </Route>
    <Route path="/signin">
      <SignInX />
    </Route>
    <Route path="/success" let:meta>
      <Success address={meta.query.address} />
    </Route>
    <Route path="/error" let:meta>
      <h1 class="text-zinc-400 text-[30px]">
        There was an error with your request!
      </h1>
      <p class="mt-16">{decodeURI(meta.query.msg)}</p>
    </Route>
  </div>
  <Nav slot="nav" />
</Layout>
