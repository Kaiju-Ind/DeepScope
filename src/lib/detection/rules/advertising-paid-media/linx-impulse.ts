import type { TechnologyDefinition } from '../../types';

export const linxImpulseTechnologyDefinition = {
	id: "linx-impulse",
	name: "Linx Impulse",
	website: "https://www.linx.com.br/linx-impulse",
	description: "Linx Impulse is a personalisation, media and retargeting solutions built by Linx.",
	icon: "Linx.png",
	categories: [
		"advertising-paid-media",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "linx-impulse:dom:0",
			kind: "dom",
			selector: "link[href*='.linximpulse.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "linx-impulse:jsGlobal:1",
			kind: "jsGlobal",
			property: "linx.banner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linx-impulse:jsGlobal:2",
			kind: "jsGlobal",
			property: "linxImpulse.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linx-impulse:jsGlobal:3",
			kind: "jsGlobal",
			property: "linxImpulseInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
