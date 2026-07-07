import type { TechnologyDefinition } from '../../types';

export const googleCloudTechnologyDefinition = {
	id: "google-cloud",
	name: "Google Cloud",
	website: "https://cloud.google.com",
	description: "Google Cloud is a suite of cloud computing services.",
	icon: "Google Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:google:cloud_platform:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
