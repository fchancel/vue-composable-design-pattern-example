<template>
    <div
        @click="selectText"
        class="contextmenu-wrapper"
        ref="contextmenuWrapper"
    >
        <div
            v-if="contextmenuIsVisible"
            ref="contextmenu"
            class="contextmenu"
            :style="{ top: `${positionContextmenu.y}px`, left: `${positionContextmenu.x}px` }"
        >
            <p v-if="isLoading" class="italic">Definition is loading...</p>
            <p v-else-if="error" class="italic">{{ error }}</p>
            <p v-else v-html="definition" class="definition"></p>
        </div>
        <slot />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useTextSelected } from './useTextSelected';
import { clickIsInContext } from './utils';
import { useClickOutside } from './useClickOutside';
import { useDefinition } from './useDefinition';

const contextmenu = ref<HTMLElement | null>(null);
const contextmenuWrapper = ref<HTMLElement | null>(null);
const contextmenuIsVisible = ref(false);
const positionContextmenu = ref({ x: 0, y: 0 });

useClickOutside(contextmenu, hideContextMenu);
const { getSelectedText, textSelected } = useTextSelected();
const { definition, error, isLoading } = useDefinition(textSelected);

function selectText(event: MouseEvent): void {
    if (!contextmenuIsVisible.value) {
        getSelectedText();
        const clickIsInsideContext = clickIsInContext(contextmenuWrapper.value, event.target as Node);

        if (textSelected.value && clickIsInsideContext) {
            positionContextmenu.value = { x: event.pageX, y: event.pageY };
            contextmenuIsVisible.value = true;
        }
    }
}

function hideContextMenu(): void {
    contextmenuIsVisible.value = false;
}
</script>
    
<style>
.contextmenu {
    position: absolute;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    margin: 0;
    padding: 0 1rem;
    display: inline-block;
    color: rgb(90, 90, 90);
    line-height: 1.6rem;
}

.italic {
    font-style: italic;
}

.definition a {
    text-decoration: none;
    font-style: italic;
    color: rgb(37, 116, 108);
    border-bottom: solid 2px rgb(47, 219, 202);
    padding: 0rem 0.2rem;
}

.definition a:hover {
    background-color: rgba(141, 202, 195, 0.2);
    color: rgb(13, 119, 143);
}
</style>
    