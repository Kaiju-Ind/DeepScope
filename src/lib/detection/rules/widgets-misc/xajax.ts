import type { TechnologyDefinition } from '../../types';

export const xajaxTechnologyDefinition = {
	id: "xajax",
	name: "Xajax",
	website: "https://xajax-project.org",
	icon: "Xajax.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "xajax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("xajax_core.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xajax:xajax:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
