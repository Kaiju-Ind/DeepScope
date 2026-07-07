import type { TechnologyDefinition } from '../../types';

export const cosmoshopTechnologyDefinition = {
	id: "cosmoshop",
	name: "Cosmoshop",
	website: "https://cosmoshop.de",
	icon: "Cosmoshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cosmoshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cosmoshop_functions\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cosmoshop:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cosmoshop\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cosmoshop:url:2",
			kind: "url",
			pattern: new RegExp("\\/cosmoshop\\/"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cosmoshop:cosmoshop:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
