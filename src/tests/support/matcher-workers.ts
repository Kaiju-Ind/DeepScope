import { createMatcherPartitionTasks } from '@/lib/matcher/partition';
import type { MatcherPartitionResult, MatcherPartitionTask, MatcherWorkerRunMessage } from '@/lib/matcher/contracts';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from './factories';

/** Minimal DedicatedWorker test double that keeps message ownership observable. */
export class FakeWorker {
	static readonly instances: FakeWorker[] = [];

	readonly listeners = new Map<string, Set<(event: MessageEvent<unknown>) => void>>();
	lastMessage: MatcherWorkerRunMessage | undefined;
	terminated = false;

	constructor(_url: URL, readonly options?: WorkerOptions) {
		FakeWorker.instances.push(this);
	}

	addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
		const callbacks = this.listeners.get(type) ?? new Set();
		callbacks.add(listener as (event: MessageEvent<unknown>) => void);
		this.listeners.set(type, callbacks);
	}

	removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
		this.listeners.get(type)?.delete(listener as (event: MessageEvent<unknown>) => void);
	}

	postMessage(message: MatcherWorkerRunMessage): void {
		this.lastMessage = message;
	}

	terminate(): void {
		this.terminated = true;
	}

	emitError(message = 'worker crashed'): void {
		const event = { error: new Error(message), message, filename: 'matcher.worker.js', lineno: 1, colno: 1 } as ErrorEvent;
		for (const listener of this.listeners.get('error') ?? []) listener(event as unknown as MessageEvent<unknown>);
	}

	emitMessage(data: unknown): void {
		const event = { data } as MessageEvent<unknown>;
		for (const listener of this.listeners.get('message') ?? []) listener(event);
	}
}

export function createTasks(): Readonly<Record<'scriptSrc' | 'meta', MatcherPartitionTask>> {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/',
		meta: { generator: ['Example CMS'] },
		scripts: ['https://cdn.example/runtime.js'],
	}));
	const job = { jobId: 'base', tabId: 1, windowId: 1, expectedUrl: batch.target.url } as const;
	const tasks = createMatcherPartitionTasks({ job, batch });
	const scriptSrc = tasks.find((task) => task.kind === 'scriptSrc');
	const meta = tasks.find((task) => task.kind === 'meta');
	if (!scriptSrc || !meta) throw new Error('Matcher pool fixture did not produce required kinds.');
	return { scriptSrc, meta };
}

export function ownedTask(template: MatcherPartitionTask, jobId: string, tabId: number): MatcherPartitionTask {
	return {
		...template,
		job: { ...template.job, jobId, tabId },
		partitionId: `${jobId}:${template.kind}`,
	};
}

export function result(task: MatcherPartitionTask): MatcherPartitionResult {
	return {
		job: task.job,
		partitionId: task.partitionId,
		kind: task.kind,
		priority: task.priority,
		observationCount: task.batch.observations.length,
		matches: [],
		diagnostics: {
			observationCount: task.batch.observations.length,
			skippedObservationCount: 0,
			candidateRuleCount: 0,
			keyedRuleCount: 0,
			fallbackRuleCount: 0,
			literalRuleCount: 0,
			literalRejectedRuleCount: 0,
			matchCount: 0,
			observationsByKind: { [task.kind]: task.batch.observations.length },
			skippedObservationsByKind: {},
			candidateRulesByKind: {},
		},
		completedAt: 1,
	};
}
