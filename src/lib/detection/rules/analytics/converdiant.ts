import type { TechnologyDefinition } from '../../types';

export const converdiantTechnologyDefinition = {
	id: "converdiant",
	name: "Converdiant",
	website: "https://www.converdiant.com",
	description: "Converdiant is a conversion optimization system that analyzes user behavior and website performance data to improve engagement, streamline customer journeys, and increase conversion rates through data-driven insights.",
	icon: "Converdiant.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "converdiant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.converdiant\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
