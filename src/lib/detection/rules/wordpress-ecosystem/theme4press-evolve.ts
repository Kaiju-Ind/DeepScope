import type { TechnologyDefinition } from '../../types';

export const theme4pressEvolveTechnologyDefinition = {
	id: "theme4press-evolve",
	name: "Theme4Press Evolve",
	website: "https://theme4press.com/evolve-multipurpose-wordpress-theme",
	description: "Theme4Press Evolve is an multipurpose and minimal WordPress theme.",
	icon: "Theme4Press.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme4press-evolve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/evolve(?:-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme4press-evolve:jsGlobal:1",
			kind: "jsGlobal",
			property: "evolve_js_local_vars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
