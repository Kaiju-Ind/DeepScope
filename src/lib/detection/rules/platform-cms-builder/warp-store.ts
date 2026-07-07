import type { TechnologyDefinition } from '../../types';

export const warpStoreTechnologyDefinition = {
	id: "warp-store",
	name: "Warp Store",
	website: "https://warpstore.app",
	description: "Warp Store is a website creation platform, where you can create a website for any type of game and sell products automatically.",
	icon: "WarpStore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "warp-store:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.warpstore\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "warp-store:dom:1",
			kind: "dom",
			selector: "link[href*='.warpstore.app/']",
			description: "DOM selector matches a known technology marker.",
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
	implies: [
		"cloudflare",
		"next-js",
		"node-js",
		"react",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
