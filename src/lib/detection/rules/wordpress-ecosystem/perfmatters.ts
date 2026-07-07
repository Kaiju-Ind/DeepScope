import type { TechnologyDefinition } from '../../types';

export const perfmattersTechnologyDefinition = {
	id: "perfmatters",
	name: "Perfmatters",
	website: "https://perfmatters.io",
	description: "Perfmatters is a performance optimisation plugin for WordPress websites.",
	icon: "Perfmatters.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "perfmatters:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/(?:plugins|cache|uploads)\\/perfmatters\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:perfmatters:perfmatters:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
