import type { TechnologyDefinition } from '../../types';

export const youtubeTechnologyDefinition = {
	id: "youtube",
	name: "YouTube",
	website: "https://www.youtube.com",
	description: "YouTube is a video sharing service where users can create their own profile, upload videos, watch, like and comment on other videos.",
	icon: "YouTube.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "youtube:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.youtube\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "youtube:html:1",
			kind: "html",
			pattern: new RegExp("<(?:param|embed|iframe)[^>]+youtube(?:-nocookie)?\\.com\\/(?:v|embed)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtube:dom:2",
			kind: "dom",
			selector: "embed[src*='youtube.com'], embed[src*='youtube-nocookie.com'], iframe[src*='youtube.com'], iframe[src*='youtube-nocookie.com'], param[value*='youtube.com'], param[value*='youtube-nocookie.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
