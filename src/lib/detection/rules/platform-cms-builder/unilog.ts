import type { TechnologyDefinition } from '../../types';

export const unilogTechnologyDefinition = {
	id: "unilog",
	name: "Unilog",
	website: "https://unilogcorp.com",
	description: "Unilog is a cloud-based ecommerce platform, designed specifically for B2B businesses.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unilog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.unilogcorp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unilog:jsGlobal:1",
			kind: "jsGlobal",
			property: "Unilog",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
