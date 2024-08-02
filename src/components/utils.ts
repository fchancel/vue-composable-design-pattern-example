export function clickIsInContext(elt: HTMLElement | null, target: Node | null): boolean {
    const clickIsInContext = !!elt && elt.contains(target);

    return clickIsInContext;
}
