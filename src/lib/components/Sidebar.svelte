<script>
    import { fly } from 'svelte/transition'
    import { notes, saveNotes } from '../notes-store.svelte.js'

    let { showSidebar = false, onNoteSelect } = $props()

    function createNewNote() {
        const newNote = {
            id: Date.now(),
            title: 'untitled',
            content: '',
            createdAt: new Date().toISOString(),
        }
        notes.push(newNote)
        saveNotes(notes)
        onNoteSelect(newNote.id)
    }

    function selectNote(noteId) {
        onNoteSelect(noteId)
    }
</script>

<div class="sidebar-trigger" class:active={showSidebar}></div>

{#if showSidebar}
    <div class="sidebar" transition:fly={{ x: -320, duration: 200 }}>
        <div class="header">
            <h2>notes</h2>
            <button class="new-note-btn" onclick={createNewNote}>
                + new
            </button>
        </div>

        <div class="content">
            <div class="notes-list">
                {#each notes as note (note.id)}
                    <button
                        class="note-item"
                        onclick={() => selectNote(note.id)}
                    >
                        <div class="note-title">{note.title}</div>
                        <div class="note-preview">
                            {note.content?.substring(0, 60) || 'empty note'}
                            {#if note.content && note.content.length > 60}...{/if}
                        </div>
                    </button>
                {/each}

                {#if notes.length === 0}
                    <div class="empty-state">
                        <p>no notes yet</p>
                        <p class="empty-hint">click "+ new" to create one</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .sidebar-trigger {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 20px;
        z-index: 200;
    }

    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 320px;
        background: var(--bg-2);
        border-right: 2px solid var(--bg-3);
        z-index: 150;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .header {
        padding: 1.5rem;
        border-bottom: 2px solid var(--bg-3);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 300;
    }

    .new-note-btn {
        padding: 0.5rem 1rem;
        background: var(--bg-3);
        border: 1px solid var(--txt-4);
        border-radius: 2px;
        font-size: 0.9rem;
        transition: all 0.2s ease;
    }

    .new-note-btn:hover {
        border-color: var(--txt-3);
        color: var(--txt-1);
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    .notes-list {
        display: flex;
        flex-direction: column;
    }

    .note-item {
        width: 100%;
        text-align: left;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--bg-3);
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        transition: background 0.15s ease;
        cursor: pointer;
    }

    .note-item:hover {
        background: var(--bg-3);
    }

    .note-title {
        font-weight: 400;
        color: var(--txt-1);
        font-size: 0.95rem;
    }

    .note-preview {
        color: var(--txt-3);
        font-size: 0.85rem;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .empty-state {
        padding: 2rem 1.5rem;
        text-align: center;
        color: var(--txt-4);
    }

    .empty-state p {
        margin: 0.5rem 0;
    }

    .empty-hint {
        font-size: 0.85rem;
    }
</style>
