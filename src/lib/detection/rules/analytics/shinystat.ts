import type { TechnologyDefinition } from '../../types';

export const shinystatTechnologyDefinition = {
	id: "shinystat",
	name: "ShinyStat",
	website: "https://shinystat.com",
	icon: "ShinyStat.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "shinystat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/codice(?:business|ssl|pro|isp)?\\.shinystat\\.com\\/cgi-bin\\/getcod\\.cgi"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shinystat:html:1",
			kind: "html",
			pattern: new RegExp("<img[^>]*\\s+src=['\"]?https?:\\/\\/www\\.shinystat\\.com\\/cgi-bin\\/shinystat\\.cgi\\?[^'\"\\s>]*['\"\\s/>]"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shinystat:jsGlobal:2",
			kind: "jsGlobal",
			property: "SSsdk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
