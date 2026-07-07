import type { TechnologyDefinition } from '../../types';

export const devextremeTechnologyDefinition = {
	id: "devextreme",
	name: "DevExtreme",
	website: "https://js.devexpress.com",
	description: "DevExtreme is a collection of JavaScript UI components designed for Angular, React, Vue, and jQuery, developed by DevExpress.",
	icon: "DevExtreme.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "devextreme:jsGlobal:0",
			kind: "jsGlobal",
			property: "DevExpress._DEVEXTREME_BUNDLE_INITIALIZED",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"angular",
		"jquery",
		"react",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
