import type { TechnologyDefinition } from '../../types';

export const powerfolioTechnologyDefinition = {
	id: "powerfolio",
	name: "Powerfolio",
	website: "https://powerfoliowp.com",
	description: "Powerfolio is a portfolio plugin for Elementor, offering various customization options for creating a tailored portfolio.",
	icon: "Powerfolio.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "powerfolio:dom:0",
			kind: "dom",
			selector: "link[id='elpt-portfolio-css-css'][href*='portfolio-elementor']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "powerfolio:dom:1",
			kind: "dom",
			selector: "style#powerfolio-portfolio-block-style-inline-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:pwrplugins:powerfolio:*:*:*:*:*:*:*:*",
	},
	requires: [
		"elementor",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
