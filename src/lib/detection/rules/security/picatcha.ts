import type { TechnologyDefinition } from '../../types';

export const picatchaTechnologyDefinition = {
	id: "picatcha",
	name: "Picatcha",
	website: "https://picatcha.com",
	description: "Picatcha is a CAPTCHA technology designed to provide a usable and secure way to verify human users and prevent automated access.",
	icon: "Picatcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "picatcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.picatcha\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "picatcha:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.picatcha\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
