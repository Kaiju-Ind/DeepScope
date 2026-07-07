import type { TechnologyDefinition } from '../../types';

export const spectraTechnologyDefinition = {
	id: "spectra",
	name: "Spectra",
	website: "https://wpspectra.com",
	description: "Spectra is a WordPress plugin that provides a collection of new and enhanced blocks for the WordPress Block editor.",
	icon: "Spectra.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "spectra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ultimate-addons-for-gutenberg\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spectra:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/ultimate-addons-for-gutenberg/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:brainstormforce:spectra:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"gutenberg",
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
