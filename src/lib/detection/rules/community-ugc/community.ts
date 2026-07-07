import type { TechnologyDefinition } from '../../types';

export const communityTechnologyDefinition = {
	id: "community",
	name: "Community",
	website: "https://www.community.com",
	description: "Community is a platform enabling public figures, small to midsize businesses, and enterprise brands to connect instantly with their audience through large-scale conversational text messaging.",
	icon: "Community.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "community:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.community\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
