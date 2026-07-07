import type { TechnologyDefinition } from '../../types';

export const filepondTechnologyDefinition = {
	id: "filepond",
	name: "FilePond",
	website: "https://pqina.nl/filepond/",
	description: "FilePond is a JavaScript file upload library with previews, validation, and image processing support.",
	icon: "filepond.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "filepond:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("filepond.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "filepond:jsGlobal:1",
			kind: "jsGlobal",
			property: "FilePond",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "filepond:jsGlobal:2",
			kind: "jsGlobal",
			property: "FilePond.create",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "filepond:jsGlobal:3",
			kind: "jsGlobal",
			property: "FilePond.setOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
