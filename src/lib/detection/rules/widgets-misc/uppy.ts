import type { TechnologyDefinition } from '../../types';

export const uppyTechnologyDefinition = {
	id: "uppy",
	name: "Uppy",
	website: "https://uppy.io",
	description: "Uppy is an open-source, modular JavaScript file uploader designed for integration and file management across web applications.",
	icon: "Uppy.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "uppy:jsGlobal:0",
			kind: "jsGlobal",
			property: "Uppy.Audio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uppy:jsGlobal:1",
			kind: "jsGlobal",
			property: "UppyUploader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
