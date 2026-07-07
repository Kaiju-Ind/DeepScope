import type { TechnologyDefinition } from '../../types';

export const moyaTechnologyDefinition = {
	id: "moya",
	name: "Moya",
	website: "https://hjalp.stefna.is/en/knowledge/moya",
	description: "Moya is a heavy enterprise CMS focused on structured content, localization, and fast delivery, featuring an extensive editor interface, third-party integrations, and built-in ecommerce and blog functionality.",
	icon: "Moya.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "moya:jsGlobal:0",
			kind: "jsGlobal",
			property: "MoyaAutocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moya:jsGlobal:1",
			kind: "jsGlobal",
			property: "MoyaLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moya:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Moya ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
