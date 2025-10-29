<script>
    import { onMount } from 'svelte'
    import { settings } from '../settings-store.svelte.js'

    let tasks = $state([])
    let newTaskInput = $state('')
    let taskCount = $derived(tasks.filter((task) => !task.checked).length)

    function loadTasks() {
        try {
            const stored = localStorage.getItem('tasks')
            if (stored) {
                const parsed = JSON.parse(stored)
                // Convert date strings back to Date objects
                tasks = parsed.map(task => ({
                    ...task,
                    due_date: task.due_date ? new Date(task.due_date) : null,
                    completed_at: task.completed_at ? new Date(task.completed_at) : null
                }))
            }
        } catch (err) {
            console.error('Failed to load tasks:', err)
        }
    }

    function saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        } catch (err) {
            console.error('Failed to save tasks:', err)
        }
    }

    function addTask() {
        if (!newTaskInput.trim()) return

        const newTask = {
            id: Date.now().toString(),
            content: newTaskInput.trim(),
            checked: false,
            due: false,
            due_date: null,
            has_time: false,
            completed_at: null
        }

        tasks = [...tasks, newTask]
        newTaskInput = ''
        saveTasks()
    }

    function toggleTask(taskId) {
        tasks = tasks.map((task) =>
            task.id === taskId
                ? {
                      ...task,
                      checked: !task.checked,
                      completed_at: !task.checked
                          ? new Date()
                          : null,
                  }
                : task
        )
        saveTasks()
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId)
        saveTasks()
    }

    function isTaskOverdue(task) {
        if (!task.due || task.checked) return false
        const now = new Date()
        return task.due_date.getTime() < now.getTime()
    }

    function formatDueDate(date, hasTime) {
        if (!date) return ''

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const dueDate = new Date(date)
        const dueDateOnly = new Date(
            dueDate.getFullYear(),
            dueDate.getMonth(),
            dueDate.getDate()
        )

        const diffTime = dueDateOnly.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        let dateString = ''

        if (diffDays === -1) {
            dateString = 'yesterday'
        } else if (diffDays === 0) {
            dateString = 'today'
        } else if (diffDays === 1) {
            dateString = 'tmrw'
        } else if (diffDays > 1 && diffDays < 7) {
            dateString = dueDate
                .toLocaleDateString('en-US', {
                    weekday: 'short',
                })
                .toLowerCase()
        } else {
            dateString = dueDate
                .toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                })
                .toLowerCase()
        }

        if (hasTime) {
            let timeString
            if (settings.timeFormat === '12hr') {
                timeString = dueDate
                    .toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    })
                    .toLowerCase()
            } else {
                timeString = dueDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false,
                })
            }
            dateString += ` ${timeString}`
        }

        return dateString
    }

    onMount(() => {
        loadTasks()
    })
</script>

<div class="panel-wrapper">
    <div class="widget-label">todos</div>
    <div class="panel">
        <div class="widget-header">
            <span>{taskCount} task{taskCount === 1 ? '' : 's'}</span>
        </div>

        <br />

        <div class="add-task">
            <input
                type="text"
                bind:value={newTaskInput}
                onkeydown={(e) => e.key === 'Enter' && addTask()}
                placeholder="add a task..."
            />
            <button onclick={addTask}>add</button>
        </div>

        <br />

        <div class="tasks">
            <div class="tasks-list">
                {#each tasks as task}
                    <div
                        class="task"
                        class:completed={task.checked}
                        class:overdue={isTaskOverdue(task)}
                    >
                        <button
                            onclick={() => toggleTask(task.id)}
                            class="checkbox"
                            class:completed={task.checked}
                        >
                            {task.checked ? '[x]' : '[ ]'}
                        </button>
                        <span class="task-title">{task.content}</span>
                        {#if task.due}
                            <span
                                class="task-due"
                                class:overdue-date={isTaskOverdue(task)}
                            >
                                {formatDueDate(
                                    task.due_date,
                                    task.has_time
                                )}
                            </span>
                        {/if}
                        <button
                            onclick={() => deleteTask(task.id)}
                            class="delete-btn"
                            title="delete task"
                        >
                            [x]
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .panel-wrapper {
        flex: 1;
    }
    .widget-header {
        display: flex;
        justify-content: space-between;
    }
    .add-task {
        display: flex;
        gap: 0.5rem;
    }
    .add-task input {
        flex: 1;
        background: transparent;
        border: 1px solid var(--txt-3);
        color: var(--txt-1);
        padding: 0.25rem 0.5rem;
        font-family: inherit;
        font-size: inherit;
    }
    .add-task input:focus {
        outline: none;
        border-color: var(--txt-1);
    }
    .add-task button {
        background: transparent;
        border: 1px solid var(--txt-3);
        color: var(--txt-1);
        padding: 0.25rem 0.75rem;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
    }
    .add-task button:hover {
        border-color: var(--txt-1);
    }
    .tasks {
        max-height: 15rem;
        overflow: auto;
        scrollbar-width: none;
    }
    .task {
        max-width: 40rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .task-due {
        color: var(--txt-3);
    }
    .task.completed .task-title {
        text-decoration: line-through;
    }
    .overdue-date {
        color: var(--txt-err);
    }
    .delete-btn {
        margin-left: auto;
        background: transparent;
        border: none;
        color: var(--txt-3);
        cursor: pointer;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
    }
    .delete-btn:hover {
        color: var(--txt-err);
    }
</style>
