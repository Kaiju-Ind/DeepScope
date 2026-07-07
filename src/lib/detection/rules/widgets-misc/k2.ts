import type { TechnologyDefinition } from '../../types';

export const k2TechnologyDefinition = {
	id: "k2",
	name: "K2",
	website: "https://getk2.org",
	description: "K2 is a content management extension for Joomla, developed by JoomlaWorks, that enhances Joomla's capabilities by providing features like rich content forms, nested categories, tags, comments, and more.",
	icon: "K2.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "k2:html:0",
			kind: "html",
			pattern: new RegExp("<!--(?: JoomlaWorks \"K2\"| Start K2)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "k2:jsGlobal:1",
			kind: "jsGlobal",
			property: "K2RatingURL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "k2:html:2",
			kind: "html",
			pattern: new RegExp("<!--(?: joomlaworks \"k2\"| start k2)"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
