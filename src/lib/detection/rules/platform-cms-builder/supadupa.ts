import type { TechnologyDefinition } from '../../types';

export const supadupaTechnologyDefinition = {
	id: "supadupa",
	name: "SupaDupa",
	website: "https://supadupa.me",
	description: "SupaDupa is an online platform for creating websites and ecommerce stores, supporting storefront customization, product management, and online sales.",
	icon: "SupaDupa.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "supadupa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.supadupa\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "supadupa:jsGlobal:1",
			kind: "jsGlobal",
			property: "SupaDupa.banners",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
