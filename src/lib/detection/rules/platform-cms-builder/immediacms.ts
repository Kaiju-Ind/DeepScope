import type { TechnologyDefinition } from '../../types';

export const immediacmsTechnologyDefinition = {
	id: "immediacms",
	name: "immediaCMS",
	website: "https://immediac.com/content-management-system",
	description: "immediaCMS is a content management system that enables users to create, edit, and organize digital content through a centralized platform for website and media management.",
	icon: "immediaCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "immediacms:jsGlobal:0",
			kind: "jsGlobal",
			property: "simpleCmsMetadata",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
