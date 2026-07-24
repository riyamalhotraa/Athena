from agents.executor import execute
from agents.action import Action
from agents.graph import athena_graph

# Create initial state
state = {
    "file_path": r"C:\Users\Riya Malhotra\Desktop\athena-app\backend\uploads\titanic.csv"
}

# Run the analysis graph once
state = athena_graph.invoke(state)

print("Columns before:")
print(state["cleaned_dataframe"].columns.tolist())

# Create an action
action = Action(
    tool="delete_column",
    parameters={
        "column_name": "Cabin"
    }
)

# Execute it
state = execute(action, state)

print("\nColumns after:")
print(state["cleaned_dataframe"].columns.tolist())