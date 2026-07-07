import type { TechnologyDefinition } from '../../types';

export const nethouseWebsiteBuilderTechnologyDefinition = {
	id: "nethouse-website-builder",
	name: "Nethouse Website Builder",
	website: "https://nethouse.ru",
	description: "Nethouse Website Builder is a platform enabling individuals to craft websites, online stores, or landing pages independently, without the need for programmers or designers.",
	icon: "Nethouse.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nethouse-website-builder:jsGlobal:0",
			kind: "jsGlobal",
			property: "Nethouse",
			description: "Page-owned global matches a known technology marker.",
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
