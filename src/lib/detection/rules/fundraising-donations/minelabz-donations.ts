import type { TechnologyDefinition } from '../../types';

export const minelabzDonationsTechnologyDefinition = {
	id: "minelabz-donations",
	name: "MineLabz donations",
	website: "https://minelabz.com",
	description: "Minelabz is a donations platform built on WordPress and WooCommerce, enabling cracked Minecraft servers to accept donations through their stores.",
	icon: "MineLabz.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "minelabz-donations:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("minelabz\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
