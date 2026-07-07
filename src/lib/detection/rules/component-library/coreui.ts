import type { TechnologyDefinition } from '../../types';

export const coreuiTechnologyDefinition = {
	id: "coreui",
	name: "CoreUI",
	website: "https://coreui.io",
	description: "CoreUI provides cloud hosting, web and mobile design, animations, wireframes, and UX testing services.",
	icon: "CoreUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "coreui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("webpackJsonp@coreui\\/coreui"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "coreui:jsGlobal:1",
			kind: "jsGlobal",
			property: "coreui",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coreui:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("webpackjsonp@coreui\\/coreui"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
