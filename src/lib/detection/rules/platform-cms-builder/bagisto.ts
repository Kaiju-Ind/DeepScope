import type { TechnologyDefinition } from '../../types';

export const bagistoTechnologyDefinition = {
	id: "bagisto",
	name: "Bagisto",
	website: "https://bagisto.com",
	description: "Bagisto is an open-source Laravel ecommerce framework that provides customizable features for building and managing online stores.",
	icon: "Bagisto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bagisto:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^bagisto_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:webkul:bagisto:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
