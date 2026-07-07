import type { TechnologyDefinition } from '../../types';

export const genesysCloudTechnologyDefinition = {
	id: "genesys-cloud",
	name: "Genesys Cloud",
	website: "https://www.genesys.com",
	description: "Genesys Cloud is an all-in-one cloud-based contact center software built to improve the customer experience.",
	icon: "Genesys Cloud.svg",
	categories: [
		"marketing-automation",
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "genesys-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.mypurecloud\\.\\w+\\/widgets\\/([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genesys-cloud:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.mypurecloud\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genesys-cloud:jsGlobal:2",
			kind: "jsGlobal",
			property: "PURECLOUD_WEBCHAT_FRAME_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
