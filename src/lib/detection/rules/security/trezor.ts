import type { TechnologyDefinition } from '../../types';

export const trezorTechnologyDefinition = {
	id: "trezor",
	name: "Trezor",
	website: "https://trezor.io",
	description: "Trezor is a digital wallet that provides offline storage for cryptocurrency, protecting digital assets from online threats and unauthorized access.",
	icon: "Trezor.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "trezor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.trezor\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trezor:jsGlobal:1",
			kind: "jsGlobal",
			property: "TrezorConnect",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
