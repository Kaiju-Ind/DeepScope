import type { TechnologyDefinition } from '../../types';

export const cendynTechnologyDefinition = {
	id: "cendyn",
	name: "Cendyn",
	website: "https://www.cendyn.com",
	description: "Cendyn (formerly NextGuest) is a hospitality focused content management system.",
	icon: "cendyn.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cendyn:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^NextGuest CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cendyn:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("plugins\\.traveltripper\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cendyn:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^nextguest cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
