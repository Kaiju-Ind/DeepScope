import type { TechnologyDefinition } from '../../types';

export const aureliaTechnologyDefinition = {
	id: "aurelia",
	name: "Aurelia",
	website: "https://aurelia.io",
	description: "Aurelia is an open-source UI JavaScript framework designed to create single page applications.",
	icon: "Aurelia.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "aurelia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/aurelia[\\d\\w\\-\\.]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aurelia:dom:1",
			kind: "dom",
			selector: "div[aurelia-app], body[aurelia-app], a[au-target-id]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aurelia:jsGlobal:2",
			kind: "jsGlobal",
			property: "_aureliaConfigureModuleLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aurelia:jsGlobal:3",
			kind: "jsGlobal",
			property: "localAurelia",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
