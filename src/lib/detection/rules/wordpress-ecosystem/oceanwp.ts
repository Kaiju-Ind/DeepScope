import type { TechnologyDefinition } from '../../types';

export const oceanwpTechnologyDefinition = {
	id: "oceanwp",
	name: "OceanWP",
	website: "https://oceanwp.org",
	description: "OceanWP is a fast-loading WordPress theme that has great support for third-party plugins and drag-and-drop page builders.",
	icon: "OceanWP.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "oceanwp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/oceanwp\\S*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oceanwp:dom:1",
			kind: "dom",
			selector: "body[class*='oceanwp-theme']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oceanwp:dom:2",
			kind: "dom",
			selector: "link[id*='oceanwp']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oceanwp:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/oceanwp\\s*\\.js(?:\\?ver=([0-9.]+))?"),
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
			"recurring",
		],
		cpe: "cpe:2.3:a:oceanwp:oceanwp:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
