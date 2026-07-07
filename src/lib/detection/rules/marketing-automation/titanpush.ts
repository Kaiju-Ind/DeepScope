import type { TechnologyDefinition } from '../../types';

export const titanpushTechnologyDefinition = {
	id: "titanpush",
	name: "TITANPush",
	website: "https://www.titanpush.com",
	description: "TITANPush is a platform offering tools that assist brands in increasing sales through their websites and improving customer communication without requiring programming knowledge.",
	icon: "TITANPush.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "titanpush:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.titanpush\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "titanpush:jsGlobal:1",
			kind: "jsGlobal",
			property: "titanPush",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "titanpush:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpnObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
