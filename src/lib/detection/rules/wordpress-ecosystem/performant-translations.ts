import type { TechnologyDefinition } from '../../types';

export const performantTranslationsTechnologyDefinition = {
	id: "performant-translations",
	name: "Performant Translations",
	website: "https://wordpress.org/plugins/performant-translations/",
	description: "Performance plugin from the WordPress Performance Team, which makes internationalization/localization in WordPress faster than ever before.",
	icon: "performant-translations.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "performant-translations:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^performant-translations ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
