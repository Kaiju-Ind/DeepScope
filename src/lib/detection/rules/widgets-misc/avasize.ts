import type { TechnologyDefinition } from '../../types';

export const avasizeTechnologyDefinition = {
	id: "avasize",
	name: "Avasize",
	website: "https://www.avasize.com",
	icon: "Avasize.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "avasize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.avasize\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
