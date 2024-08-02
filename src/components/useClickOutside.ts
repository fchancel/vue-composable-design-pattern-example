import { onMounted, onBeforeUnmount, type Ref, type MaybeRef, toValue } from 'vue';
import { clickIsInContext } from './utils';

export function useClickOutside(selectorsTargetedElts: MaybeRef<HTMLElement | null>, callback: () => void) {

    function handleClickOutside(event: MouseEvent) {
        const selector = toValue(selectorsTargetedElts);
        if (selector) {
            const isClickOutside = !clickIsInContext(selector, event.target as Node);

            if (isClickOutside) {
                callback();
            }
        }
    };

    onMounted(() => {
        document.addEventListener('mouseup', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('mouseup', handleClickOutside);
    });
}
