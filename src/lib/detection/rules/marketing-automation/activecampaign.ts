import type { TechnologyDefinition } from '../../types';

export const activecampaignTechnologyDefinition = {
	id: "activecampaign",
	name: "ActiveCampaign",
	website: "https://www.activecampaign.com",
	description: "ActiveCampaign is email and marketing automation software.",
	icon: "ActiveCampaign.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "activecampaign:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plugins\\/activecampaign-subscription-forms\\/site_tracking\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "activecampaign:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.activehosted\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "activecampaign:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.app-us1\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "activecampaign:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ac-page\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "activecampaign:url:4",
			kind: "url",
			pattern: new RegExp("\\.activehosted\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "activecampaign:url:5",
			kind: "url",
			pattern: new RegExp("\\.ac-page\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "activecampaign:jsGlobal:6",
			kind: "jsGlobal",
			property: "acEnableTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
