import type { TechnologyDefinition } from '../../types';

export const optinmonsterPluginTechnologyDefinition = {
	id: "optinmonster-plugin",
	name: "OptinMonster plugin",
	website: "https://optinmonster.com",
	description: "OptinMonster is a lead-generation plugin for WordPress.",
	icon: "OptinMonster.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "optinmonster-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/optinmonster\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"optinmonster",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
