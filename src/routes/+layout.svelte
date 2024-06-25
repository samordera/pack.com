<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	import logo from "$lib/img/core/logo.png";
	import banner from "$lib/img/core/banner.png";
	import SearchBar from '$lib/components/SearchBar.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	import FunButton from '$lib/components/FunButton.svelte';
	import { fly, scale, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let landingPage: boolean = true;
	let showAgentWizard: boolean = false;
	let menu: any = [
		{
			label: "buy",
			type: "nested",
			href: "",
			hovering: false,
			submenu: [
				{
					label: "place an order",
					type: "button",
					href: "",
					click: () => {}
				},
				{
					label: "categories",
					type: "nested",
					hovering: false,
					href: "",
					submenu: [
						{
							label: "cars",
							href: "/s/"
						},
						{
							label: "computers",
							href: "/s/"
						},
						{
							label: "clothing",
							href: "/s/"
						},
						{
							label: "real estate",
							type: "anchor",
							href: "/s/"
						},
					]
				},
			]
		},
		{
			label: "sell",
			type: "button",
			href: "",
			click: () => {}
		},
		{
			label: "earn",
			type: "nested",
			href: "",
			hovering: false,
			submenu: [
				{
					label: "become an agent",
					type: "button",
					click: () => { showAgentWizard = true }
				}
			]
		},
	]
	$: {
		if (showAgentWizard) {
			goto("/agent")
		}
	}
</script>

{#key $page.url.pathname}
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" background="bg-amber-600 text-white" slotDefault="place-self-center flex justify-center items-center w-full" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				{#if !landingPage}
				<a
				in:scale
				href="/">
					<img
					class="h-5"
					src="{logo}"
					alt="logo" />
				</a>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="default">
				{#if !landingPage}
				<div
				in:scale
				class="flex space-x-28 items-center justify-center w-full">
					<nav>
						<ul
						class="flex space-x-9">
							{#each menu as item, index (index)}
							<li>
								{#if item.type === "button"}
									<button
									class="uppercase hover:text-black hover:no-underline hover:cursor-pointer p-2 no-underline text-white"
									on:click={item.click}>
										{item.label}
									</button>
								{:else if item.type === "anchor"}
									<a
									class="uppercase hover:text-black hover:no-underline hover:cursor-pointer p-2 no-underline text-white"
									href="{item.href}">
										{item.label}
									</a>
								{:else if item.type === "nested"}
									<div
									role="list"
									on:mouseenter={() => item.hovering = true}
									on:mouseleave={() => item.hovering = false}
									class="flex flex-col items-center relative box-border p-2">
										<p
										class="uppercase hover:text-black hover:no-underline hover:cursor-pointer no-underline text-white">
											{item.label}
										</p>
										{#if item.hovering}
										<ul
										in:slide
										out:slide
										class="absolute py-2 top-full space-y-4 bg-white w-40 text-center">
											{#each item.submenu as subitem, index (index)}
											<li>
												{#if subitem.type === "button"}
														<button
														class="capitalize text-sm hover:text-amber-600 hover:no-underline hover:cursor-pointer no-underline text-black"
														on:click={subitem.click}>
															{subitem.label}
														</button>
													{:else if subitem.type === "anchor"}
														<a
														class="capitalize text-sm hover:text-amber-600 hover:no-underline hover:cursor-pointer no-underline text-black"
														href="{subitem.href}">
															{subitem.label}
														</a>
													{:else if subitem.type === "nested"}
														<div
														role="list"
														on:mouseenter={() => subitem.hovering = true}
														on:mouseleave={() => subitem.hovering = false}
														class="relative hover:text-amber-600 w-full">
															<p
															class="capitalize text-sm hover:text-amber-600 hover:no-underline hover:cursor-pointer no-underline text-black">
																{subitem.label}
															</p>
															{#if subitem.hovering}
															<ul
															in:slide={{ axis: "x" }}
															out:slide={{ axis: "x" }}
															class="absolute bg-white text-black left-full top-0 w-full p-1 capitalize space-y-3">
																{#each subitem.submenu as submenuitem, index (index)}
																<li
																class="hover:text-amber-600">
																	<a
																	href="{submenuitem.href}">
																		{submenuitem.label}
																	</a>
																</li>
																{/each}
															</ul>
															{/if}
														</div>
												{/if}
											</li>
											{/each}
										</ul>
										{/if}		
									</div>
								{/if}
							</li>
							{/each}
						</ul>
					</nav>
					<SearchBar
					otherClasses="border-b border-black focus:border-white"
					placeholders={["Tell us what you want..."]}/>
				</div>
				{:else}
				<button
				class="uppercase hover:text-black hover:no-underline hover:cursor-pointer p-2 no-underline text-white flex items-center space-x-2"
				on:click={() => {}}>
					<p>become an agent
				</button>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Share
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					X
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					Change Language
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	{#if landingPage}
		<!-- <Wizard
	wizardConfig={agentSignUpWizard} /> -->
	<!-- <Wizard
	wizardConfig={productRequestWizard} /> -->
	<section
	out:slide
	class="flex flex-col items-center justify-center p-6 w-full space-y-16 h-screen bg-amber-600">
		<img
		src="{banner}"
		alt="logo" />
		<SearchBar
		width="w-1/2"
		height="h-14"
		otherClasses="p-4 border-black focus:border-white focus:bg-amber-600 text-white text-xl"
		placeholders={["Tell us what you're looking for.", "We'll ensure it gets to your doorstep...", "If that's what you want", "Order now"]}
		clicked />
		<FunButton
		width="w-80"
		height="h-16"
		otherClasses="font-bold uppercase">
			I want to sell something
		</FunButton>
		<button
		on:click={() => landingPage = false}
		class="anchor hover:text-black text-xl no-underline text-white">
			I'm just browsing.
		</button>
		<!-- <ProductCollectionMini
		width="w-3/4"
		collectionConfig={newProducts} />
		<ProductCollectionMini
		width="w-3/4"
		collectionConfig={userIntrestProducts}/> -->
		<!-- <SetLocation />
		<BaseForm
		className="grid grid-cols-3 gap-4"
		formConfig={accountCreationForm}
		on:formSubmitted={handleSubmit} />
		<Map/> -->
	</section>
	{:else}
	<slot />
	{/if}
</AppShell>
{/key}
