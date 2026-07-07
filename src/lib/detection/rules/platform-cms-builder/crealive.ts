import type { TechnologyDefinition } from '../../types';

export const crealiveTechnologyDefinition = {
	id: "crealive",
	name: "Crealive",
	website: "https://crealive.net",
	description: "Crealive is a boutique digital agency.",
	icon: "Crealive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "crealive:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("-crealive\\.mncdn\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "crealive:dom:1",
			kind: "dom",
			selector: "div[class^='crealive'] > a[href*='.crealive.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crealive:dom:2",
			kind: "dom",
			selector: "a[href*='crealive.net'] > img[alt*='Crealive']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crealive:dom:3",
			kind: "dom",
			selector: "div[class^='crealive'] > a[href*='.crealive.net'], a[href*='crealive.net'] > img[alt*='Crealive']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"laravel",
		"mysql",
		"php",
	],
	requires: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
