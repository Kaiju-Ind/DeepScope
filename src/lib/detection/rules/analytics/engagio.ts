import type { TechnologyDefinition } from '../../types';

export const engagioTechnologyDefinition = {
	id: "engagio",
	name: "Engagio",
	website: "https://www.engagio.com/",
	icon: "Engagio.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "engagio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web-analytics\\.engagio\\.com\\/js\\/ei\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "engagio:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("web-analytics\\.engagio\\.com\\/api\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
