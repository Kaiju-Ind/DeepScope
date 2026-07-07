import type { TechnologyDefinition } from '../../types';

export const bigcommerceTechnologyDefinition = {
	id: "bigcommerce",
	name: "BigCommerce",
	website: "https://www.bigcommerce.com",
	description: "BigCommerce is a hosted ecommerce platform that allows business owners to set up an online store and sell their products online.",
	icon: "BigCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigcommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.|plugins\\/)?bigcommerce(?:\\.com)?\\/(?:assets)?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bigcommerce:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("bigcommerceProductId"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bigcommerce:url:2",
			kind: "url",
			pattern: new RegExp("mybigcommerce\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "bigcommerce:dom:3",
			kind: "dom",
			selector: "img[data-src*='.bigcommerce.com'], img[src*='.bigcommerce.com'], link[href*='.bigcommerce.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bigcommerce:jsGlobal:4",
			kind: "jsGlobal",
			property: "bigcommerce_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigcommerce:jsGlobal:5",
			kind: "jsGlobal",
			property: "bigcommerce_i18n",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigcommerce:meta:6",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("^bigcommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bigcommerce:scriptContent:7",
			kind: "scriptContent",
			pattern: new RegExp("bigcommerceproductid"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
