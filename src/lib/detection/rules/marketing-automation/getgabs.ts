import type { TechnologyDefinition } from '../../types';

export const getgabsTechnologyDefinition = {
	id: "getgabs",
	name: "Getgabs",
	website: "https://getgabs.com",
	description: "Getgabs is a WhatsApp marketing automation platform that enhances sales, marketing, and support through the WhatsApp Business API.",
	icon: "Getgabs.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "getgabs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getgabs\\.com"),
			description: "Script source URL matches a known technology marker.",
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
		"whatsapp-business-chat",
	],
} as const satisfies TechnologyDefinition;
