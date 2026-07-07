import type { TechnologyDefinition } from '../../types';

export const lobbypmsTechnologyDefinition = {
	id: "lobbypms",
	name: "LobbyPMS",
	website: "https://lobbypms.com",
	description: "LobbyPMS is a platform developed to streamline daily accommodation management.",
	icon: "LobbyPMS.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "lobbypms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.lobbypms\\.com"),
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
