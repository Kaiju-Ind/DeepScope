import type { TechnologyDefinition } from '../../types';

export const fastapiTechnologyDefinition = {
	id: "fastapi",
	name: "FastAPI",
	website: "https://fastapi.tiangolo.com",
	description: "FastAPI is a web framework for building APIs with Python, utilizing standard Python type hints.",
	icon: "FastAPI.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "fastapi:dom:0",
			kind: "dom",
			selector: "link[href*='fastapi.tiangolo.com'][rel='shortcut icon']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:tiangolo:fastapi:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
