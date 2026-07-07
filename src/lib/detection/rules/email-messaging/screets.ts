import type { TechnologyDefinition } from '../../types';

export const screetsTechnologyDefinition = {
	id: "screets",
	name: "Screets",
	website: "https://screets.com",
	description: "Screets is a chat widget compatible with WordPress, HTML, and PHP websites.",
	icon: "Screets.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "screets:jsGlobal:0",
			kind: "jsGlobal",
			property: "screetsxi.appid",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
