import type { TechnologyDefinition } from '../../types';

export const sitespectTechnologyDefinition = {
	id: "sitespect",
	name: "SiteSpect",
	website: "https://www.sitespect.com",
	description: "SiteSpect is the A/B testing and optimisation solution.",
	icon: "SiteSpect.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sitespect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/__ssobj\\/core\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitespect:jsGlobal:1",
			kind: "jsGlobal",
			property: "ss_dom_var",
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
