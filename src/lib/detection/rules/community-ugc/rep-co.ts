import type { TechnologyDefinition } from '../../types';

export const repCoTechnologyDefinition = {
	id: "rep-co",
	name: "Rep.co",
	website: "https://rep.co",
	description: "Rep.co is a review generation platform that helps businesses and agencies manage their online reputation through automated tools.",
	icon: "Repco.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "rep-co:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.rep\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
