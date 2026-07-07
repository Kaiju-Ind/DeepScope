import type { TechnologyDefinition } from '../../types';

export const mvdStudioTechnologyDefinition = {
	id: "mvd-studio",
	name: "MVD Studio",
	website: "https://mvdstudio.com.uy",
	description: "MVD Studio is a Laravel-based platform built by MVD Studio (Uruguay) for e-commerce stores and bespoke web applications.",
	icon: "MVD Studio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mvd-studio:header:0",
			kind: "header",
			key: "X-Built-By",
			valuePattern: new RegExp("MVD Studio", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mvd-studio:header:1",
			kind: "header",
			key: "X-Generator",
			valuePattern: new RegExp("MVD Studio", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mvd-studio:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("MVD Studio", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mvd-studio:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("MVD Studio", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"laravel",
		"php",
	],
} as const satisfies TechnologyDefinition;
