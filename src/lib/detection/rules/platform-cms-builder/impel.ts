import type { TechnologyDefinition } from '../../types';

export const impelTechnologyDefinition = {
	id: "impel",
	name: "Impel",
	website: "https://impel.ai",
	description: "Impel is an automotive software platform that provides digital retailing and merchandising tools designed to assist vehicle shoppers in evaluating and selecting cars online.",
	icon: "Impel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "impel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.impel\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "impel:jsGlobal:1",
			kind: "jsGlobal",
			property: "ImpelAna",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "impel:jsGlobal:2",
			kind: "jsGlobal",
			property: "ImpelSpinviewer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
