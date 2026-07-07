import type { TechnologyDefinition } from '../../types';

export const directadminTechnologyDefinition = {
	id: "directadmin",
	name: "DirectAdmin",
	website: "https://www.directadmin.com",
	description: "DirectAdmin is a graphical web-based web hosting control panel designed to make administration of websites easier.",
	icon: "DirectAdmin.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "directadmin:html:0",
			kind: "html",
			pattern: new RegExp("<a[^>]+>DirectAdmin<\\/a> Web Control Panel"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "directadmin:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("DirectAdmin Daemon v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "directadmin:html:2",
			kind: "html",
			pattern: new RegExp("<a[^>]+>directadmin<\\/a> web control panel"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "directadmin:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("directadmin daemon v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:directadmin:directadmin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"php",
	],
} as const satisfies TechnologyDefinition;
