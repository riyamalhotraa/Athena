from state import AthenaState
from agents.graph import athena_graph


def drop_duplicates(
    state: AthenaState,
    subset: list[str] | None = None,
    keep: str = "first",
) -> AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if subset is not None:

        missing = [
            col
            for col in subset
            if col not in cleaned_df.columns
        ]

        if missing:
            raise ValueError(
                f"Columns not found: {missing}"
            )

    cleaned_df.drop_duplicates(
        subset=subset,
        keep=keep,
        inplace=True,
    )

    state["cleaned_dataframe"] = cleaned_df

    # Keep dataframe in sync
    dataframe = state["dataframe"].copy()

    dataframe.drop_duplicates(
        subset=subset,
        keep=keep,
        inplace=True,
    )

    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)

    return state