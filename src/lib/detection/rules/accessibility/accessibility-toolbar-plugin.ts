import type { TechnologyDefinition } from '../../types';

export const accessibilityToolbarPluginTechnologyDefinition = {
	id: "accessibility-toolbar-plugin",
	name: "Accessibility Toolbar Plugin",
	website: "https://webworks.ga/acc_toolbar",
	description: "Accessibility Toolbar Plugin is an accessibility component without dependencies (clean javascript), including a variety of tools.",
	icon: "Accessibility Toolbar Plugin.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "accessibility-toolbar-plugin:jsGlobal:0",
			kind: "jsGlobal",
			property: "MicAccessTool.prototype.openCloseBoxKeyboard",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
