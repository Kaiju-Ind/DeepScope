import type { TechnologyDefinition } from '../../types';

export const phppgadminTechnologyDefinition = {
	id: "phppgadmin",
	name: "phpPgAdmin",
	website: "https://phppgadmin.sourceforge.net",
	description: "phpPgAdmin is a web-based administration tool for managing PostgreSQL databases.",
	icon: "phpPgAdmin.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "phppgadmin:html:0",
			kind: "html",
			pattern: new RegExp("(?:<title>phpPgAdmin<\\/title>|<span class=\"appname\">phpPgAdmin)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phppgadmin:html:1",
			kind: "html",
			pattern: new RegExp("(?:<title>phppgadmin<\\/title>|<span class=\"appname\">phppgadmin)"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:phppgadmin_project:phppgadmin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
