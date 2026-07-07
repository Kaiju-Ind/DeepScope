import type { TechnologyDefinition } from '../../types';

export const ipinfodbTechnologyDefinition = {
	id: "ipinfodb",
	name: "IPInfoDB",
	website: "https://www.ipinfodb.com/",
	description: "IPInfoDB is the API that returns the location of an IP address.",
	icon: "IPInfoDB.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipinfodb:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipinfodb\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
