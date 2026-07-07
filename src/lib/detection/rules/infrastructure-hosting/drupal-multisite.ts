import type { TechnologyDefinition } from '../../types';

export const drupalMultisiteTechnologyDefinition = {
	id: "drupal-multisite",
	name: "Drupal Multisite",
	website: "https://www.drupal.org/docs/multisite-drupal",
	description: "Drupal Multisite enables separate, independent sites to be served from a single codebase.",
	icon: "Drupal.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "drupal-multisite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sites\\/(?!.*(default|all)).*\\/(?:files|themes|modules)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal-multisite:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sites\\/(?!(?:default|all)\\/).*\\/(?:files|themes|modules)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal-multisite:dom:2",
			kind: "dom",
			selector: "figure[style*='/sites/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "drupal-multisite:dom:3",
			kind: "dom",
			selector: "img[src*='/sites/'], img[srcset*='/sites/'], source[srcset*='/sites/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "drupal-multisite:html:4",
			kind: "html",
			pattern: new RegExp("\\/sites\\/(?!(?:default|all)\\/)[^\"'<>]+\\/(?:files|themes|modules)\\/", "i"),
			confidence: 90,
			description: "Document HTML contains a non-default Drupal multisite asset path.",
		},
		{
			id: "drupal-multisite:text:5",
			kind: "text",
			pattern: new RegExp("\\/sites\\/(?!(?:default|all)\\/).*\\/(?:files|themes|modules)\\/"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"drupal",
	],
	requires: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
