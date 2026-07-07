import type { TechnologyDefinition } from '../../types';

export const mywebsiteCreatorTechnologyDefinition = {
	id: "mywebsite-creator",
	name: "MyWebsite Creator",
	website: "https://www.ionos.com",
	description: "MyWebsite Creator is website builder designed for easy editing and fast results.",
	icon: "MyWebsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mywebsite-creator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("website-editor\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mywebsite-creator:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("mywebsite-editor\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"duda",
	],
} as const satisfies TechnologyDefinition;
