import type { TechnologyDefinition } from '../../types';

export const pluploadTechnologyDefinition = {
	id: "plupload",
	name: "Plupload",
	website: "https://plupload.com",
	description: "Plupload is a JavaScript API for dealing with file uploads.",
	icon: "Plupload.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "plupload:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plupload(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plupload:jsGlobal:1",
			kind: "jsGlobal",
			property: "plupload.DONE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plupload:jsGlobal:2",
			kind: "jsGlobal",
			property: "plupload.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:plupload:plupload:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
