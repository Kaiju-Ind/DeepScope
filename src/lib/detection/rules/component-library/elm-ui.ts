import type { TechnologyDefinition } from '../../types';

export const elmUiTechnologyDefinition = {
	id: "elm-ui",
	name: "Elm-ui",
	website: "https://github.com/mdgriffith/elm-ui",
	description: "Elm-UI is a library for creating user interfaces in Elm programming language. It provides a set of functions and abstractions for building responsive and reusable UI components, such as buttons, forms, and layouts, in a declarative and type-safe way.",
	icon: "elm.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "elm-ui:html:0",
			kind: "html",
			pattern: new RegExp("<style>[\\s\\S]*\\.explain > \\.s[\\s\\S]*\\.explain > \\.ctr > \\.s"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "elm-ui:html:1",
			kind: "html",
			pattern: new RegExp("<style>[\\s\\s]*\\.explain > \\.s[\\s\\s]*\\.explain > \\.ctr > \\.s"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"elm",
	],
} as const satisfies TechnologyDefinition;
