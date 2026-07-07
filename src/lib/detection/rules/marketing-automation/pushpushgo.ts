import type { TechnologyDefinition } from '../../types';

export const pushpushgoTechnologyDefinition = {
	id: "pushpushgo",
	name: "PushPushGo",
	website: "https://pushpushgo.com",
	description: "PushPushGo is a GDPR-ready platform which enables startups, SMBs and corporations to create and send automatic web push notification campaigns on desktop and via mobile to manage various scenarios including abandoned carts, segmentation, cross-selling, customer engagement, and return rates.",
	icon: "PushPushGo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushpushgo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pushpushgo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushpushgo:dom:1",
			kind: "dom",
			selector: "link[href*='.pushpushgo.com/']",
			description: "DOM selector matches a known technology marker.",
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
