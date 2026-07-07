import type { TechnologyDefinition } from '../../types';

export const webestoolsTechnologyDefinition = {
	id: "webestools",
	name: "Webestools",
	website: "https://www.webestools.com",
	description: "Webestools is a platform offering online tools, including counters and widgets, for various functionalities.",
	icon: "Webestools.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "webestools:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.webestools\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webestools:dom:1",
			kind: "dom",
			selector: "iframe[src*='.webestools.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
