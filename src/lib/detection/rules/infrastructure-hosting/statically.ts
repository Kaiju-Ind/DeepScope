import type { TechnologyDefinition } from '../../types';

export const staticallyTechnologyDefinition = {
	id: "statically",
	name: "Statically",
	website: "https://statically.io",
	description: "Statically is a free, fast and modern CDN for open-source projects, WordPress, images, and any static assets.",
	icon: "Statically.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "statically:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.statically\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "statically:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.statically.io/'], a[href*='cdn.statically.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "statically:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^statically$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "statically:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^statically$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
