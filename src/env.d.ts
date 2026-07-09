interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
	length: number;
	[index: number]: TElement;
	css(property: string, value?: string | number): this;
	on(event: string, handler: (this: Element, e: Event) => unknown): this;
	on(event: string, selector: string, handler: (this: Element, e: Event) => unknown): this;
	hide(): this;
	magnificPopup: {
		(options: Record<string, unknown>): JQuery;
		close(): void;
	};
}

interface JQueryStatic {
	(selector: string, context?: Element | Document | JQuery): JQuery;
	(element: Element): JQuery;
	(callback: (this: Document, $: JQueryStatic) => void): JQuery;
	(html: string, ownerDocument_attributes?: Document | Record<string, unknown>): JQuery;
	<T extends Element>(element_elementArray: T | ArrayLike<T>): JQuery<T>;
	(document: Document): JQuery<HTMLElement>;
	ready: Promise<JQueryStatic>;
	Deferred: unknown;
	magnificPopup: {
		(options: Record<string, unknown>): JQuery;
		close(): void;
	};
}

declare const $: JQueryStatic;
declare const jQuery: JQueryStatic;

interface WaypointOptions {
	element: HTMLElement;
	handler(this: Waypoint, direction: "up" | "down"): void;
}

interface Waypoint {
	element: HTMLElement;
	previous(): Waypoint | null;
}

interface WaypointConstructor {
	new (options: WaypointOptions): Waypoint;
	(options: WaypointOptions): Waypoint;
}

declare const Waypoint: WaypointConstructor;
