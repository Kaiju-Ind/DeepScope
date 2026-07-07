import type { TechnologyDefinition } from '../../types';

export const appfolioTechnologyDefinition = {
	id: "appfolio",
	name: "Appfolio",
	website: "https://www.appfolio.com",
	description: "AppFolio is a property management software platform that provides tools for managing residential and commercial properties.",
	icon: "AppFolio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "appfolio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/listings-for-appfolio-pro\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appfolio:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.appfolio\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
