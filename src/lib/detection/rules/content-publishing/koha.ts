import type { TechnologyDefinition } from '../../types';

export const kohaTechnologyDefinition = {
	id: "koha",
	name: "Koha",
	website: "https://koha-community.org/",
	description: "Koha is an open-source Integrated Library System (ILS).",
	icon: "koha.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "koha:html:0",
			kind: "html",
			pattern: new RegExp("<input name=\"koha_login_context\" value=\"intranet\" type=\"hidden\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koha:html:1",
			kind: "html",
			pattern: new RegExp("<a href=\"\\/cgi-bin\\/koha\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koha:jsGlobal:2",
			kind: "jsGlobal",
			property: "KOHA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "koha:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Koha ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "koha:dom:4",
			kind: "dom",
			selector: "input[name*='koha_login_context'][type='hidden'], a[href*='/cgi-bin/koha/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "koha:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^koha ([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:koha:koha:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
