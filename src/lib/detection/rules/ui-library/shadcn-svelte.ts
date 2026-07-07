import type { TechnologyDefinition } from '../../types';

export const shadcnSvelteTechnologyDefinition = {
	id: "shadcn-svelte",
	name: "shadcn-svelte",
	website: "https://www.shadcn-svelte.com",
	description: "Shadcn-svelte is an adaptation of shadcn/ui for Svelte, offering accessible and customisable components.",
	icon: "ShadCnSvelte.svg",
	categories: [
		"ui-library",
		"component-library",
	],
	rules: [
		{
			id: "shadcn-svelte:dom:0",
			kind: "dom",
			selector: "link[href*='shadcn-svelte']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shadcn-svelte:jsGlobal:1",
			kind: "jsGlobal",
			property: "sessionStorage.sveltekit:scroll",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shadcn-svelte:jsGlobal:2",
			kind: "jsGlobal",
			property: "sessionStorage.sveltekit:snapshot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"svelte",
	],
} as const satisfies TechnologyDefinition;
