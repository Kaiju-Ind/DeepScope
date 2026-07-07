import type { TechnologyDefinition } from '../../types';

export const jotformTechnologyDefinition = {
	id: "jotform",
	name: "Jotform",
	website: "https://www.jotform.com",
	description: "Jotform is an online form builder that enables the creation of robust forms.",
	icon: "Jotform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "jotform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jotform\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jotform:jsGlobal:1",
			kind: "jsGlobal",
			property: "JOTFORM_ENV",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jotform:jsGlobal:2",
			kind: "jsGlobal",
			property: "JotForm.FBCollectInformation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jotform:jsGlobal:3",
			kind: "jsGlobal",
			property: "JotFormActions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
