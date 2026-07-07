import type { TechnologyDefinition } from '../../types';

export const opencvTechnologyDefinition = {
	id: "opencv",
	name: "OpenCV",
	website: "https://opencv.org",
	description: "OpenCV (Open Source Computer Vision Library) is an open source computer vision and machine learning software library.",
	icon: "OpenCV.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "opencv:jsGlobal:0",
			kind: "jsGlobal",
			property: "opencvIsReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:opencv:opencv:*:*:*:*:*:*:*:*",
	},
	implies: [
		"webassembly",
	],
} as const satisfies TechnologyDefinition;
