import type { TechnologyDefinition } from '../../types';

export const stimulusreflexTechnologyDefinition = {
	id: "stimulusreflex",
	name: "StimulusReflex",
	website: "https://docs.stimulusreflex.com",
	description: "StimulusReflex lets you create reactive web interfaces with Ruby on Rails.",
	icon: "stimulus-reflex-logo.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "stimulusreflex:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.stimulate"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stimulusreflex:dom:1",
			kind: "dom",
			selector: "[data-reflex]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"ruby-on-rails",
		"stimulus",
	],
} as const satisfies TechnologyDefinition;
