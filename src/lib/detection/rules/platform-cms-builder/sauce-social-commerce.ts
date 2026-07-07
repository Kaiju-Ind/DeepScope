import type { TechnologyDefinition } from '../../types';

export const sauceSocialCommerceTechnologyDefinition = {
	id: "sauce-social-commerce",
	name: "Sauce Social Commerce",
	website: "https://www.addsauce.com",
	description: "Sauce Social Commerce is a platform that integrates social media and ecommerce, leveraging user-generated content, influencer marketing, and visual shopping tools to improve online shopping experiences.",
	icon: "SauceSocialCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sauce-social-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.addsauce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sauce-social-commerce:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.addsauce.com']",
			description: "DOM selector matches a known technology marker.",
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
