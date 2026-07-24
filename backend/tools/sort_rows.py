from state import AthenaState
from agents.graph import athena_graph


def sort_rows(
    state: AthenaState,
    column_name: str,
    ascending: bool = True,
) -> AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    cleaned_df = cleaned_df.sort_values(
        by=column_name,
        ascending=ascending,
    ).reset_index(drop=True)

    state["cleaned_dataframe"] = cleaned_df

    # Keep dataframe in sync
    dataframe = state["dataframe"].copy()

    dataframe = dataframe.sort_values(
        by=column_name,
        ascending=ascending,
    ).reset_index(drop=True)

    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)

    return state