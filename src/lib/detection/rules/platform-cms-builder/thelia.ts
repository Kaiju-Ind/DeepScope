import type { TechnologyDefinition } from '../../types';

export const theliaTechnologyDefinition = {
	id: "thelia",
	name: "Thelia",
	website: "https://thelia.net",
	description: "Thelia is an open-source ecommerce platform based on the Symfony framework, designed for creating customized and scalable ecommerce sites.",
	icon: "Thelia.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "thelia:html:0",
			kind: "html",
			pattern: new RegExp("<(?:link|style|script)[^>]+\\/assets\\/frontOffice\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "thelia:dom:1",
			kind: "dom",
			selector: "link[href*='/assets/frontOffice/'], style[href*='/assets/frontOffice/'], script[src*='/assets/frontOffice/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "thelia:html:2",
			kind: "html",
			pattern: new RegExp("<(?:link|style|script)[^>]+\\/assets\\/frontoffice\\/"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
