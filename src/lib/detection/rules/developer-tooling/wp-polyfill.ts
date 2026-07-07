import type { TechnologyDefinition } from '../../types';

export const wpPolyfillTechnologyDefinition = {
	id: "wp-polyfill",
	name: "WordPress Polyfill",
	website: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-polyfill/",
	description: "WordPress Polyfill provides browser compatibility helpers for WordPress front-end and editor scripts.",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "wp-polyfill:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp-includes/js/dist/vendor/wp-polyfill(?:\\.min)?\\.js(?:[^\"\\']*[?&]ver=([^&\"\\']+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			confidence: 100,
			description: "WordPress polyfill vendor script is declared.",
		},
		{
			id: "wp-polyfill:resourceUrl:1",
			kind: "resourceUrl",
			pattern: new RegExp("/wp-includes/js/dist/vendor/wp-polyfill(?:\\.min)?\\.js(?:[^\"\\']*[?&]ver=([^&\"\\']+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			confidence: 100,
			description: "WordPress polyfill vendor script loaded in resource timeline.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
