import type { TechnologyDefinition } from '../../types';

export const reactReduxTechnologyDefinition = {
	id: "react-redux",
	name: "React Redux",
	website: "https://react-redux.js.org/",
	description: "React Redux is the official React binding for Redux.",
	icon: "Redux.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "react-redux:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/react-redux(?:@|\\/)([\\d.]+)(?:\\/[^/]+)?\\/(?:dist\\/)?react-redux(?:\\.browser|\\.min)?\\.(?:mjs|js)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "react-redux:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("[\"']react-redux[\"']|from[\"']react-redux[\"']"),
			confidence: 75,
			description: "Bundled script content matches a known technology marker.",
		},
		{
			id: "react-redux:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\bProvider\\b[^;]+\\buseSelector\\b[^;]+\\buseDispatch\\b|\\buseSelector\\b[^;]+\\buseDispatch\\b[^;]+\\buseStore\\b"),
			confidence: 45,
			description: "Bundled script content matches a known technology marker.",
		},
	],
	implies: [
		"react",
		"redux",
	],
} as const satisfies TechnologyDefinition;
