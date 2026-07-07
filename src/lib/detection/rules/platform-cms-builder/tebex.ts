import type { TechnologyDefinition } from '../../types';

export const tebexTechnologyDefinition = {
	id: "tebex",
	name: "Tebex",
	website: "https://www.tebex.io",
	description: "Tebex specialises in providing gcommerce solutions for online games.",
	icon: "Tebex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tebex:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.tebexLogin"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "tebex:dom:1",
			kind: "dom",
			selector: "a[href*='.tebex.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tebex:header:2",
			kind: "header",
			key: "tb-cache-country",
			valuePattern: new RegExp("^\\w+$", "i"),
			confidence: 50,
			description: "Response header matches a known technology marker.",
		},
		{
			id: "tebex:header:3",
			kind: "header",
			key: "tb-cache-group",
			valuePattern: new RegExp("^webstore$", "i"),
			confidence: 50,
			description: "Response header matches a known technology marker.",
		},
		{
			id: "tebex:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.tebex\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tebex:jsGlobal:5",
			kind: "jsGlobal",
			property: "Tebex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tebex:jsGlobal:6",
			kind: "jsGlobal",
			property: "Tebex.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tebex:scriptContent:7",
			kind: "scriptContent",
			pattern: new RegExp("\\.tebexlogin"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"mysql",
		"php",
		"sass",
	],
	requires: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
