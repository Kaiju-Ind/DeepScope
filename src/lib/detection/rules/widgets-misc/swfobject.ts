import type { TechnologyDefinition } from '../../types';

export const swfobjectTechnologyDefinition = {
	id: "swfobject",
	name: "SWFObject",
	website: "https://github.com/swfobject/swfobject",
	description: "SWFObject is an open-source JavaScript library used to embed Adobe Flash content onto web pages.",
	icon: "SWFObject.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "swfobject:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("swfobject.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swfobject:jsGlobal:1",
			kind: "jsGlobal",
			property: "SWFObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
