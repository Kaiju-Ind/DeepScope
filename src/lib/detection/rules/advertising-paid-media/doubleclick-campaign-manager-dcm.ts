import type { TechnologyDefinition } from '../../types';

export const doubleclickCampaignManagerDcmTechnologyDefinition = {
	id: "doubleclick-campaign-manager-dcm",
	name: "DoubleClick Campaign Manager (DCM)",
	website: "https://www.doubleclickbygoogle.com/solutions/digital-marketing/campaign-manager/",
	icon: "DoubleClick.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "doubleclick-campaign-manager-dcm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("2mdn\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
