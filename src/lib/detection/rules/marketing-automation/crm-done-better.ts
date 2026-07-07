import type { TechnologyDefinition } from '../../types';

export const crmDoneBetterTechnologyDefinition = {
	id: "crm-done-better",
	name: "CRM Done Better",
	website: "https://crmdonebetter.com",
	description: "CRM Done Better is a marketing automation software that streamlines campaign management, customer segmentation, and lead nurturing to improve efficiency and data-driven decision making.",
	icon: "CRMDoneBetter.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "crm-done-better:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.crmdonebetter\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
