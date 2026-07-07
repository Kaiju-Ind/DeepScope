import type { TechnologyDefinition } from '../../types';

export const clearlinkTechnologyDefinition = {
	id: "clearlink",
	name: "Clearlink",
	website: "https://www.clearlink.com",
	description: "Clearlink connects brands with customers who are likely to convert and provides information on partnerships and career opportunities.",
	icon: "Clearlink.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "clearlink:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("mapi\\.clearlink\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clearlink:jsGlobal:1",
			kind: "jsGlobal",
			property: "mapiBaseUrl",
			valuePattern: new RegExp("mapi\\.clearlink\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clearlink:jsGlobal:2",
			kind: "jsGlobal",
			property: "mapiLeadEndpoint",
			valuePattern: new RegExp("mapi\\.clearlink\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
