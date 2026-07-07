import type { TechnologyDefinition } from '../../types';

export const swaggerUiTechnologyDefinition = {
	id: "swagger-ui",
	name: "Swagger UI",
	website: "https://swagger.io/tools/swagger-ui",
	description: "Swagger UI is a collection of HTML, JavaScript, and CSS assets that dynamically generate documentation from a Swagger-compliant API.",
	icon: "Swagger UI.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "swagger-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/([\\d.]+))?\\/swagger-ui-bundle\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swagger-ui:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("swagger-ui"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "swagger-ui:jsGlobal:2",
			kind: "jsGlobal",
			property: "SwaggerUIBundle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "swagger-ui:jsGlobal:3",
			kind: "jsGlobal",
			property: "SwaggerUIStandalonePreset",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "swagger-ui:jsGlobal:4",
			kind: "jsGlobal",
			property: "versions.swaggerUi.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:smartbear:swagger_ui:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
