import type { TechnologyDefinition } from '../../types';

export const shellinaboxTechnologyDefinition = {
	id: "shellinabox",
	name: "ShellInABox",
	website: "https://shellinabox.com",
	description: "Shell In A Box implements a web server that can export arbitrary command line tools to a web based terminal emulator.",
	icon: "ShellInABox.png",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "shellinabox:html:0",
			kind: "html",
			pattern: new RegExp("<title>Shell In A Box<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shellinabox:html:1",
			kind: "html",
			pattern: new RegExp("must be enabled for ShellInABox<\\/noscript>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shellinabox:jsGlobal:2",
			kind: "jsGlobal",
			property: "ShellInABox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shellinabox:html:3",
			kind: "html",
			pattern: new RegExp("<title>shell in a box<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shellinabox:html:4",
			kind: "html",
			pattern: new RegExp("must be enabled for shellinabox<\\/noscript>"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
