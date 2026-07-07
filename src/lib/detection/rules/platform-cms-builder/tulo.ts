import type { TechnologyDefinition } from '../../types';

export const tuloTechnologyDefinition = {
	id: "tulo",
	name: "Tulo",
	website: "https://worldoftulo.com",
	description: "Tulo is a subscription management platform designed to support recurring billing, customer access control, and subscription lifecycle operations for digital businesses.",
	icon: "Tulo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tulo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.worldoftulo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tulo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tulo.account",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
