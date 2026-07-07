import type { TechnologyDefinition } from '../../types';

export const mollomTechnologyDefinition = {
	id: "mollom",
	name: "Mollom",
	website: "https://mollom.com",
	icon: "Mollom.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "mollom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mollom(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mollom:html:1",
			kind: "html",
			pattern: new RegExp("<img[^>]+\\.mollom\\.com"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:acquia:mollom:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
