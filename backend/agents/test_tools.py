
from agents.graph import athena_graph
from tools.delete_column import delete_column
from tools.rename_column import rename_column

state = {
    "file_path": r"C:\Users\Riya Malhotra\Downloads\titanic.csv"
}

state = athena_graph.invoke(state)

print("Before:")
print(state["cleaned_dataframe"].columns)

state = rename_column(
    state=state,
    old_name="Sex",
    new_name="Gender"
)

print("\nAfter:")
print(state["cleaned_dataframe"].columns)