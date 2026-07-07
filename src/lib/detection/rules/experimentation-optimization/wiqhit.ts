import type { TechnologyDefinition } from '../../types';

export const wiqhitTechnologyDefinition = {
	id: "wiqhit",
	name: "Wiqhit",
	website: "https://www.wiqhit.com",
	description: "Wiqhit is an online personalization tool that customizes website content to engage visitors and increase conversions through tailored user experiences.",
	icon: "Wiqhit.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "wiqhit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wiqhit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
