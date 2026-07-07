import type { TechnologyDefinition } from '../../types';

export const tachyonForgeTechnologyDefinition = {
	id: "tachyon-forge",
	name: "Tachyon Forge",
	website: "https://www.tachyonwebtech.com",
	description: "Tachyon Forge is an AI-based website builder that allows websites to be created and configured using Tachyon’s development engine and integrated tools.",
	icon: "TachyonForge.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tachyon-forge:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("tachyonwebtech\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "tachyon-forge:header:1",
			kind: "header",
			key: "X-Matched-Path",
			valuePattern: new RegExp("\\/atlas\\.tachyon\\.", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
