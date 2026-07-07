import type { TechnologyDefinition } from '../../types';

export const jsOrgTechnologyDefinition = {
	id: "js-org",
	name: "JS.org",
	website: "https://js.org",
	description: "JS.org is a provider of free subdomains for JavaScript-based projects.",
	icon: "JSOrg.svg",
	categories: [
		"domain-parking",
	],
	rules: [
		{
			id: "js-org:dom:0",
			kind: "dom",
			selector: "link[href*='.js.org/'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
