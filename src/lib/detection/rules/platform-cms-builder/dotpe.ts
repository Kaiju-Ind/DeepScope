import type { TechnologyDefinition } from '../../types';

export const dotpeTechnologyDefinition = {
	id: "dotpe",
	name: "DotPe",
	website: "https://dotpe.in",
	description: "DotPe is a platform for catalog and product discovery designed to support ecommerce operations.",
	icon: "DotPe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dotpe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dotpe\\.in"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dotpe:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.dotpe\\.in"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
