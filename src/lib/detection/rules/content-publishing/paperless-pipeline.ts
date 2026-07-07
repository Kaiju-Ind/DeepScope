import type { TechnologyDefinition } from '../../types';

export const paperlessPipelineTechnologyDefinition = {
	id: "paperless-pipeline",
	name: "Paperless Pipeline",
	website: "https://www.paperlesspipeline.com",
	description: "Paperless Pipeline is a real estate transaction management software.",
	icon: "PaperlessPipeline.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "paperless-pipeline:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.paperlesspipeline\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "paperless-pipeline:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Paperless Pipeline$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "paperless-pipeline:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^paperless pipeline$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
