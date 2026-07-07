import type { TechnologyDefinition } from '../../types';

export const rebelmouseTechnologyDefinition = {
	id: "rebelmouse",
	name: "RebelMouse",
	website: "https://www.rebelmouse.com/",
	icon: "RebelMouse.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rebelmouse:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Powered by RebelMouse\\."),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "rebelmouse:jsGlobal:1",
			kind: "jsGlobal",
			property: "REBELMOUSE_ACTIVE_TASKS_QUEUE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rebelmouse:html:2",
			kind: "html",
			pattern: new RegExp("<!-- powered by rebelmouse\\."),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
