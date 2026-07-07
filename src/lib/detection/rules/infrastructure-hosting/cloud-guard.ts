import type { TechnologyDefinition } from '../../types';

export const cloudGuardTechnologyDefinition = {
	id: "cloud-guard",
	name: "Cloud Guard",
	website: "https://cloudguard.ir",
	description: "CloudGuard is a cybersecurity solutions provider focused on cloud security.",
	icon: "Cloud Guard.svg",
	categories: [
		"infrastructure-hosting",
		"security",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
