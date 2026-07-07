import type { TechnologyDefinition } from '../../types';

export const termlyTechnologyDefinition = {
	id: "termly",
	name: "Termly",
	website: "https://termly.io/",
	description: "Termly provides free website policy resources and web-based policy creation software.",
	icon: "termly.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "termly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.termly\\.io\\/embed\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
