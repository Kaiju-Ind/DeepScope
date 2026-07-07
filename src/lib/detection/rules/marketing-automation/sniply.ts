import type { TechnologyDefinition } from '../../types';

export const sniplyTechnologyDefinition = {
	id: "sniply",
	name: "Sniply",
	website: "https://sniply.io",
	description: "Sniply is a special URL shortener that allows users to add a call-to-action to any landing page.",
	icon: "Sniply.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sniply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gosniply\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sniply:jsGlobal:1",
			kind: "jsGlobal",
			property: "sniply.create_sniply_bar",
			description: "Page-owned global matches a known technology marker.",
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
