import type { TechnologyDefinition } from '../../types';

export const surgeTechnologyDefinition = {
	id: "surge",
	name: "Surge",
	website: "https://surge.sh",
	description: "Surge is a static web publishing platform designed for front-end developers to deploy projects.",
	icon: "Surge.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "surge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("surge\\.sh(?:\\/[-\\w]{0,40})?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "surge:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.surge\\.sh"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "surge:url:2",
			kind: "url",
			pattern: new RegExp("surge\\.sh"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "surge:dom:3",
			kind: "dom",
			selector: "link[href*='.surge.sh/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
