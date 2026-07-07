import type { TechnologyDefinition } from '../../types';

export const generatepressTechnologyDefinition = {
	id: "generatepress",
	name: "GeneratePress",
	website: "https://generatepress.com",
	description: "GeneratePress is a lightweight WordPress theme that focuses on speed, stability, and accessibility.",
	icon: "generatepress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "generatepress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/generatepress\\S*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "generatepress:dom:1",
			kind: "dom",
			selector: "body[class*='generatepress-theme']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "generatepress:dom:2",
			kind: "dom",
			selector: "link[id*='generate-style']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "generatepress:dom:3",
			kind: "dom",
			selector: "link[id*='generatepress']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "generatepress:jsGlobal:4",
			kind: "jsGlobal",
			property: "generatepressMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "generatepress:jsGlobal:5",
			kind: "jsGlobal",
			property: "generatepressNavSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "generatepress:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/generatepress\\s*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:generatepress:generatepress:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
