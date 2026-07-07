import type { TechnologyDefinition } from '../../types';

export const blocklyTechnologyDefinition = {
	id: "blockly",
	name: "Blockly",
	website: "https://developers.google.com/blockly",
	description: "Blockly is a visual programming editor by Google that enables drag-and-drop block-based coding and serves as the underlying engine for many widely used coding education platforms.",
	icon: "Blockly.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "blockly:jsGlobal:0",
			kind: "jsGlobal",
			property: "Blockly.Block",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blockly:jsGlobal:1",
			kind: "jsGlobal",
			property: "BlocklyStorage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
