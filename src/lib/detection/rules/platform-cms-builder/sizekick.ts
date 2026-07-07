import type { TechnologyDefinition } from '../../types';

export const sizekickTechnologyDefinition = {
	id: "sizekick",
	name: "Sizekick",
	website: "https://www.sizekick.io",
	description: "Sizekick is a platform that uses artificial intelligence and precise body measurements to minimize size-related returns and increase conversion rates for online retailers.",
	icon: "Sizekick.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sizekick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.sizekick\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
