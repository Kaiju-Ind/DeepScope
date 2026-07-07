import type { TechnologyDefinition } from '../../types';

export const enagicTechnologyDefinition = {
	id: "enagic",
	name: "Enagic",
	website: "https://www.enagicwebsystem.com",
	description: "Enagic is a content management system (CMS) business website builder designed to help companies create, manage, and organize their online presence through structured content and customizable templates.",
	icon: "Enagic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enagic:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.enagicwebsystem\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
