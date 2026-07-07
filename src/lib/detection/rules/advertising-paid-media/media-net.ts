import type { TechnologyDefinition } from '../../types';

export const mediaNetTechnologyDefinition = {
	id: "media-net",
	name: "Media.net",
	website: "https://www.media.net",
	description: "Media.net is an advertising company focused on providing monetization products to digital publishers.",
	icon: "Media.net.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "media-net:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.media\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "media-net:dom:1",
			kind: "dom",
			selector: "link[href*='.media.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
