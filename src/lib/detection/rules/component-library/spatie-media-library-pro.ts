import type { TechnologyDefinition } from '../../types';

export const spatieMediaLibraryProTechnologyDefinition = {
	id: "spatie-media-library-pro",
	name: "Spatie Media Library Pro",
	website: "https://medialibrary.pro",
	description: "Spatie Media Library Pro is a set of customizable UI components for Spatie Media Library.",
	icon: "Spatie Media Library Pro.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "spatie-media-library-pro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("media\\-library\\-pro\\-core"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
