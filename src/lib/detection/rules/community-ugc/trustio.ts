import type { TechnologyDefinition } from '../../types';

export const trustioTechnologyDefinition = {
	id: "trustio",
	name: "Trustio",
	website: "https://trustio.se",
	description: "Trustio is a platform that collects customer reviews on behalf of Swedish e-retailers to provide insights into their business performance.",
	icon: "Trustio.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.trustio\\.se"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustio:jsGlobal:1",
			kind: "jsGlobal",
			property: "createTrustioIcon",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustio:jsGlobal:2",
			kind: "jsGlobal",
			property: "trustioPoints",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
