import type { TechnologyDefinition } from '../../types';

export const commercetoolsTechnologyDefinition = {
	id: "commercetools",
	name: "commercetools",
	website: "https://commercetools.com",
	description: "commercetools is an API-first, headless commerce platform for ecommerce applications.",
	icon: "commercetools.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commercetools:dom:0",
			kind: "dom",
			selector: "link[href*='.commercetools.com/'], body[data-commerce-tools-host*='.commercetools.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "commercetools:jsGlobal:1",
			kind: "jsGlobal",
			property: "COMMERCE_TOOLS_HOST_ATT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "commercetools:jsGlobal:2",
			kind: "jsGlobal",
			property: "COMMERCE_TOOLS_PROJECT_KEY_ATT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "commercetools:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\.commercetools\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "commercetools:requestUrl:4",
			kind: "requestUrl",
			pattern: new RegExp("\\.commercetools\\.com\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "commercetools:jsGlobal:5",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.commercetoolsEntity",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"graphql",
	],
} as const satisfies TechnologyDefinition;
