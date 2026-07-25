from state import AthenaState
from agents.graph import athena_graph


def replace_values(
    state: AthenaState,
    column_name: str,
    old_value,
    new_value,
) -> AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    cleaned_df[column_name] = cleaned_df[column_name].replace(
        old_value,
        new_value,
    )

    state["cleaned_dataframe"] = cleaned_df

    # Keep dataframe in sync
    dataframe = state["dataframe"].copy()

    dataframe[column_name] = dataframe[column_name].replace(
        old_value,
        new_value,
    )

    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)
    state["chat_response"] = "Replaced successfully."
    return state