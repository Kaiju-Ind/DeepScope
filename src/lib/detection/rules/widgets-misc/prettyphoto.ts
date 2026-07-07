import type { TechnologyDefinition } from '../../types';

export const prettyphotoTechnologyDefinition = {
	id: "prettyphoto",
	name: "prettyPhoto",
	website: "https://github.com/scaron/prettyphoto",
	icon: "prettyPhoto.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "prettyphoto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.prettyPhoto\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prettyphoto:html:1",
			kind: "html",
			pattern: new RegExp("(?:<link [^>]*href=\"[^\"]*prettyPhoto(?:\\.min)?\\.css|<a [^>]*rel=\"prettyPhoto)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "prettyphoto:jsGlobal:2",
			kind: "jsGlobal",
			property: "pp_alreadyInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prettyphoto:jsGlobal:3",
			kind: "jsGlobal",
			property: "pp_descriptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prettyphoto:jsGlobal:4",
			kind: "jsGlobal",
			property: "pp_images",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prettyphoto:jsGlobal:5",
			kind: "jsGlobal",
			property: "pp_titles",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prettyphoto:dom:6",
			kind: "dom",
			selector: "link[href*='prettyPhoto.css'], link[href*='prettyPhoto.min.css'], a[rel='prettyPhoto']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "prettyphoto:scriptSrc:7",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.prettyphoto\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prettyphoto:html:8",
			kind: "html",
			pattern: new RegExp("(?:<link [^>]*href=\"[^\"]*prettyphoto(?:\\.min)?\\.css|<a [^>]*rel=\"prettyphoto)"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
