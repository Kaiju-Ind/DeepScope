import type { TechnologyDefinition } from '../../types';

export const sallaTechnologyDefinition = {
	id: "salla",
	name: "Salla",
	website: "https://salla.sa",
	description: "Salla is an ecommerce platform specifically tailored to serve businesses and customers in Saudi Arabia.",
	icon: "Salla.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "salla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.salla\\.sa\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salla:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Salla$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "salla:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.assets\\.salla\\.network"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salla:jsGlobal:3",
			kind: "jsGlobal",
			property: "Salla.shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salla:jsGlobal:4",
			kind: "jsGlobal",
			property: "SallaApplePay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salla:header:5",
			kind: "header",
			key: "X-Frame-Options",
			valuePattern: new RegExp("\\.salla\\.sa", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "salla:header:6",
			kind: "header",
			key: "x-frame-options",
			valuePattern: new RegExp("\\.salla\\.sa", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "salla:header:7",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^salla$", "i"),
			description: "Response header matches a known technology marker.",
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
