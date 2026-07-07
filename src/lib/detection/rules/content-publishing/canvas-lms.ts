import type { TechnologyDefinition } from '../../types';

export const canvasLmsTechnologyDefinition = {
	id: "canvas-lms",
	name: "Canvas LMS",
	website: "https://www.instructure.com/canvas",
	description: "Canvas LMS is a web-based learning management system, or LMS.",
	icon: "Canvas LMS.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "canvas-lms:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkcanvas_lms",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canvas-lms:header:1",
			kind: "header",
			key: "x-canvas-meta",
			valuePattern: new RegExp("login\\/canvas", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"react",
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
