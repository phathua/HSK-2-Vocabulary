declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties
		}
	}
}

declare module '$app/stores' {
	import type { Readable } from 'svelte/store';
	export interface UpdatedStore extends Readable<boolean> {
		check(): Promise<boolean>;
	}
	export const updated: UpdatedStore;
}

