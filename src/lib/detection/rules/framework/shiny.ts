import type { TechnologyDefinition } from '../../types';

export const shinyTechnologyDefinition = {
	id: "shiny",
	name: "Shiny",
	website: "https://shiny.rstudio.com",
	description: "Shiny is an R package that enables the creation of interactive web applications using only R code, facilitating reactive programming and providing a variety of prebuilt widgets for dynamic user interfaces.",
	icon: "Shiny.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "shiny:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shiny.addCustomMessageHandler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shiny:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Shiny Server$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:rstudio:shiny_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
