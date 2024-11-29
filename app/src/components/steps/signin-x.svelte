<script>
  import { address } from "../../store.js";
  import { router } from "tinro";
  import { VOUCHER_ADDRESSES, AUTH_SERVICE } from "../../constants";
  import StepCard from "../step-card.svelte";
  import ActionCard from "../action-card.svelte";
  import Button from "../button.svelte";
  import Icon from "../svg/icon.svelte";
  import { onMount } from "svelte";

  let vouchData = null;
  let loading = true;
  async function checkVouched() {
    if ($address) {
      // check if this address has already been vouched
      const response = await fetch(
        `${AUTH_SERVICE}/vouch/info?address=${$address}`
      );
      const data = await response.json();
      console.log("vouch data: ", data);

      if (data.Vouchers && Object.keys(data.Vouchers).length > 0) {
        vouchData = Object.entries(data.Vouchers)
          .map(([key, value]) => ({
            voucher: key,
            ...value,
          }))
          .filter(
            (v) => v.Method && v.Method === "X" && v["Vouch-For"] === $address
          );
      }
    }
  }

  onMount(async () => {
    try {
      await checkVouched();
    } catch (e) {
      console.error("error checking vouched: ", e);
    } finally {
      loading = false;
    }
  })

  function login() {
    const addr = $address;
    console.log("address: ", addr);
    if (!addr) {
      alert("Please connect your wallet first.");
      return;
    }
    globalThis.location.href = `${AUTH_SERVICE}/x?address=${addr}&callback=${encodeURI(
      globalThis.location.href
    )}`;
  }
</script>

<StepCard
  title="Now that you connected your wallet, verify your X account to prove your
    online public identity and get vouched on the permaweb."
>
  {#if loading}
    <div class="w-full h-full flex justify-center items-center text-zinc-400">
      <Icon href="#svg-spinners-gooey-balls-2" />
    </div>
  {:else if vouchData && vouchData.length > 0}
    <ActionCard
      title={`Your address ${$address.slice(0, 4)}...${$address.slice(-4)} has been vouched, no need to vouch again.`}
    >
      <div class="relative w-full overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr>
              <th class="pl-2 pr-4 py-2">Voucher Address</th>
              <th class="px-2 py-2">X Handle</th>
            </tr>
          </thead>
          <tbody>
            {#each vouchData as vouch}
              <tr class="border-t">
                <td class="pl-2 pr-4 py-2 text-zinc-700 font-['Satoshi']"
                  >{VOUCHER_ADDRESSES[vouch.voucher]?.name
                    ? `${VOUCHER_ADDRESSES[vouch.voucher].name} (${vouch.voucher})`
                    : vouch.voucher}</td
                >
                <td class="px-2 py-2 text-zinc-500">
                  {#if vouch.Identifier}
                    <a
                      href={`https://x.com/${vouch.Identifier}`}
                      target="_blank"
                      class="text-indigo-500 hover:underline"
                      >@{vouch.Identifier}</a
                    >
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </ActionCard>
  {:else}
    <ActionCard title="Connect your X Account.">
      <Button onClick={login}>
        <Icon href="#ri-twitter-x-line" className="mr-2" />Connect
      </Button>
    </ActionCard>
  {/if}
</StepCard>
