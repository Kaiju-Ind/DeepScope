import type { TechnologyDefinition } from '../../types';

export const guidapTechnologyDefinition = {
	id: "guidap",
	name: "Guidap",
	website: "https://guidap.com",
	description: "Guidap is a platform enabling online activity sales, streamlining booking, scheduling, and payment collection processes across all devices, without commissions.",
	icon: "Guidap.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "guidap:dom:0",
			kind: "dom",
			selector: "link[href*='//cart.guidap.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "guidap:jsGlobal:1",
			kind: "jsGlobal",
			property: "GUIDAP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "guidap:jsGlobal:2",
			kind: "jsGlobal",
			property: "GUIDAPInitConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
