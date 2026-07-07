import type { TechnologyDefinition } from '../../types';

export const sprigTechnologyDefinition = {
	id: "sprig",
	name: "Sprig",
	website: "https://sprig.com",
	description: "Sprig is an UX analysis and management tool to understand what motivates customers to sign up, engage, and remain loyal to products.",
	icon: "Sprig.png",
	categories: [
		"surveys-feedback",
		"analytics",
	],
	rules: [
		{
			id: "sprig:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.userleap\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sprig:jsGlobal:1",
			kind: "jsGlobal",
			property: "UserLeap",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
