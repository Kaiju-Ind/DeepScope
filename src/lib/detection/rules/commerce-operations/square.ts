import type { TechnologyDefinition } from '../../types';

export const squareTechnologyDefinition = {
	id: "square",
	name: "Square",
	website: "https://squareup.com/",
	description: "Square is a mobile payment company that offers business software, payment hardware products and small business services.",
	icon: "Square.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "square:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.squareup\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "square:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.squareup\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "square:jsGlobal:2",
			kind: "jsGlobal",
			property: "SqPaymentForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "square:jsGlobal:3",
			kind: "jsGlobal",
			property: "Square.Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "square:jsGlobal:4",
			kind: "jsGlobal",
			property: "__BOOTSTRAP_STATE__.storeInfo.square_application_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
