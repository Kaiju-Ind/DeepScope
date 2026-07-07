import type { TechnologyDefinition } from '../../types';

export const readaloudTechnologyDefinition = {
	id: "readaloud",
	name: "ReadAloud",
	website: "https://www.readaloudwidget.com",
	description: "The SiteSpeaker text-to-speech widget is embedded into your posts and give users an alternate way to consume your content as audio.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "readaloud:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("assets\\.sitespeaker\\.link"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "readaloud:dom:1",
			kind: "dom",
			selector: "div#ra-player, div[data-skin*='assets\\.sitespeaker\\.link/embed/skins']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
