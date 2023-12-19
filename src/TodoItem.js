function TodoItem({ item, removeItem, toggleCompleted }) {
  return (
    <div className="todo-item">
      <div>
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={() => toggleCompleted(item.id)}
          aria-label="checkbox-input"
        />
        <span className={item.isComplete ? "completed" : ""}>
          {item.description}
        </span>
      </div>
      <div>
        <button
          className="remove-button"
          onClick={() => removeItem(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default TodoItem;
