import type { TechnologyDefinition } from '../../types';

export const cdnjsTechnologyDefinition = {
	id: "cdnjs",
	name: "cdnjs",
	website: "https://cdnjs.com",
	description: "cdnjs is a free distributed JS library delivery service.",
	icon: "cdnjs.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cdnjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cdnjs:dom:1",
			kind: "dom",
			selector: "link[href*='cdnjs.cloudflare.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"cloudflare",
	],
} as const satisfies TechnologyDefinition;
