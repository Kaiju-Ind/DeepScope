import type { TechnologyDefinition } from '../../types';

export const kameleoonTechnologyDefinition = {
	id: "kameleoon",
	name: "Kameleoon",
	website: "https://kameleoon.com/",
	description: "Kameleoon is a personalisation technology platform for real-time omnichannel optimisation and conversion.",
	icon: "Kameleoon.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "kameleoon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kameleoon\\.\\w+\\/kameleoon\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kameleoon:dom:1",
			kind: "dom",
			selector: "link[href*='.kameleoon.eu/kameleoon.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kameleoon:jsGlobal:2",
			kind: "jsGlobal",
			property: "Kameleoon.Gatherer.SCRIPT_VERSION",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kameleoon:jsGlobal:3",
			kind: "jsGlobal",
			property: "kameleoonEndLoadTime",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kameleoon:jsGlobal:4",
			kind: "jsGlobal",
			property: "kameleoonS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kameleoon:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^kameleoonVisitorCode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kameleoon:jsGlobal:6",
			kind: "jsGlobal",
			property: "kameleoonIframeURL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kameleoon:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^kameleoonvisitorcode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
