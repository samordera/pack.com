<script lang="ts">
    import type { BaseForm } from "../../types/form";
    import { createEventDispatcher } from "svelte";

    import PhoneInput from "./PhoneInput.svelte";

    import { FileButton } from "@skeletonlabs/skeleton";
	import { fade } from "svelte/transition";
	import SetLocation from "./SetLocation.svelte";
    
    export let formConfig: BaseForm | undefined;
    export let errorMessage: string | undefined = undefined;
    export let className: string = "flex flex-col space-y-4";
    export let height: string = "";
    export let width: string = "";

    const dispatch = createEventDispatcher()
</script>

{#if formConfig}
<form
in:fade
out:fade
on:submit|preventDefault={() => dispatch("formSubmitted")}
class="bg-white flex flex-col space-y-6 p-6 rounded-xl shadow-sm {height} {width}">
    {#if formConfig.title}
    <h2
    class="text-xl uppercase text-center">
        {formConfig.title}
    </h2>
    {/if}
    <div
    class={className}>
        {#each formConfig.fields as field, index (index)}
        {#if field.type === "email"}
        <label
        class="label flex flex-col justify-start">
            <input
            class="input normal-case"
            type="email"
            placeholder="{field.label}"
            bind:value={field.value} />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "password"}
        <label
        class="label flex flex-col justify-start">
            <input
            class="input normal-case"
            type="password"
            placeholder="{field.label}"
            bind:value={field.value} />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "text"}
        <label
        class="label flex flex-col justify-start">
            <input
            class="input normal-case"
            type="text"
            placeholder="{field.label}"
            bind:value={field.value} />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "location"}
        <label
        class="label flex flex-col justify-start">
            <SetLocation />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "date"}
        <label
        class="label flex flex-col justify-start space-y-1">
            <p>
                {field.label}
            </p>
            <input
            class="input normal-case"
            type="date"
            bind:value={field.value} />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "tel"}
        <label
        class="label flex flex-col justify-start space-y-1">
            <p>
                {field.label}
            </p>
            <!-- <input
            class="input normal-case"
            type="tel"
            bind:value={field.value}
            placeholder="(123) 456-7890"
            pattern="\(\d{3}\) \d{3}-\d{4}" /> -->
            <PhoneInput />
            {#if field.description}
            <p class="text-xs">
                {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "file"}
        <label
        class="label flex flex-col justify-start space-y-1">
            <p>
                {field.label}
            </p>
            <FileButton name="files" bind:files={field.value}/>
            {#if field.description}
            <p
            class="text-xs">
            {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "textarea"}
        <label
        class="label flex flex-col justify-start space-y-1">
            <textarea name="" id=""></textarea>
            {#if field.description}
            <p
            class="text-xs">
            {field.description}
            </p>
            {/if}
        </label>
        {:else if field.type === "select"}
        <label
        class="label flex flex-col justify-start space-y-1">
            {#if field.options}
            <select
            class="select normal-case"
            name="{field.name}"
            bind:value={field.value}>
                <option
                class="list-option capitalize"
                value=""
                selected
                disabled>
                    {field.label}
                </option>
                {#each field.options as option, index (index)}
                <option
                class="list-option capitalize"
                value="{option.value}">
                    {option.label}
                </option>
                {/each}
            </select>
            {/if}
        </label>
        {/if}
        {/each}    
    </div>

    {#if formConfig.buttons}
    {#each formConfig.buttons as button, index (index)}
    {#if button.type === "submit"}
    <button
    class="btn variant-filled-primary rounded-sm capitalize"
    type="submit">
        {button.label}
    </button>
    {:else}
    <button
    class="btn variant-outline-primary capitalize"
    type="button">
        {button.label}
    </button>
    {/if}
    {/each}
    {/if}
    
    {#if formConfig.otherInnerHTML}
    <div
    class="flex flex-col space-y-2 text-center text-xs">
        {#each formConfig.otherInnerHTML as innerHTML, index (index)}
        {@html innerHTML}
        {/each}
    </div>
    {/if}

    {#if errorMessage}
    <p
    class="text-error-500 text-sm">
    {errorMessage}
    </p>
    {/if}
</form>
{:else}
    
<h1
class="text-lg text-error">
    Form is undefined
</h1>
{/if}