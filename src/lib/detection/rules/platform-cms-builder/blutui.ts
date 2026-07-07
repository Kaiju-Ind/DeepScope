import type { TechnologyDefinition } from '../../types';

export const blutuiTechnologyDefinition = {
	id: "blutui",
	name: "Blutui",
	website: "https://blutui.com",
	description: "Blutui is a web platform designed for creative agencies to build, manage, and deploy client websites.",
	icon: "Blutui.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "blutui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.blutui\\.com"),
			description: "Script source URL matches a known technology marker.",
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
