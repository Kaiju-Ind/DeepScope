import type { TechnologyDefinition } from '../../types';

export const adminbuyTechnologyDefinition = {
	id: "adminbuy",
	name: "AdminBuy",
	website: "https://www.adminbuy.cn",
	description: "AdminBuy is an open-source content management system from China designed for building and managing websites.",
	icon: "AdminBuy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adminbuy:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.adminbuy\\.cn", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
