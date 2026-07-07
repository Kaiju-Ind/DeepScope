import type { TechnologyDefinition } from '../../types';

export const squirrelmailTechnologyDefinition = {
	id: "squirrelmail",
	name: "SquirrelMail",
	website: "https://squirrelmail.org",
	description: "SquirrelMail is an open-source web-mail package that is based on PHP language. It provides a web-based-email client and a proxy server for IMAP protocol.",
	icon: "SquirrelMail.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "squirrelmail:html:0",
			kind: "html",
			pattern: new RegExp("<small>SquirrelMail version ([.\\d]+)[^<]*<br "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "squirrelmail:url:1",
			kind: "url",
			pattern: new RegExp("\\/src\\/webmail\\.php(?:$|\\?)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "squirrelmail:jsGlobal:2",
			kind: "jsGlobal",
			property: "squirrelmail_loginpage_onload",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squirrelmail:html:3",
			kind: "html",
			pattern: new RegExp("<small>squirrelmail version ([.\\d]+)[^<]*<br "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:squirrelmail:squirrelmail:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
