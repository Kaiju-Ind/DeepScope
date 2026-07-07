import type { TechnologyDefinition } from '../../types';

export const formcraftTechnologyDefinition = {
	id: "formcraft",
	name: "FormCraft",
	website: "https://formcraft-wp.com",
	description: "FormCraft is a WordPress form builder plugin designed to create customizable, responsive forms for websites without requiring manual coding.",
	icon: "FormCraft.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formcraft:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/formcraft3/dist/formcraft-common.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:ncrafts:formcraft:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
