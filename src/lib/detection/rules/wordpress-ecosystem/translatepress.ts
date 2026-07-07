import type { TechnologyDefinition } from '../../types';

export const translatepressTechnologyDefinition = {
	id: "translatepress",
	name: "TranslatePress",
	website: "https://translatepress.com",
	description: "TranslatePress is a WordPress plugin that simplifies website translation, enabling multilingual functionality to enhance global traffic.",
	icon: "TranslatePress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "translatepress:jsGlobal:0",
			kind: "jsGlobal",
			property: "trp_el",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "translatepress:jsGlobal:1",
			kind: "jsGlobal",
			property: "trp_ls_shortcode_width",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "translatepress:jsGlobal:2",
			kind: "jsGlobal",
			property: "trp_ls_shortcodes",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
