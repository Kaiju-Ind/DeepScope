import type { TechnologyDefinition } from '../../types';

export const nacelleTechnologyDefinition = {
	id: "nacelle",
	name: "Nacelle",
	website: "https://nacelle.com",
	description: "Nacelle is a headless ecommerce platform.",
	icon: "Nacelle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nacelle:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("storefront\\.api\\.nacelle\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "nacelle:dom:1",
			kind: "dom",
			selector: "[class*='nacelle']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nacelle:jsGlobal:2",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.page.nacelleEntryId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nacelle:jsGlobal:3",
			kind: "jsGlobal",
			property: "nacelleEventData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	implies: [
		"graphql",
	],
} as const satisfies TechnologyDefinition;
