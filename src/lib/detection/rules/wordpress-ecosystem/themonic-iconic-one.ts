import type { TechnologyDefinition } from '../../types';

export const themonicIconicOneTechnologyDefinition = {
	id: "themonic-iconic-one",
	name: "Themonic Iconic One",
	website: "https://themonic.com/iconic-one",
	description: "Themonic Iconic One is a premium quality WordPress theme with pixel perfect typography and responsiveness and is built for speed.",
	icon: "Themonic.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themonic-iconic-one:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/iconic-one(?:-[\\w]+)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
