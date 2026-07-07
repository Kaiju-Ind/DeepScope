import type { TechnologyDefinition } from '../../types';

export const instatusTechnologyDefinition = {
	id: "instatus",
	name: "Instatus",
	website: "https://instatus.com",
	description: "Instatus is a status and incident communication tool.",
	icon: "Instatus.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "instatus:dom:0",
			kind: "dom",
			selector: "a[href*='instatus.com'][target='_blank'], iframe[src*='.instatus.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "instatus:dom:1",
			kind: "dom",
			selector: "a.footer__link",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "instatus:text:2",
			kind: "text",
			pattern: new RegExp("Powered by Instatus"),
			description: "Page text contains a known technology marker.",
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
