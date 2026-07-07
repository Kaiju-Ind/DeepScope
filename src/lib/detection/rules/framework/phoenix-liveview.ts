import type { TechnologyDefinition } from '../../types';

export const phoenixLiveviewTechnologyDefinition = {
	id: "phoenix-liveview",
	name: "Phoenix LiveView",
	website: "https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html",
	description: "Phoenix LiveView is a library that brings live, interactive, real-time user experiences to your Phoenix applications.",
	icon: "Phoenix Framework.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "phoenix-liveview:dom:0",
			kind: "dom",
			selector: "div[data-phx-session]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "phoenix-liveview:jsGlobal:1",
			kind: "jsGlobal",
			property: "liveSocket.socket",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"phoenix-framework",
	],
} as const satisfies TechnologyDefinition;
