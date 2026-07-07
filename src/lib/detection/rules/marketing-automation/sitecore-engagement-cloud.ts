import type { TechnologyDefinition } from '../../types';

export const sitecoreEngagementCloudTechnologyDefinition = {
	id: "sitecore-engagement-cloud",
	name: "Sitecore Engagement Cloud",
	website: "https://www.sitecore.com/products/engagement-cloud",
	description: "Sitecore Engagement Cloud is a cloud-based customer experience management platform offering content management, personalisation, marketing automation, analytics, and omni-channel delivery for enhancing digital marketing efforts and improving customer experiences.",
	icon: "Sitecore.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sitecore-engagement-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sitecore-engage-v\\.([\\d\\.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
	implies: [
		"sitecore",
	],
} as const satisfies TechnologyDefinition;
