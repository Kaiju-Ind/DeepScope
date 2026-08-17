declare const __KAIJU_BUILD_ID__: string | undefined;

/** Build identity embedded by WXT/Vite for support reports. */
export function getDiagnosticBuildId(): string {
	return typeof __KAIJU_BUILD_ID__ === 'string' && __KAIJU_BUILD_ID__
		? __KAIJU_BUILD_ID__
		: 'development';
}
