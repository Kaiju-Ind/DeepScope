import type { TechnologyDefinition } from "../../types.ts";

export const flutterTechnologyDefinition: TechnologyDefinition = {
	id: 'flutter',
	name: 'Flutter',
	website: 'https://flutter.dev',
	description:
		'Flutter is an open source framework by Google for building beautiful, natively compiled, multi-platform applications from a single codebase.',
	icon: 'Flutter.svg',
	categories: [
		'component-library',
		'framework',
	],
	rules: [
		{
			id: 'flutter:jsGlobal:0',
			kind: 'jsGlobal',
			property: '_flutter.loader',
			description: 'Flutter web bootstrap code exposes the framework loader at window._flutter.loader.',
		},
		{
			id: 'flutter:jsGlobal:1',
			kind: 'jsGlobal',
			property: '_flutter_web_set_location_strategy',
			description: 'Legacy Flutter web builds expose the framework URL-strategy interop hook on the page global scope.',
		},
		{
			id: 'flutter:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'flutterCanvasKit',
			description: 'Flutter web exposes the loaded CanvasKit renderer module at window.flutterCanvasKit.',
		},
		{
			id: 'flutter:dom:3',
			kind: 'dom',
			selector: "meta#flutterweb-theme[name='theme-color']",
			confidence: 80,
			description: 'Flutter web creates the flutterweb-theme meta element when the engine applies the app theme color.',
		},
		{
			id: 'flutter:scriptSrc:4',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:^|/)flutter_bootstrap\\.js(?:[?#].*)?$'),
			description: 'Flutter web builds emit flutter_bootstrap.js as the generated application bootstrap script.',
		},
		{
			id: 'flutter:scriptContent:5',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![$\\p{ID_Continue}])_flutter\\.buildConfig\\s*=', 'u'),
			confidence: 85,
			description: 'Flutter web bootstrap code assigns generated build metadata to _flutter.buildConfig.',
		},
		{
			id: 'flutter:dom:6',
			kind: 'dom',
			selector: 'flutter-view',
			description: 'The Flutter web engine creates a flutter-view element as the root of each rendered Flutter view.',
		},
		{
			id: 'flutter:dom:7',
			kind: 'dom',
			selector: 'flt-glass-pane',
			description: 'The Flutter web engine creates an flt-glass-pane element inside each Flutter view.',
		},
	],
	versioning: {
		enabled: false,
		reason: 'Flutter web build metadata exposes engine revisions and application build data, not the Flutter SDK semantic version.',
	},
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:flutter:flutter:*:*:*:*:*:*:*:*',
	},
	implies: [
		'dart',
	],
} as const satisfies TechnologyDefinition;
