import type { TechnologyDefinition } from '../../types';

export const seospheraTechnologyDefinition = {
	id: "seosphera",
	name: "Seosphera",
	website: "https://seosphera.com",
	description: "Seosphera is a web development platform designed to build, manage, and deploy websites and web applications.",
	icon: "Seosphera.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "seosphera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.seosphera\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seosphera:dom:1",
			kind: "dom",
			selector: "link[href*='.seosphera.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
