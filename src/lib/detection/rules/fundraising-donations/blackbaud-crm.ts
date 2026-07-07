import type { TechnologyDefinition } from '../../types';

export const blackbaudCrmTechnologyDefinition = {
	id: "blackbaud-crm",
	name: "Blackbaud CRM",
	website: "https://www.blackbaud.com",
	description: "Blackbaud CRM gathers fundraising, online applications, actionable prospect research and analytics, and multichannel direct marketing into one platform.",
	icon: "Blackbaud.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "blackbaud-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/convio\\/modules\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blackbaud-crm:url:1",
			kind: "url",
			pattern: new RegExp("\\/site\\/Donation2?.*df_id="),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "blackbaud-crm:jsGlobal:2",
			kind: "jsGlobal",
			property: "BLACKBAUD",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blackbaud-crm:jsGlobal:3",
			kind: "jsGlobal",
			property: "don_premium_map",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
