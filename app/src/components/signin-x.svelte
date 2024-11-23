<script>
  import { address } from "../store.js";
  import { router } from "tinro";
  import { VOUCHER_ADDRESSES } from "../constants";
  import LoadingSvg from "./svg/loading.svg.svelte";
  import { AUTH_SERVICE } from "../constants";

  let vouchData = null;
  let loading = true;
  async function checkVouched() {
    if (!$address) {
      console.log("wallet is not connected, redirecting to /connect-wallet");
      router.goto("/");
    } else {
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
      loading = false;
    }
  }
  checkVouched();

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

<div class="flex-col justify-start items-start flex gap-6">
  <div class="text-lg font-normal font-['Satoshi'] tracking-tight">
    Now that you connected your wallet, verify your X account to prove your
    online public identity and get vouched on the permaweb.
  </div>

  {#if loading}
    <div class="w-full h-full flex justify-center items-center text-zinc-400">
      <LoadingSvg />
    </div>
  {:else}
    <div
      class="w-full px-6 py-4 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-inner border-2 border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-4 flex"
    >
      {#if vouchData && vouchData.length > 0}
        <div class="text-zinc-600 text-base leading-loose mb-4">
          You have been vouched, no need to sign in with your X account.
        </div>
        <div class="relative max-w-full overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr>
                <th class="px-4 py-2 font-medium">Voucher Address</th>
                <th class="px-4 py-2 font-medium">X Handle</th>
              </tr>
            </thead>
            <tbody>
              {#each vouchData as vouch}
                <tr class="border-t">
                  <td class="px-4 py-2 text-zinc-900 font-['Satoshi']"
                    >{VOUCHER_ADDRESSES[vouch.voucher]?.name
                      ? `${VOUCHER_ADDRESSES[vouch.voucher].name} (${vouch.voucher})`
                      : vouch.voucher}</td
                  >
                  <td class="px-4 py-2 text-zinc-500">
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
      {:else}
        <div class="justify-center items-start gap-2.5 inline-flex">
          <div
            class="text-zinc-900 text-[19px] font-medium font-['Satoshi'] tracking-tight"
          >
            Connect your X Account.
          </div>
        </div>
        <button
          on:click={login}
          class="flex-col justify-center items-start gap-[7px] flex"
        >
          <div
            class="px-[22px] py-3 bg-indigo-500 rounded-xl shadow border justify-start items-start inline-flex"
          >
            <div class="justify-start items-center gap-1.5 flex">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8134 7H14.1135L9.08844 12.5067L15 20H10.3713L6.74593 15.4553L2.59769 20H0.296204L5.67098 14.11L0 7H4.74621L8.02322 11.154L11.8134 7ZM11.0061 18.68H12.2806L4.05368 8.25067H2.686L11.0061 18.68Z"
                  fill="white"
                />
                <path
                  d="M22.0705 17.7944L19.4537 19.9813C19.3263 20.0874 19.2316 20.2247 19.1797 20.3785C19.1277 20.5323 19.1206 20.6968 19.1589 20.8542L19.9452 24.1123L16.9819 22.3899C16.8374 22.3056 16.6713 22.261 16.5021 22.261C16.3328 22.261 16.1668 22.3056 16.0222 22.3899L13.063 24.1123L13.844 20.8564C13.8824 20.699 13.8753 20.5345 13.8233 20.3807C13.7714 20.2269 13.6766 20.0896 13.5493 19.9835L10.9313 17.7977C10.9311 17.796 10.9311 17.7943 10.9313 17.7927L14.3802 17.5071C14.5486 17.4929 14.7097 17.4349 14.8462 17.3394C14.9827 17.244 15.0894 17.1146 15.1548 16.9654L16.5015 13.8933L17.8476 16.9654C17.913 17.1146 18.0197 17.244 18.1562 17.3394C18.2927 17.4349 18.4538 17.4929 18.6222 17.5071L22.0717 17.7927V17.7966L22.0705 17.7944Z"
                  fill="#FCC500"
                />
              </svg>

              <div class="text-white text-[17px] font-medium font-['Satoshi']">
                Connect
              </div>
              <div class="w-[25px] h-[25px] relative">
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.94788 17.7708L13.7187 13L8.94788 8.21875L10.4166 6.75L16.6666 13L10.4166 19.25L8.94788 17.7708Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
      {/if}
    </div>
  {/if}
</div>
