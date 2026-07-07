import type { TechnologyDefinition } from '../../types';

export const herokuTechnologyDefinition = {
	id: "heroku",
	name: "Heroku",
	website: "https://www.heroku.com/",
	description: "Heroku is a cloud platform as a service (PaaS) supporting several programming languages.",
	icon: "heroku.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "heroku:url:0",
			kind: "url",
			pattern: new RegExp("\\.herokuapp\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "heroku:header:1",
			kind: "header",
			key: "Via",
			valuePattern: new RegExp("[\\d.-]+ vegur$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "heroku:dns:2",
			kind: "dns",
			valuePattern: new RegExp("heroku-domain-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "heroku:header:3",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("[\\d.-]+ vegur$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
