import type { TechnologyDefinition } from '../../types';

export const aimbaseTechnologyDefinition = {
	id: "aimbase",
	name: "Aimbase",
	website: "https://aimbase.com",
	description: "Aimbase is a marketing automation platform designed to streamline campaign management, customer engagement, and data-driven decision-making.",
	icon: "Aimbase.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "aimbase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ws\\.aimbase\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aimbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "Aimbase.Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
