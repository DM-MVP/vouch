<script lang="ts">
  import { Route, router } from "tinro";
  import Layout from "./components/layout.svelte";
  import Connect from "./components/steps/connect-wallet.svelte";
  import SignInX from "./components/steps/signin-x.svelte";
  import Success from "./components/steps/success.svelte";
  import Ao from "./components/steps/ao.svelte";
  import Nav from "./components/nav.svelte";
  import { address } from "./store";

  router.mode.hash();


  // TODO check if active address is same as address in store on every address change
  
  // Add router guard to check wallet connection
  router.subscribe((route) => {
    if (!$address && route.path !== '/') {
      console.log("wallet is not connected, redirecting to connect-wallet page");
      router.goto("/");
    }
  });
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
    <Route path="/aos">
      <Ao />
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
