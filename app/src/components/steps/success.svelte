<script>
  import Confetti from "svelte-confetti";
  import { VOUCH_PROCESS } from "../../constants";
  import ActionCard from "../action-card.svelte";
  import StepCard from "../step-card.svelte";
  import Button from "../button.svelte";

  export let address = "";

  async function getProcesses(address) {
    return fetch("https://arweave-search.goldsky.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variables: { addresses: [address] },
        query: `query ($addresses:[String!]!) {
  transactions (
    first: 100,
    owners: $addresses, 
    tags: [
      { name: "Data-Protocol", values: ["ao"] },
      { name: "Variant", values: ["ao.TN.1"] },
      { name: "Type", values: ["Process"]}
    ]
  ) {
    edges {
      node {
        id 
      }
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data?.transactions?.edges.map(({ node }) => node.id));
  }

  async function vouchAO() {
    const processes = await getProcesses(address);
    await Promise.all(
      processes.map((pid) =>
        fetch(
          `https://su-router.ao-testnet.xyz?process-id=${VOUCH_PROCESS}&assign=${pid}`,
          {
            method: "POST",
          }
        ).then((res) => res.json())
      )
    ).then((res) => {
      console.log(res);
      globalThis.alert("Processes Vouched!");
    });
  }
</script>

<div class="fixed top-[-50px] left-0 h-[100vh] w-[100vw] flex justify-center overflow-hidden pointer-events-none">
  <Confetti
    x={[-5, 5]}
    y={[0, 0.1]}
    delay={[500, 5000]}
    duration={5000}
    amount={400}
    fallDistance="100vh"
  />
</div>

<StepCard title="Congrats! You are successfully vouched on the Permaweb!">
  <ActionCard title="Optionally, you can">
    <Button buttonText="Vouch your AO processes" onClick={vouchAO} />
  </ActionCard>
  <div
    class="w-full"
  >
    Or check out <a
      class="text-indigo-500"
      href="https://decentramind.club"
      target="_blank">DecentraMind</a>!
  </div>
</StepCard>
