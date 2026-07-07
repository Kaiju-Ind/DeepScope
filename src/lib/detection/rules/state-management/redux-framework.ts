import type { TechnologyDefinition } from '../../types';

export const reduxFrameworkTechnologyDefinition = {
	id: "redux-framework",
	name: "Redux Framework",
	website: "https://redux.io",
	description: "Redux Framework is a modular PHP library that allows developers to create customisable settings panels and controls for WordPress projects, providing a consistent user interface for managing options and settings.",
	icon: "Redux Framework.svg",
	categories: [
		"state-management",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "redux-framework:meta:0",
			kind: "meta",
			key: "framework",
			valuePattern: new RegExp("Redux\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "redux-framework:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Redux\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "redux-framework:meta:2",
			kind: "meta",
			key: "framework",
			valuePattern: new RegExp("redux\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "redux-framework:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("redux\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
