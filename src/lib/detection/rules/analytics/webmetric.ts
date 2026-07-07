import type { TechnologyDefinition } from '../../types';

export const webmetricTechnologyDefinition = {
	id: "webmetric",
	name: "WebMetric",
	website: "https://webmetric.ir/",
	icon: "WebMetric.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "webmetric:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.webmetric\\.ir"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webmetric:jsGlobal:1",
			kind: "jsGlobal",
			property: "_wmid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webmetric:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_wmuid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
