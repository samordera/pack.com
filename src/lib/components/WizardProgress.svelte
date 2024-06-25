<script lang="ts">
    import { ProgressBar, ProgressRadial } from "@skeletonlabs/skeleton";

    export let numWindows: number = 0;
    export let value: number = 0;
    export let height: string = "";
    export let width: string = "";
    
    let meterColor: string = "bg-amber-600"
    let trackColor: string = "bg-neutral-200"

    const windowsRange = Array.from({ length: numWindows }, (_, i) => i+1);
</script>

<div
class="relative flex items-center justify-center {height} {width}">
    <ProgressBar
    height="h-1"
    meter={meterColor}
    track={trackColor}
    value={value*(100/(numWindows-1))} />
    <div
    class="flex w-full h-full absolute items-center justify-between">
        {#each windowsRange as window, index (index)}
        <span class="h-7 w-7 {value >= index ? meterColor : trackColor} rounded-full"></span>
        {/each}
    </div>
</div>