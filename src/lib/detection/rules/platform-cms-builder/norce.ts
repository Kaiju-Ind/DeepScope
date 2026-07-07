import type { TechnologyDefinition } from '../../types';

export const norceTechnologyDefinition = {
	id: "norce",
	name: "Norce",
	website: "https://www.norce.io/",
	description: "Norce is a headless SaaS platform for digital commerce, designed to support companies with advanced needs.",
	icon: "Norce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "norce:html:0",
			kind: "html",
			pattern: new RegExp("<(?:div|aside) id=\"jetshop-branding\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "norce:dom:1",
			kind: "dom",
			selector: "link[href*='.jetshop.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "norce:dom:2",
			kind: "dom",
			selector: "div#jetshop-branding",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "norce:dom:3",
			kind: "dom",
			selector: "aside#jetshop-branding",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "norce:jsGlobal:4",
			kind: "jsGlobal",
			property: "JetshopData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "norce:dom:5",
			kind: "dom",
			selector: "link[href*='.jetshop.io'], div#jetshop-branding, aside#jetshop-branding",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
