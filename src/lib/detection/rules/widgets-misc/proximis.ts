import type { TechnologyDefinition } from '../../types';

export const proximisTechnologyDefinition = {
	id: "proximis",
	name: "Proximis",
	website: "https://www.proximis.com",
	icon: "Proximis Omnichannel.png",
	categories: [
		"widgets-misc",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "proximis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget-commerce(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
