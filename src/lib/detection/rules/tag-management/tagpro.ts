import type { TechnologyDefinition } from '../../types';

export const tagproTechnologyDefinition = {
	id: "tagpro",
	name: "TagPro",
	website: "https://tagpro.adpromedia.net",
	description: "TagPro is software that updates and allows you to manage tags within websites, identifying various types of variables to optimise loads for advertising.",
	icon: "TagPro.png",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "tagpro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tagpro\\.adpromedia\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tagpro:jsGlobal:1",
			kind: "jsGlobal",
			property: "initAdproTags",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
