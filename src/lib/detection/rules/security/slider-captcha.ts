import type { TechnologyDefinition } from '../../types';

export const sliderCaptchaTechnologyDefinition = {
	id: "slider-captcha",
	name: "Slider Captcha",
	website: "https://github.com/ArgoZhang/SliderCaptcha",
	description: "Slider Captcha is a free service that helps protect websites from spam and abuse.",
	icon: "default.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "slider-captcha:jsGlobal:0",
			kind: "jsGlobal",
			property: "sliderCaptcha",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
