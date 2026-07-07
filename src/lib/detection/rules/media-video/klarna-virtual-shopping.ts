import type { TechnologyDefinition } from '../../types';

export const klarnaVirtualShoppingTechnologyDefinition = {
	id: "klarna-virtual-shopping",
	name: "Klarna Virtual Shopping",
	website: "https://www.klarna.com/us/business/marketing-solutions/",
	description: "Klarna Virtual Shopping is a service that allows online shoppers to interact with in-store retail experts via live chats and video calls, providing real-time advice and product demonstrations to enhance the online shopping experience.",
	icon: "Klarna.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "klarna-virtual-shopping:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.usehero\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klarna-virtual-shopping:jsGlobal:1",
			kind: "jsGlobal",
			property: "HeroWebPluginSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
