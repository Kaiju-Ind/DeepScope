import type { TechnologyDefinition } from '../../types';

export const parsElecomPortalTechnologyDefinition = {
	id: "pars-elecom-portal",
	name: "Pars Elecom Portal",
	website: "https://parselecom.net",
	icon: "parselecom.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pars-elecom-portal:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Pars Elecom Portal", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pars-elecom-portal:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Pars Elecom Portal", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pars-elecom-portal:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("pars elecom portal", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pars-elecom-portal:meta:3",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("pars elecom portal", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"iis",
		"microsoft-asp-net",
		"windows-server",
	],
} as const satisfies TechnologyDefinition;
