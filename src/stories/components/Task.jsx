

export const Task = ({
    task: { id, title, state },
    onArchiveTask,
    onPinTask,
}) => {
    return (
        <div>
            <textarea value={title} editable={false} />
        </div >
    )
}