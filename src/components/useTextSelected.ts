import { ref } from 'vue';

export function useTextSelected() {
    const textSelected = ref<string | null>('');

    function getSelectedText(): void {
        const selection = window.getSelection();
        textSelected.value = selection ? selection.toString().trim() : null;
    };

    return { getSelectedText, textSelected }
}
