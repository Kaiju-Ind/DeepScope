import type { TechnologyDefinition } from '../../types';

export const navigaTechnologyDefinition = {
	id: "naviga",
	name: "Naviga",
	website: "https://www.navigaglobal.com/",
	description: "Naviga is a content creation and management tool, formerly known as Infomaker, designed for media and publishing companies.",
	icon: "Naviga.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "naviga:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.infomaker\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "naviga:dom:1",
			kind: "dom",
			selector: "link[href*='.infomaker.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
