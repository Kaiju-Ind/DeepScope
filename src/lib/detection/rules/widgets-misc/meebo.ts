import type { TechnologyDefinition } from '../../types';

export const meeboTechnologyDefinition = {
	id: "meebo",
	name: "Meebo",
	website: "https://www.meebo.com",
	description: "Meebo is a widget that is integrated into websites to facilitate link sharing.",
	icon: "Meebo.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "meebo:html:0",
			kind: "html",
			pattern: new RegExp("(?:<iframe id=\"meebo-iframe\"|Meebo\\('domReady'\\))"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "meebo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.meebo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "meebo:jsGlobal:2",
			kind: "jsGlobal",
			property: "Meebo._",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meebo:html:3",
			kind: "html",
			pattern: new RegExp("(?:<iframe id=\"meebo-iframe\"|meebo\\('domready'\\))"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
