import type { TechnologyDefinition } from '../../types';

export const myliTechnologyDefinition = {
	id: "myli",
	name: "Myli",
	website: "https://www.myli.io",
	description: "Myli is a platform enhancing customer experience, streamlining reputation management, and facilitating consumer acquisition.",
	icon: "Myli.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "myli:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-app\\.myli\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "myli:jsGlobal:1",
			kind: "jsGlobal",
			property: "myli_push.geolocate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
