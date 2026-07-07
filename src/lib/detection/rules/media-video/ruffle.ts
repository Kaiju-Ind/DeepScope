import type { TechnologyDefinition } from '../../types';

export const ruffleTechnologyDefinition = {
	id: "ruffle",
	name: "Ruffle",
	website: "https://ruffle.rs",
	description: "Ruffle is an open-source Flash Player emulator that allows users to view and play Flash content on modern web browsers without requiring the original Adobe Flash Player.",
	icon: "Ruffle.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "ruffle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("[\\/@]?ruffle(?:-rs)?\\/ruffle\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ruffle:jsGlobal:1",
			kind: "jsGlobal",
			property: "RufflePlayer.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
