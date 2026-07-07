import type { TechnologyDefinition } from '../../types';

export const asciinemaTechnologyDefinition = {
	id: "asciinema",
	name: "Asciinema",
	website: "https://asciinema.org/",
	description: "Asciinema is a free and open-source solution for recording terminal sessions and sharing them on the web.",
	icon: "Asciinema.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "asciinema:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("asciinema\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "asciinema:html:1",
			kind: "html",
			pattern: new RegExp("<asciinema-player"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "asciinema:dom:2",
			kind: "dom",
			selector: "div.asciinema-player-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "asciinema:dom:3",
			kind: "dom",
			selector: "div.asciinema-player",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "asciinema:jsGlobal:4",
			kind: "jsGlobal",
			property: "AsciinemaPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asciinema:jsGlobal:5",
			kind: "jsGlobal",
			property: "asciinema",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
