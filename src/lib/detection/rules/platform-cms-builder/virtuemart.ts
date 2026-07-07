import type { TechnologyDefinition } from '../../types';

export const virtuemartTechnologyDefinition = {
	id: "virtuemart",
	name: "VirtueMart",
	website: "https://virtuemart.net",
	description: "VirtueMart is an open-source ecommerce solution designed as an extension for Joomla, allowing users to build and manage online stores with features for product management, payment processing, and order fulfillment.",
	icon: "VirtueMart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "virtuemart:html:0",
			kind: "html",
			pattern: new RegExp("<div id=\"vmMainPage"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "virtuemart:dom:1",
			kind: "dom",
			selector: "div#vmMainPage",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "virtuemart:html:2",
			kind: "html",
			pattern: new RegExp("<div id=\"vmmainpage"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:virtuemart:virtuemart:*:*:*:*:*:joomla\\!:*:*",
	},
	implies: [
		"joomla",
	],
	requires: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
