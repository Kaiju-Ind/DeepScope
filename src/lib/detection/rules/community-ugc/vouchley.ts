import type { TechnologyDefinition } from '../../types';

export const vouchleyTechnologyDefinition = {
	id: "vouchley",
	name: "Vouchley",
	website: "https://www.vouchley.com",
	description: "Vouchley is a review platform designed for freelancers, allowing them to receive and showcase client reviews to build credibility and attract more business.",
	icon: "Vouchley.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vouchley:dom:0",
			kind: "dom",
			selector: "iframe[src*='.reputize.org/widgets/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
