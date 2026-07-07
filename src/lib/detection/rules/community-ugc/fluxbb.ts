import type { TechnologyDefinition } from '../../types';

export const fluxbbTechnologyDefinition = {
	id: "fluxbb",
	name: "FluxBB",
	website: "https://fluxbb.org",
	description: "FluxBB is a lightweight open-source forum application written in PHP.",
	icon: "FluxBB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "fluxbb:html:0",
			kind: "html",
			pattern: new RegExp("<p id=\"poweredby\">[^<]+<a href=\"https?:\\/\\/fluxbb\\.org\\/\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fluxbb:dom:1",
			kind: "dom",
			selector: "p#poweredby > a[href*='//fluxbb.org/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:fluxbb:fluxbb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
