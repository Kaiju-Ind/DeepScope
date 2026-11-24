// Vendored from Kaiju-Ind/Utils packages/task/types.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/** Compiler checks for both standard progress and an authored custom progress effect. */
import * as task from './mod.ts';
import * as effect from '@utils/capability/effect';
import * as schema from '@utils/schema';
import type { ProgressType } from './progress.ts';

const Count = effect.define({ id: 'types.count', value: schema.number() });
function contracts(): void {
	const work = task.start(() => 1, { progress: Count });
	const latest: number | ProgressType | undefined = work.progress?.value;
	void latest;
	work.updates.subscribe((occurrence) => {
		const value: number | ProgressType = occurrence.value;
		void value;
		// @ts-expect-error Progress does not silently widen to unknown or an unrelated type.
		const invalid: string = occurrence.value;
		void invalid;
	});
}
void contracts;
