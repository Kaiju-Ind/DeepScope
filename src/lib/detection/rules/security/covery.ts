import type { TechnologyDefinition } from '../../types';

export const coveryTechnologyDefinition = {
	id: "covery",
	name: "Covery",
	website: "https://covery.ai",
	description: "Covery is a risk management platform that provides KYC and device fingerprinting fraud detection tools to prevent identity theft and fraudulent transactions.",
	icon: "Covery.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "covery:jsGlobal:0",
			kind: "jsGlobal",
			property: "handleCoveryFpKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "covery:jsGlobal:1",
			kind: "jsGlobal",
			property: "sendCoveryFpKey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
