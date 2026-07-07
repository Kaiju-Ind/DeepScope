import type { TechnologyDefinition } from '../../types';

export const koishiJsTechnologyDefinition = {
	id: "koishi-js",
	name: "Koishi.js",
	website: "https://github.com/koishijs",
	description: "Koishi.js is a cross-platform chatbot framework.",
	icon: "Koishi.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "koishi-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "KOISHI_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"typescript",
	],
} as const satisfies TechnologyDefinition;
