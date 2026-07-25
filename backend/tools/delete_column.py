from state import AthenaState
from agents.graph import athena_graph


def delete_column(
    state: AthenaState,
    column_name: str,
) -> AthenaState:

    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    cleaned_df.drop(
        columns=[column_name],
        inplace=True,
    )

    state["cleaned_dataframe"] = cleaned_df

    dataframe = state["dataframe"].copy()
    dataframe.drop(
        columns=[column_name],
        inplace=True,
    )
    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)
    state["chat_response"] = "Column deleted successfully."
    return state