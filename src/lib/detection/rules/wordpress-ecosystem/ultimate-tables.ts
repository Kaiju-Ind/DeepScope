import type { TechnologyDefinition } from '../../types';

export const ultimateTablesTechnologyDefinition = {
	id: "ultimate-tables",
	name: "Ultimate Tables",
	website: "https://wphive.com/plugins/ultimate-tables",
	description: "Ultimate Tables is a tool for creating, managing, and designing tables without writing HTML code.",
	icon: "UltimateTables.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimate-tables:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ultimate-tables\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
