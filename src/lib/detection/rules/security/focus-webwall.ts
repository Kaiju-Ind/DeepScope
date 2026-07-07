import type { TechnologyDefinition } from '../../types';

export const focusWebwallTechnologyDefinition = {
	id: "focus-webwall",
	name: "FOCUS WebWall",
	website: "https://appsphere.app",
	description: "FOCUS WebWall is a zero-overhead security layer designed for websites using Cloudflare.",
	icon: "FOCUSWebWall.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "focus-webwall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/focus_webwall\\/.*?\\/focus-webwall\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
