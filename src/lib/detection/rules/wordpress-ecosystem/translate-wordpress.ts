import type { TechnologyDefinition } from '../../types';

export const translateWordpressTechnologyDefinition = {
	id: "translate-wordpress",
	name: "Translate WordPress",
	website: "https://gtranslate.io",
	description: "Translate WordPress is a website translator plugin which can translate any website to any language automatically. Translate WordPress plugin is now a part of GTranslate family.",
	icon: "GTranslate.svg",
	categories: [
		"wordpress-ecosystem",
		"translations",
	],
	rules: [
		{
			id: "translate-wordpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/google-language-translator\\/.+scripts\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
