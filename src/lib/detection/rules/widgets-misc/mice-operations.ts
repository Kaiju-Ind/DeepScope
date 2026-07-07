import type { TechnologyDefinition } from '../../types';

export const miceOperationsTechnologyDefinition = {
	id: "mice-operations",
	name: "MICE Operations",
	website: "https://www.miceoperations.com",
	description: "MICE Operations is a software solution tailored for event venues, catering, and hospitality businesses, streamlining operational processes, sales, and client relationship management.",
	icon: "MICEOperations.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mice-operations:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.miceoperations\\.com\\/widget\\/widget\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mice-operations:jsGlobal:1",
			kind: "jsGlobal",
			property: "miceWidgetSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
