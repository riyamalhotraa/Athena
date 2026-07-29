from state import AthenaState
from tools.refresh_state import refresh_state
from agents.graph import athena_graph

from pathlib import Path

# def rename_column(
#     state: AthenaState,
#     old_name: str,
#     new_name: str,
# ) -> AthenaState:
#     """
#     Rename a column in the dataset.

#     Args:
#         state: Current Athena state.
#         old_name: Existing column name.
#         new_name: New column name.

#     Returns:
#         Updated Athena state.
#     """

#     df = state["cleaned_dataframe"].copy()

#     # Validate old column
#     if old_name not in df.columns:
#         raise ValueError(
#             f"Column '{old_name}' does not exist."
#         )

#     # Prevent duplicate column names
#     if new_name in df.columns:
#         raise ValueError(
#             f"Column '{new_name}' already exists."
#         )

#     df = df.rename(
#         columns={
#             old_name: new_name
#         }
#     )

#     state["cleaned_dataframe"] = df

#     state = refresh_state(state)

#     return {
#         "state": state,
#         "message": f"Column '{old_name}' renamed to '{new_name}'."
#     }

def rename_column(state:AthenaState, old_name:str, new_name:str):


    cleaned_df = state["cleaned_dataframe"].copy()
    cleaned_df.rename(columns={old_name: new_name}, inplace=True)
    state["cleaned_dataframe"] = cleaned_df

    # Keep dataframe in sync
    dataframe = state["dataframe"].copy()
    dataframe.rename(columns={old_name: new_name}, inplace=True)
    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)
    plots = {}
   
    for key, value in state["plots"].items():

        if value is None:
            continue

        elif isinstance(value, str):
            filename = Path(value).name
            state["plots"][key] = (
                f"https://athena-backend-pclz.onrender.com/plots/{filename}"
            )

        elif isinstance(value, list):
            state["plots"][key] = [
                f"https://athena-backend-pclz.onrender.com/plots/{Path(p).name}"
                for p in value
                if p
            ]

    state["chat_response"] = "Renamed successfully."
    state["plots"]= plots
    return state