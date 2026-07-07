import type { TechnologyDefinition } from '../../types';

export const roundcubeTechnologyDefinition = {
	id: "roundcube",
	name: "RoundCube",
	website: "https://roundcube.net",
	description: "RoundCube is free and open-source web-based IMAP email client.",
	icon: "RoundCube.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "roundcube:html:0",
			kind: "html",
			pattern: new RegExp("<title>RoundCube"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "roundcube:jsGlobal:1",
			kind: "jsGlobal",
			property: "rcmail",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roundcube:jsGlobal:2",
			kind: "jsGlobal",
			property: "roundcube",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roundcube:html:3",
			kind: "html",
			pattern: new RegExp("<title>roundcube"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:roundcube:webmail:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
