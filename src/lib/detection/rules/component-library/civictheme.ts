import type { TechnologyDefinition } from '../../types';

export const civicthemeTechnologyDefinition = {
	id: "civictheme",
	name: "CivicTheme",
	website: "https://www.civictheme.io/",
	description: "CivicTheme is an open source, inclusive, and component-based design system. It was created so governments and corporations can rapidly assemble modern, consistent and compliant digital experiences.",
	icon: "civictheme.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "civictheme:dom:0",
			kind: "dom",
			selector: "img[class*='civictheme-image']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "civictheme:dom:1",
			kind: "dom",
			selector: "img[class*='civic-image']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "civictheme:dom:2",
			kind: "dom",
			selector: "img[class*='ct-image']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "civictheme:dom:3",
			kind: "dom",
			selector: "img[class~='civictheme-image']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "civictheme:dom:4",
			kind: "dom",
			selector: "img[class~='civic-image']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "civictheme:dom:5",
			kind: "dom",
			selector: "img[class~='ct-image']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
