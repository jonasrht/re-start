let defaultNotes = []

function loadNotes() {
    try {
        const stored = localStorage.getItem('notes')
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (error) {
        console.error('failed to load notes from localStorage:', error)
    }

    return defaultNotes
}

export function saveNotes(notes) {
    try {
        localStorage.setItem('notes', JSON.stringify(notes))
    } catch (error) {
        console.error('failed to save notes to localStorage:', error)
    }
}

export let notes = $state(loadNotes())
