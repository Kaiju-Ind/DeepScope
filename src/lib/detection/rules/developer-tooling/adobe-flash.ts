import type { TechnologyDefinition } from '../../types';

export const adobeFlashTechnologyDefinition = {
	id: "adobe-flash",
	name: "Adobe Flash",
	website: "https://www.adobe.com/products/flashplayer",
	description: "Adobe Flash is a multimedia software platform used for production of animations, rich web applications and embedded web browser video players.",
	icon: "Adobe Flash.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "adobe-flash:dom:0",
			kind: "dom",
			selector: "object[type='application/x-shockwave-flash']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adobe-flash:dom:1",
			kind: "dom",
			selector: "param[value*='.swf']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:flash:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
