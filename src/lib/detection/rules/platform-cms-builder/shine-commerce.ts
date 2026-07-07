import type { TechnologyDefinition } from '../../types';

export const shineCommerceTechnologyDefinition = {
	id: "shine-commerce",
	name: "Shine Commerce",
	website: "https://shinecommerce.co",
	description: "ShineCommerce is a platform offering eCommerce solutions designed to streamline operations and enhance business performance through optimized online retail management.",
	icon: "ShineCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shine-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.shinecommerce\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
