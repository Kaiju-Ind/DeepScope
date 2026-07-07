import type { TechnologyDefinition } from '../../types';

export const peerboardTechnologyDefinition = {
	id: "peerboard",
	name: "PeerBoard",
	website: "https://peerboard.com",
	description: "PeerBoard is a plug-and-play community solution, which helps groups, clubs, startups, marketplaces and businesses create discussion forums.",
	icon: "PeerBoard.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "peerboard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.peerboard\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
