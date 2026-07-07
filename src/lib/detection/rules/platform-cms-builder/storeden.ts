import type { TechnologyDefinition } from '../../types';

export const storedenTechnologyDefinition = {
	id: "storeden",
	name: "Storeden",
	website: "https://www.storeden.com",
	icon: "storeden.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storeden:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Storeden", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "storeden:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("storeden", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
