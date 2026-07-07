import type { TechnologyDefinition } from '../../types';

export const sympaTechnologyDefinition = {
	id: "sympa",
	name: "Sympa",
	website: "https://www.sympa.org/",
	description: "Sympa is an open-source mailing list management (MLM) software.",
	icon: "sympa.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sympa:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"https?:\\/\\/www\\.sympa\\.org\">\\s*Powered by Sympa\\s*<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sympa:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sympa$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sympa:html:2",
			kind: "html",
			pattern: new RegExp("<a href=\"https?:\\/\\/www\\.sympa\\.org\">\\s*powered by sympa\\s*<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sympa:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sympa$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sympa:sympa:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
