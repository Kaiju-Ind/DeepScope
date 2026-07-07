import type { TechnologyDefinition } from '../../types';

export const kirkiCustomizerFrameworkTechnologyDefinition = {
	id: "kirki-customizer-framework",
	name: "Kirki Customizer Framework",
	website: "https://kirki.org",
	description: "Kirki Customizer Framework is a toolkit allowing WordPress developers to use the Customizer and take advantage of its advanced features and flexibility by abstracting the code.",
	icon: "Kirki Customizer Framework.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "kirki-customizer-framework:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/kirki\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kirki-customizer-framework:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/kirki/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"poa",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
