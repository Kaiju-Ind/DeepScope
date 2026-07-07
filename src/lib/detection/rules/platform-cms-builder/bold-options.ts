import type { TechnologyDefinition } from '../../types';

export const boldOptionsTechnologyDefinition = {
	id: "bold-options",
	name: "Bold Options",
	website: "https://boldcommerce.com/shopify",
	description: "Bold Options is a system that provides unlimited product options for selection and management.",
	icon: "BoldOptions.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bold-options:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("option\\.boldapps\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-options:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.options",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bold-options:jsGlobal:2",
			kind: "jsGlobal",
			property: "BOLD.options.app_script_version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
