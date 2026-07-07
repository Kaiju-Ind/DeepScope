import type { TechnologyDefinition } from '../../types';

export const mightyNetworkTechnologyDefinition = {
	id: "mighty-network",
	name: "Mighty Network",
	website: "https://www.mightynetworks.com",
	description: "Mighty Networks is a platform that facilitates the creation and management of online communities, offering customisable websites, discussion forums, member profiles, events, courses, and multimedia content sharing for individuals and organisations.",
	icon: "Mighty Network.svg",
	categories: [
		"community-ugc",
		"content-publishing",
	],
	rules: [
		{
			id: "mighty-network:jsGlobal:0",
			kind: "jsGlobal",
			property: "Mighty.BroadcastBotApp",
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
	implies: [
		"ruby",
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
