import type { TechnologyDefinition } from '../../types';

export const sparkpostTechnologyDefinition = {
	id: "sparkpost",
	name: "SparkPost",
	website: "https://www.sparkpost.com/",
	description: "SparkPost is an email infrastructure provider.",
	icon: "SparkPost.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sparkpost:dns:0",
			kind: "dns",
			valuePattern: new RegExp("sparkpostmail\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
