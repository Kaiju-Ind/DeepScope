import type { TechnologyDefinition } from '../../types';

export const pulsemTechnologyDefinition = {
	id: "pulsem",
	name: "PulseM",
	website: "https://pulsem.me",
	description: "PulseM is an online platform for managing customer reviews and business reputation across digital channels.",
	icon: "PulseM.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "pulsem:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/embed-pulsemweb-gsd\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pulsem:jsGlobal:1",
			kind: "jsGlobal",
			property: "pulsem_button_installed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
