import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined'
	? useLayoutEffect
	: useEffect

function useEventListener<EventName extends keyof WindowEventMap>(
	eventName: EventName,
	handler: (event: WindowEventMap[EventName]) => void): void;
function useEventListener<
	EventName extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLDivElement>(
		eventName: EventName,
		handler: (event: HTMLElementEventMap[EventName]) => void,
		element: RefObject<T>): void;
function useEventListener<
	WindowEventName extends keyof WindowEventMap,
	HTMLEventName extends keyof HTMLElementEventMap,
	T extends HTMLElement | void = void>(
		eventName: WindowEventName | HTMLEventName,
		handler: (
			event: WindowEventMap[WindowEventName] | HTMLElementEventMap[HTMLEventName] | Event
		) => void,
		element?: RefObject<T>) {

	const savedHandler = useRef(handler);
	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const targetElement: T | Window = element?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}
		const eventListener: typeof handler = event => savedHandler.current(event);
		targetElement.addEventListener(eventName, eventListener);

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}

export default useEventListener