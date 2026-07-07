import type { TechnologyDefinition } from '../../types';

export const fastSimonTechnologyDefinition = {
	id: "fast-simon",
	name: "Fast Simon",
	website: "https://www.fastsimon.com",
	description: "Fast Simon is a solution for shopping optimization in ecommerce, enhancing search, navigation, and merchandising to improve online retail performance.",
	icon: "FastSimon.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fast-simon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fastsimon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fast-simon:jsGlobal:1",
			kind: "jsGlobal",
			property: "FastSimonAppType",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fast-simon:jsGlobal:2",
			kind: "jsGlobal",
			property: "FastSimonReporting",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
