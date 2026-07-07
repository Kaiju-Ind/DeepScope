import type { TechnologyDefinition } from '../../types';

export const spexoAddonsTechnologyDefinition = {
	id: "spexo-addons",
	name: "Spexo Addons",
	website: "https://spexoaddons.com/",
	description: "Spexo Addons is a tool offering essential features for Elementor, enhancing website design and functionality in a single solution.",
	icon: "SpexoAddons.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "spexo-addons:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/sastra-essential-addons-for-elementor\\/"),
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
