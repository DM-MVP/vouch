<script>
  export let title = "";
  export let className = "";
</script>
<div
class="w-full p-4 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-inner border border-indigo-500 border-opacity-50 flex-col justify-center items-start gap-4 flex {className}"
>
  <div class="text-zinc-600 text-base font-['Satoshi'] leading-relaxed">
    {title}
  </div>
  <slot />
</div>
