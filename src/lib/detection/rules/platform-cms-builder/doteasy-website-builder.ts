import type { TechnologyDefinition } from '../../types';

export const doteasyWebsiteBuilderTechnologyDefinition = {
	id: "doteasy-website-builder",
	name: "Doteasy Website Builder",
	website: "https://www.doteasy.com/website-builder/",
	description: "Doteasy Website Builder is a tool provided by Doteasy, a web hosting company that enables users to create and personalise their own websites without necessitating any technical knowledge or expertise in website design.",
	icon: "Doteasy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "doteasy-website-builder:jsGlobal:0",
			kind: "jsGlobal",
			property: "fsData.fs",
			valuePattern: new RegExp("\\.dotezcdn\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"doteasy",
	],
} as const satisfies TechnologyDefinition;
