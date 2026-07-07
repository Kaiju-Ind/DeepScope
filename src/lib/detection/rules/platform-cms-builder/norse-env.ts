import type { TechnologyDefinition } from '../../types';

export const norseEnvTechnologyDefinition = {
	id: "norse-env",
	name: "Norse Env",
	website: "https://esim.pe",
	description: "Norse Env is a lightweight PHP CMS for content-driven websites, featuring a visual editor, media library, and custom admin URL.",
	icon: "NorseEnv.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "norse-env:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Norse Env", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "norse-env:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Norse Env", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "norse-env:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("norse env", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "norse-env:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("norse env", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
