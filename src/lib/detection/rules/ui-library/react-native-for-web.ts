import type { TechnologyDefinition } from '../../types';

export const reactNativeForWebTechnologyDefinition = {
	id: "react-native-for-web",
	name: "React Native for Web",
	website: "https://necolas.github.io/react-native-web/",
	description: "React Native for Web is a library that allows developers to use React Native components and patterns to build cross-platform web applications alongside native mobile applications.",
	icon: "React.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "react-native-for-web:dom:0",
			kind: "dom",
			selector: "style#react-native-stylesheet",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "react-native-for-web:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/react-native-web@([\\d.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "react-native-for-web:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("react-native-stylesheet|[\"']react-native-web[\"']"),
			confidence: 75,
			description: "Bundled script content matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
