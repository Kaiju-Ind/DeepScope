import type { TechnologyDefinition } from '../../types';

export const madkuduTechnologyDefinition = {
	id: "madkudu",
	name: "MadKudu",
	website: "https://www.madkudu.com",
	description: "MadKudu is a platform that enhances sales and marketing systems by providing actionable predictive analytics, enabling businesses to optimize strategies with data-driven insights.",
	icon: "MadKudu.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "madkudu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.madkudu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "madkudu:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.madkudu.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
