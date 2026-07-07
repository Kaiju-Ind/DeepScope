import type { TechnologyDefinition } from '../../types';

export const linxCommerceTechnologyDefinition = {
	id: "linx-commerce",
	name: "Linx Commerce",
	website: "https://www.linx.com.br/linx-commerce",
	description: "Linx Commerce is an ecommerce platform, which provides seamless and personalised cross-channel solution that enables a true omni-channel shopping experience.",
	icon: "Linx.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "linx-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "EzGaCfg.Config.Store",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linx-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "EzGaCfg.Shopper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linx-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "linxImpulse.config.integrationFlags.platformProvider",
			valuePattern: new RegExp("linxCommerce"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
