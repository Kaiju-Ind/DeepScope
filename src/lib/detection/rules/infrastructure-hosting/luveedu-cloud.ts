import type { TechnologyDefinition } from '../../types';

export const luveeduCloudTechnologyDefinition = {
	id: "luveedu-cloud",
	name: "Luveedu Cloud",
	website: "https://cloud.luveedu.com",
	description: "Luveedu Cloud is a domain and web hosting platform.",
	icon: "LuveeduCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "luveedu-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.luveedu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
