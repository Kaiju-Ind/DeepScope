import type { TechnologyDefinition } from '../../types';

export const paykickstartTechnologyDefinition = {
	id: "paykickstart",
	name: "PayKickStart",
	website: "https://paykickstart.com",
	description: "PayKickstart is an online shopping cart and affiliate management platform with built-in conversion enhancing features like one-click upsells for credit card/paypal, order bumps, custom checkout pages/widgets/embed forms, coupon management, auto-complete shipping fields, subscription saver sequences, and more.",
	icon: "PayKickStart.png",
	categories: [
		"widgets-misc",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "paykickstart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.paykickstart\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
