import type { TechnologyDefinition } from '../../types';

export const q4CookieMonsterTechnologyDefinition = {
	id: "q4-cookie-monster",
	name: "Q4 Cookie Monster",
	website: "https://q4mobile.github.io/q4widgets-jquery-ui/doc_html/q4.cookieMonster.html",
	description: "Q4 Cookie Monster is an cookie compliance widget built by Q4.",
	icon: "Q4.png",
	categories: [
		"widgets-misc",
		"privacy-compliance",
	],
	rules: [
		{
			id: "q4-cookie-monster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.q4app\\.com\\/widgets\\/q4\\.cookiemonster\\.([\\d\\.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
