import type { TechnologyDefinition } from '../../types';

export const weblateTechnologyDefinition = {
	id: "weblate",
	name: "Weblate",
	website: "https://weblate.org",
	description: "Weblate is a web-based continuous localization platform that enables ongoing translation management and integration across software projects.",
	icon: "Weblate.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "weblate:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.weblate\\.org", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "weblate:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.weblate\\.org", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:weblate:weblate:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
