import type { TechnologyDefinition } from '../../types';

export const openGamePanelTechnologyDefinition = {
	id: "open-game-panel",
	name: "Open Game Panel",
	website: "https://opengamepanel.org",
	description: "Open Game Panel is an open-source hosting control panel for deploying and managing multiplayer game servers.",
	icon: "Open Game Panel.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "open-game-panel:dom:0",
			kind: "dom",
			selector: "span.controlpanellogin, .OGPVersionArea",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "open-game-panel:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^opengamepanel_web$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
