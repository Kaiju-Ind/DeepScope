import type { TechnologyDefinition } from '../../types';

export const paesslerTechnologyDefinition = {
	id: "paessler",
	name: "Paessler",
	website: "https://www.paessler.com",
	description: "Paessler is a network monitoring platform that provides complete visibility into IT infrastructure through a single solution, helping detect, analyze, and resolve performance issues across systems and devices.",
	icon: "Paessler.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "paessler:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.paessler\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "paessler:dom:1",
			kind: "dom",
			selector: "span[class*='paesslerlogo'] > a[href*='www.paessler.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
