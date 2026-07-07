import type { TechnologyDefinition } from '../../types';

export const googleWebToolkitTechnologyDefinition = {
	id: "google-web-toolkit",
	name: "Google Web Toolkit",
	website: "https://developers.google.com/web-toolkit",
	description: "Google Web Toolkit (GWT) is an open-source Java software development framework that makes writing AJAX applications.",
	icon: "Google Web Toolkit.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "google-web-toolkit:jsGlobal:0",
			kind: "jsGlobal",
			property: "__gwt_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-web-toolkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "__gwt_activeModules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-web-toolkit:jsGlobal:2",
			kind: "jsGlobal",
			property: "__gwt_getMetaProperty",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-web-toolkit:jsGlobal:3",
			kind: "jsGlobal",
			property: "__gwt_isKnownPropertyValue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-web-toolkit:jsGlobal:4",
			kind: "jsGlobal",
			property: "__gwt_stylesLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-web-toolkit:jsGlobal:5",
			kind: "jsGlobal",
			property: "__gwtlistener",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:google:web_toolkit:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
