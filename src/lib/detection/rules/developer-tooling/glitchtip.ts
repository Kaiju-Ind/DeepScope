import type { TechnologyDefinition } from '../../types';

export const glitchtipTechnologyDefinition = {
	id: "glitchtip",
	name: "GlitchTip",
	website: "https://glitchtip.com",
	description: "GlitchTip is an open-source platform for error tracking, monitoring errors, performance, and uptime.",
	icon: "GlitchTip.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "glitchtip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.glitchtip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "glitchtip:dom:1",
			kind: "dom",
			selector: "gt-root + noscript",
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
