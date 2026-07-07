import type { TechnologyDefinition } from '../../types';

export const plasmicTechnologyDefinition = {
	id: "plasmic",
	name: "Plasmic",
	website: "https://www.plasmic.app",
	description: "Plasmic is a visual, no-code headless page/content builder for any website or codebase.",
	icon: "Plasmic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plasmic:dom:0",
			kind: "dom",
			selector: "div.plasmic_default__all",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "plasmic:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.plasmicData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
