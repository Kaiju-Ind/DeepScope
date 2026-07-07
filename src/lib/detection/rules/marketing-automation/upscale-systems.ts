import type { TechnologyDefinition } from '../../types';

export const upscaleSystemsTechnologyDefinition = {
	id: "upscale-systems",
	name: "UpScale Systems",
	website: "https://upscale-systems.com",
	description: "UpScale Systems is an all-in-one platform to enhance local businesses.",
	icon: "UpScale.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "upscale-systems:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.upscale-systems\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "upscale-systems:meta:1",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^UpScale$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "upscale-systems:meta:2",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^upscale$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
