<script>
  export let buttonText = "";
  export let size = "lg";
  export let className = "";
  const padding = {
    md: "px-1.5 py-0.5",
    lg: "px-3 py-1.5",
  };
  const textSize = {
    md: "text-sm",
    lg: "text-base",
  };
  const fontWeight = {
    md: "font-normal",
    lg: "font-medium",
  };
  const rounded = {
    md: "rounded-md",
    lg: "rounded-xl",
  };
</script>

<button
  class="inline-flex justify-start items-center text-indigo-500 hover:text-white hover:bg-indigo-500 {rounded[size]} hover:shadow {textSize[size]} {fontWeight[size]} font-['Satoshi'] border border-indigo-500 {padding[size]} {className}"
  on:click={$$props.onClick || (() => {})}
>
  {#if buttonText}
    {buttonText}
  {:else}
    <slot />
  {/if}
</button>
