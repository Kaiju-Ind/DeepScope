import type { TechnologyDefinition } from '../../types';

export const flexypeTechnologyDefinition = {
	id: "flexype",
	name: "FlexyPe",
	website: "https://flexype.io",
	description: "FlexyPe is a platform for ecommerce brands that addresses high return-to-origin rates, low prepaid adoption, and drop-offs while increasing average order value through targeted discounts and optimized upselling.",
	icon: "FlexyPe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flexype:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.flexype\\.in"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flexype:jsGlobal:1",
			kind: "jsGlobal",
			property: "flexypeCartActive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flexype:jsGlobal:2",
			kind: "jsGlobal",
			property: "flexypeCartConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
