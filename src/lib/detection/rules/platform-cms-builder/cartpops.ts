import type { TechnologyDefinition } from '../../types';

export const cartpopsTechnologyDefinition = {
	id: "cartpops",
	name: "CartPops",
	website: "https://cartpops.com",
	description: "CartPops is a conversion-optimized AJAX fly-out cart solution for WooCommerce that replaces the traditional cart page and is compatible with any theme.",
	icon: "CartPops.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cartpops:jsGlobal:0",
			kind: "jsGlobal",
			property: "CartPops.drawer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cartpops:jsGlobal:1",
			kind: "jsGlobal",
			property: "CartPopsConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"woocommerce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
