import type { TechnologyDefinition } from '../../types';

export const unchainedEngineTechnologyDefinition = {
	id: "unchained-engine",
	name: "Unchained Engine",
	website: "https://docs.unchained.shop",
	description: "Unchained Engine is an open-source ecommerce framework built for Node.js and Bun, designed to provide a scalable solution for developing online stores.",
	icon: "UnchainedEngine.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unchained-engine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.github\\.com\\/repos\\/unchainedshop\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
