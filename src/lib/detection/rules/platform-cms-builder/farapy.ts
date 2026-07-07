import type { TechnologyDefinition } from '../../types';

export const farapyTechnologyDefinition = {
	id: "farapy",
	name: "FaraPy",
	website: "https://faral.tech",
	icon: "FaraPy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "farapy:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Powered by FaraPy."),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "farapy:html:1",
			kind: "html",
			pattern: new RegExp("<!-- powered by farapy."),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
