<script lang="ts">
	import type { BaseWizard } from "../../types/wizard";
    import BaseForm from "./BaseForm.svelte";
    import WizardProgress from "./WizardProgress.svelte";

    export let wizardConfig: BaseWizard | undefined

    let numWindows = wizardConfig?.windows ? wizardConfig?.windows.length : 0
    let currentWindow = 0;
</script>

<div
class="w-full h-full bg-black bg-opacity-60 z-20 flex items-center justify-center">
    {#if wizardConfig}
    <div
    class="w-2/3 h-3/4 flex flex-col items-center justify-between space-y-4 rounded-2xl bg-white p-6">
        <div
        class="text-center mb-6 space-y-4">
            <h2 class="text-2xl uppercase">{wizardConfig?.title}</h2>
            {#if wizardConfig.description}
            <p class="text-center">{wizardConfig.description}</p>
            {/if}        
        </div>
        <WizardProgress
        {numWindows}
        width="w-1/3"
        value={currentWindow} />
        {#each wizardConfig.windows as window, index (index)}
        {#if currentWindow === index}
        <div
        class="flex flex-col items-center h-4/5 w-4/5">
            <div
            class="flex flex-col w-full p-6">
                <h3 class="text-2xl">{window.title}</h3>
                {#if window.description}
                <p class="">{window.description}</p>
                {/if}
            </div>
            {#if window.form}
            <BaseForm
            className="{window.form.fields.length > 1 ? "grid grid-cols-2 gap-6" : "w-full flex"}"
            formConfig={window.form}
            width="w-full"
            />
            {/if}
        </div>
        {/if}
        {/each}
        <div
        class="flex justify-end space-x-4 self-end">
            {#if currentWindow > 0}
            <button
            type="button"
            class="btn border border-amber-600 font-bold capitalize text-black"
            on:click={() => { if (currentWindow > 0) currentWindow-- }}>
            back
            </button>
            {/if}
            {#if currentWindow === numWindows - 1}
            <button
            type="button"
            class="btn variant-filled bg-amber-600 font-bold capitalize"
            on:click={() => {}}>
            finish
            </button>
            {:else}
            <button
            type="button"
            class="btn variant-filled bg-amber-600 font-bold capitalize"
            on:click={() => { if (currentWindow < numWindows) currentWindow++ }}>
            next
            </button>
            {/if}
        </div>
    </div>
    {:else}
    <h2
    class="text-error-500 text-xl bg-white p-3">
        Wizard is not defined
    </h2>
    {/if}
</div>