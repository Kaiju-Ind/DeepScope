import type { TechnologyDefinition } from '../../types';

export const adabraTechnologyDefinition = {
	id: "adabra",
	name: "Adabra",
	website: "https://www.adabra.com",
	description: "Adabra is a SaaS omnichannel marketing automation platform to help boost sales. Adabra allows you to manage user segmentation, create workflow and campaigns through email, social, SMS and more.",
	icon: "Adabra.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "adabra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("track\\.adabra\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adabra:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("my\\.adabra\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "adabra:jsGlobal:2",
			kind: "jsGlobal",
			property: "adabraPreview",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adabra:jsGlobal:3",
			kind: "jsGlobal",
			property: "adabra_version_panel",
			valuePattern: new RegExp("(^.+$)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adabra:jsGlobal:4",
			kind: "jsGlobal",
			property: "adabra_version_track",
			valuePattern: new RegExp("(^.+$)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
