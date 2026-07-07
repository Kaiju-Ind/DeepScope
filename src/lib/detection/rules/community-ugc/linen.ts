import type { TechnologyDefinition } from '../../types';

export const linenTechnologyDefinition = {
	id: "linen",
	name: "Linen",
	website: "https://www.linen.dev",
	description: "Linen is a real-time chat platform built for communities.",
	icon: "Linen.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "linen:jsGlobal:0",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.currentCommunity.logoUrl",
			valuePattern: new RegExp("static\\.main\\.linendev\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"elixir",
		"typescript",
	],
} as const satisfies TechnologyDefinition;
