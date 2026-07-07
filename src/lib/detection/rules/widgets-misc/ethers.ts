import type { TechnologyDefinition } from '../../types';

export const ethersTechnologyDefinition = {
	id: "ethers",
	name: "Ethers",
	website: "https://ethers.org/",
	description: "Ethers is a complete, tiny and simple Ethereum library.",
	icon: "Ethers.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ethers:jsGlobal:0",
			kind: "jsGlobal",
			property: "_ethers",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
