import type { TechnologyDefinition } from '../../types';

export const leadinfoTechnologyDefinition = {
	id: "leadinfo",
	name: "Leadinfo",
	website: "https://www.leadinfo.com",
	description: "Leadinfo is a lead generation software that enables you to recognise B2B website visitors.",
	icon: "Leadinfo.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leadinfo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.leadinfo\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadinfo:jsGlobal:1",
			kind: "jsGlobal",
			property: "GlobalLeadinfoNamespace",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leadinfo:jsGlobal:2",
			kind: "jsGlobal",
			property: "leadinfo",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
