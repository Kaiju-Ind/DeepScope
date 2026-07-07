import type { TechnologyDefinition } from '../../types';

export const emfontTechnologyDefinition = {
	id: "emfont",
	name: "Emfont",
	website: "https://font.emtech.cc",
	description: "Emfont is an open-source CJK webfont service that enables self-hosted, cache-efficient, and privacy-conscious distribution of open-source fonts.",
	icon: "Emfont.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "emfont:jsGlobal:0",
			kind: "jsGlobal",
			property: "emfont.Emfont",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
