import type { TechnologyDefinition } from '../../types';

export const magiclabsTechnologyDefinition = {
	id: "magiclabs",
	name: "MagicLabs",
	website: "https://magic.link",
	description: "MagicLabs is a platform that simplifies creating and using Web3 wallets by eliminating the need for seed phrases or downloads, providing a way to build on-chain solutions.",
	icon: "MagicLabs.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "magiclabs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.auth\\.magic\\.link"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magiclabs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Magic.AuthEventOnReceived",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
