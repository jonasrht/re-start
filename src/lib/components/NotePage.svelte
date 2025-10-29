<script>
    import { fade, fly } from 'svelte/transition'
    import { notes, saveNotes } from '../notes-store.svelte.js'

    let { noteId, onClose } = $props()

    let note = $derived(notes.find((n) => n.id === noteId))
    let title = $state('')
    let content = $state('')
    let contentTextarea = $state()

    // Initialize state when note changes
    $effect(() => {
        if (note) {
            title = note.title
            content = note.content
        }
    })

    // Auto-save with debounce
    let saveTimeout
    $effect(() => {
        if (note && (title !== note.title || content !== note.content)) {
            clearTimeout(saveTimeout)
            saveTimeout = setTimeout(() => {
                note.title = title || 'untitled'
                note.content = content
                note.updatedAt = new Date().toISOString()
                saveNotes(notes)
            }, 500)
        }
    })

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            onClose()
        }
    }

    function handleTitleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (contentTextarea) {
                contentTextarea.focus()
            }
        }
    }

    function deleteNote() {
        if (confirm('Delete this note?')) {
            const index = notes.findIndex((n) => n.id === noteId)
            if (index !== -1) {
                notes.splice(index, 1)
                saveNotes(notes)
                onClose()
            }
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if note}
    <div
        class="backdrop"
        onclick={onClose}
        onkeydown={(e) => e.key === 'Enter' && onClose()}
        role="button"
        tabindex="0"
        transition:fade={{ duration: 200 }}
    ></div>

    <div class="note-page" transition:fly={{ y: 40, duration: 300 }}>
        <div class="note-header">
            <button class="back-btn" onclick={onClose}>← back</button>
            <button class="delete-btn" onclick={deleteNote}>delete</button>
        </div>

        <div class="note-content-wrapper">
            <input
                type="text"
                class="note-title-large"
                bind:value={title}
                placeholder="untitled"
                onkeydown={handleTitleKeydown}
            />

            <textarea
                class="note-editor"
                bind:value={content}
                bind:this={contentTextarea}
                placeholder="start writing..."
                rows="20"
            ></textarea>

            <div class="note-meta">
                {#if note.updatedAt}
                    <span
                        >last edited: {new Date(
                            note.updatedAt
                        ).toLocaleDateString()}</span
                    >
                {:else}
                    <span
                        >created: {new Date(
                            note.createdAt
                        ).toLocaleDateString()}</span
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 250;
    }

    .note-page {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        background: var(--bg-1);
        border: 2px solid var(--bg-3);
        z-index: 300;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .note-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 2px solid var(--bg-3);
    }

    .back-btn {
        font-size: 0.9rem;
        color: var(--txt-3);
    }

    .back-btn:hover {
        color: var(--txt-2);
    }

    .delete-btn {
        font-size: 0.9rem;
        color: var(--txt-err);
    }

    .delete-btn:hover {
        color: var(--txt-2);
    }

    .note-content-wrapper {
        flex: 1;
        overflow-y: auto;
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .note-title-large {
        font-size: 2.5rem;
        font-weight: 300;
        color: var(--txt-1);
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        outline: none;
        width: 100%;
        line-height: 1.2;
    }

    .note-title-large::placeholder {
        color: var(--txt-4);
    }

    .note-editor {
        flex: 1;
        min-height: 400px;
        background: none;
        border: none;
        color: var(--txt-2);
        font-size: 1rem;
        line-height: 1.7;
        padding: 0;
        margin: 0;
        outline: none;
        resize: none;
        font-family: 'Geist Mono Variable', monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .note-editor::placeholder {
        color: var(--txt-4);
    }

    .note-meta {
        padding-top: 1rem;
        border-top: 1px solid var(--bg-3);
        color: var(--txt-4);
        font-size: 0.85rem;
    }

    @media (max-width: 768px) {
        .note-page {
            width: 95%;
            max-height: 95vh;
        }

        .note-content-wrapper {
            padding: 1.5rem;
        }

        .note-title-large {
            font-size: 2rem;
        }
    }
</style>
