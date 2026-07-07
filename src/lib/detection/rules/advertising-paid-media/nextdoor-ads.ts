import type { TechnologyDefinition } from '../../types';

export const nextdoorAdsTechnologyDefinition = {
	id: "nextdoor-ads",
	name: "Nextdoor Ads",
	website: "https://help.nextdoor.com/s/article/About-Neighborhood-Ad-Center-NAC-Conversion-Pixel",
	description: "Nextdoor Ads is an easy-to-use expansion of Nextdoor’s proprietary self-serve campaign management platform, designed to help small and medium-sized businesses (SMBs) advertise on Nextdoor.",
	icon: "Nextdoor Ads.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "nextdoor-ads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ads\\.nextdoor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
