import type { TechnologyDefinition } from '../../types';

export const ostrIoTechnologyDefinition = {
	id: "ostr-io",
	name: "ostr.io",
	website: "https://ostr.io",
	description: "ostr.io is a platform that provides site monitoring and analytics services, enabling the collection and analysis of performance and usage data.",
	icon: "ostr.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ostr-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.ostr\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
