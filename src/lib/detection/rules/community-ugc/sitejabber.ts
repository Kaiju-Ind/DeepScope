import type { TechnologyDefinition } from '../../types';

export const sitejabberTechnologyDefinition = {
	id: "sitejabber",
	name: "SiteJabber",
	website: "https://www.sitejabber.com/",
	description: "Sitejabber is the leading destination for customer ratings and reviews of businesses. Consumers find ratings and read reviews to ensure they buy from the best companies.",
	icon: "SiteJabber.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "sitejabber:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("biz\\.sitejabber\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
