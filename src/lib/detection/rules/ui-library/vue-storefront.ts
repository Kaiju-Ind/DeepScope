import type { TechnologyDefinition } from '../../types';

export const vueStorefrontTechnologyDefinition = {
	id: "vue-storefront",
	name: "Vue Storefront",
	website: "https://www.vuestorefront.io/",
	description: "Vue Storefront is a frontend platform for headless ecommerce.",
	icon: "vue-storefront.svg",
	categories: [
		"ui-library",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vue-storefront:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vsf-layout"),
			version: {
				source: "match",
				template: "1",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vue-storefront:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Vue Storefront ([0-9.]+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vue-storefront:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^vue storefront ([0-9.]+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
