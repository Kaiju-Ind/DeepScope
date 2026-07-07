import type { TechnologyDefinition } from '../../types';

export const stackbitTechnologyDefinition = {
	id: "stackbit",
	name: "Stackbit",
	website: "https://www.stackbit.com",
	description: "Stackbit is a visual experience platform for building decoupled websites.",
	icon: "stackbit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stackbit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stackbit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stackbit:dom:1",
			kind: "dom",
			selector: "script#__NEXT_DATA__",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stackbit:text:2",
			kind: "text",
			pattern: new RegExp("stackbit"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "stackbit:jsGlobal:3",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.withStackbit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stackbit:dom:4",
			kind: "dom",
			selector: "[data-sb-object-id]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stackbit:dom:5",
			kind: "dom",
			selector: "header[data-sb-field-path]",
			description: "DOM selector matches a known technology marker.",
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
