import type { TechnologyDefinition } from '../../types';

export const microsoftDynamics365CommerceTechnologyDefinition = {
	id: "microsoft-dynamics-365-commerce",
	name: "Microsoft Dynamics 365 Commerce",
	website: "https://dynamics.microsoft.com/commerce/overview",
	description: "Microsoft Dynamics 365 Commerce, an omnichannel ecommerce solution that allows you to build a website, connect physical and digital stores, track customer behaviours and requirements, deliver personalised experiences.",
	icon: "Microsoft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "microsoft-dynamics-365-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dynamics365commerce\\.ms\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	requires: [
		"azure",
		"react",
	],
} as const satisfies TechnologyDefinition;
