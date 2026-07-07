import type { TechnologyDefinition } from '../../types';

export const propertymeldTechnologyDefinition = {
	id: "propertymeld",
	name: "PropertyMeld",
	website: "https://propertymeld.com",
	description: "PropertyMeld is a property maintenance software platform that manages repair requests, communication, and workflow coordination between property managers, residents, and service vendors.",
	icon: "PropertyMeld.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "propertymeld:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("com\\.propertymeld\\.app-sso"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "propertymeld:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkproperty_meld",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
