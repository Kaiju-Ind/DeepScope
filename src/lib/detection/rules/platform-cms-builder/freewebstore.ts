import type { TechnologyDefinition } from '../../types';

export const freewebstoreTechnologyDefinition = {
	id: "freewebstore",
	name: "freewebstore",
	website: "https://freewebstore.com",
	description: "freewebstore is a platform that allows users to create and manage a free ecommerce store, including product listings, a shopping cart, and basic payment and order management.",
	icon: "freewebstore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "freewebstore:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.freewebstore\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "freewebstore:header:1",
			kind: "header",
			key: "X-Fws-Platform",
			valuePattern: new RegExp("^freewebstore$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "freewebstore:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.freewebstore\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "freewebstore:header:3",
			kind: "header",
			key: "x-fws-platform",
			valuePattern: new RegExp("^freewebstore$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
