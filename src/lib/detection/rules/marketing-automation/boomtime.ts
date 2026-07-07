import type { TechnologyDefinition } from '../../types';

export const boomtimeTechnologyDefinition = {
	id: "boomtime",
	name: "boomtime",
	website: "https://www.boomtime.com",
	description: "boomtime is a full-service digital marketing platform.",
	icon: "boomtime.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "boomtime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boomtime\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boomtime:dom:1",
			kind: "dom",
			selector: "form[action*='.boomtime.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
