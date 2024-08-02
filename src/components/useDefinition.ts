import { ref, toValue, watchEffect, type MaybeRef } from "vue";
import { DICTIONARY_BASE_URL, DICTIONARY_API_URL } from './constant';

interface DictionaryResponse {
    fr?: {
        definitions?: {
            definition: string;
        }[];
    }[];
}

export function useDefinition(word?: MaybeRef<string | null>) {

    const error = ref<string | null>(null);
    const isLoading = ref(false);
    const definition = ref<string | null>(null);

    async function getDefinition(word: string): Promise<void> {
        isLoading.value = true;
        error.value = null;
        definition.value = null;

        try {
            const response = await fetch(`${DICTIONARY_API_URL}${word}`);
            handleFetchError(response.status);
            const body: DictionaryResponse = await response.json();
            manageDefinitionResponse(body);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            isLoading.value = false;
        }
    };

    function handleFetchError(status: number): void {
        switch (status) {
            case 404:
                throw new Error('No definition found');
            default:
                return;
        }
    }

    function manageDefinitionResponse(body: DictionaryResponse): void {
        const firstDefinition = body?.fr?.[0]?.definitions?.[0]?.definition;
        if (firstDefinition) {
            definition.value = transformLinks(firstDefinition);
        } else {
            error.value = 'No definition available in French';
            definition.value = null;
        }
    };

    function transformLinks(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;

        const links = div.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                link.setAttribute('href', `${DICTIONARY_BASE_URL}${href}`);
                link.setAttribute('target', '_blank');
            }
        });

        return div.innerHTML;
    }

    watchEffect(() => {
        const wordValue = toValue(word);
        if (wordValue) {
            getDefinition(wordValue);
        }
    })

    return { definition, error, isLoading }
}
