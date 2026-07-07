import type { TechnologyDefinition } from '../../types';

export const stimulusTechnologyDefinition = {
	id: "stimulus",
	name: "Stimulus",
	website: "https://stimulusjs.org/",
	description: "A modest JavaScript framework for the HTML you already have.",
	icon: "Stimulus.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "stimulus:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+data-controller"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "stimulus:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/stimulus-bundle\\/controllers\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stimulus:jsGlobal:2",
			kind: "jsGlobal",
			property: "Stimulus.Application",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stimulus:jsGlobal:3",
			kind: "jsGlobal",
			property: "stimulus_application",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stimulus:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("@hotwired\\/stimulus(?:-loading)?"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
