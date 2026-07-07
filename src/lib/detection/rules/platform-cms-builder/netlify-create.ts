import type { TechnologyDefinition } from '../../types';

export const netlifyCreateTechnologyDefinition = {
	id: "netlify-create",
	name: "Netlify Create",
	website: "https://www.stackbit.com",
	description: "Netlify Create (formerly Stackbit) is a visual experience platform for building decoupled websites.",
	icon: "Netlify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "netlify-create:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stackbit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "netlify-create:dom:1",
			kind: "dom",
			selector: "[data-sb-object-id]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "netlify-create:dom:2",
			kind: "dom",
			selector: "header[data-sb-field-path]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "netlify-create:dom:3",
			kind: "dom",
			selector: "script#__NEXT_DATA__",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "netlify-create:text:4",
			kind: "text",
			pattern: new RegExp("stackbit"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "netlify-create:jsGlobal:5",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.withStackbit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
