import type { TechnologyDefinition } from '../../types';

export const prismicTechnologyDefinition = {
	id: "prismic",
	name: "Prismic",
	website: "https://prismic.io",
	description: "Prismic is a headless CMS for Jamstack.",
	icon: "Prismic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prismic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.prismic\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prismic:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.cdn\\.prismic\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "prismic:dom:2",
			kind: "dom",
			selector: "img[src*='images.prismic.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "prismic:dom:3",
			kind: "dom",
			selector: "div[id*='prismic-root']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "prismic:dom:4",
			kind: "dom",
			selector: "img[src*='images.prismic.io'], div[id*='prismic-root']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
