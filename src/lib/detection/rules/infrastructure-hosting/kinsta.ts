import type { TechnologyDefinition } from '../../types';

export const kinstaTechnologyDefinition = {
	id: "kinsta",
	name: "Kinsta",
	website: "https://kinsta.com",
	description: "Kinsta is a managed WordPress hosting provider leveraging the Google Cloud Platform to offer high-performance, secure, and user-friendly hosting solutions for WordPress websites.",
	icon: "kinsta.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
