import type { TechnologyDefinition } from '../../types';

export const mahoTechnologyDefinition = {
	id: "maho",
	name: "Maho",
	website: "https://mahocommerce.com",
	description: "Maho is a modern, open-source ecommerce platform forked from OpenMage, offering enhanced developer experience while maintaining Magento 1 compatibility.",
	icon: "Maho.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maho:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-autocomplete\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-captcha\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-dialog\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-load-on-intent\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-passkey-tools\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/maho-tree\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maho:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^maho_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
