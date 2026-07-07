import type { TechnologyDefinition } from '../../types';

export const easyWebEditorTechnologyDefinition = {
	id: "easy-web-editor",
	name: "Easy Web Editor",
	website: "https://easywebeditor.com",
	description: "Easy Web Editor is a website builder platform that enables users to create and manage web pages through a visual interface without requiring advanced coding knowledge.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "easy-web-editor:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("visualvision\\.com ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
