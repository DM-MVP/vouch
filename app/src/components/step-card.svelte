<script>
  export let title = "";
</script>

<div class="flex-col justify-start items-start gap-6 flex">
  <div
    class="text-lg font-normal text-zinc-700 font-['Satoshi'] leading-relaxed"
  >
    {title}
  </div>
  <slot />
</div>
