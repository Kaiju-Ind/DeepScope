import type { TechnologyDefinition } from '../../types';

export const appjustableTechnologyDefinition = {
	id: "appjustable",
	name: "Appjustable",
	website: "https://appjustable.com",
	description: "Appjustable is a platform offering Weebly app solutions for creating websites, enabling users to design and manage their online presence through customizable tools and features tailored to individual or business needs.",
	icon: "Appjustable.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "appjustable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/appjustable\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"weebly",
	],
} as const satisfies TechnologyDefinition;
