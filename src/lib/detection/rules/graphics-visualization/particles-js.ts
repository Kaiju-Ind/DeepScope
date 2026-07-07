import type { TechnologyDefinition } from '../../types';

export const particlesJsTechnologyDefinition = {
	id: "particles-js",
	name: "particles.js",
	website: "https://github.com/VincentGarreau/particles.js",
	description: "Particles.js is a JavaScript library for creating particles.",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "particles-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/particles(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "particles-js:dom:1",
			kind: "dom",
			selector: "div#particles-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "particles-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "particlesJS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
