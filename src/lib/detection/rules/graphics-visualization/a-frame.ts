import type { TechnologyDefinition } from '../../types';

export const aFrameTechnologyDefinition = {
	id: "a-frame",
	name: "A-Frame",
	website: "https://aframe.io",
	description: "A-Frame is an open-source web framework that simplifies building cross-platform virtual reality (VR) experiences using HTML and JavaScript.",
	icon: "A-Frame.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "a-frame:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/?([\\d.]+)?\\/aframe(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "a-frame:html:1",
			kind: "html",
			pattern: new RegExp("<a-scene[^<>]*>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "a-frame:jsGlobal:2",
			kind: "jsGlobal",
			property: "AFRAME.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a-frame:jsGlobal:3",
			kind: "jsGlobal",
			property: "aframeStats",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"three-js",
	],
} as const satisfies TechnologyDefinition;
