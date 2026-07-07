import type { TechnologyDefinition } from '../../types';

export const transpondTechnologyDefinition = {
	id: "transpond",
	name: "Transpond",
	website: "https://transpond.io",
	description: "Transpond is a marketing platform that provides tools for campaign management, audience engagement, and performance tracking to support business marketing strategies.",
	icon: "Transpond.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "transpond:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.transpond\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "transpond:dom:1",
			kind: "dom",
			selector: "api\\.transpond\\.io",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
