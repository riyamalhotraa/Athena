from state import AthenaState
from agents.graph import athena_graph


def filter_rows(
    state: AthenaState,
    column_name: str,
    operator: str,
    value,
) -> AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    if operator == "==":
        cleaned_df = cleaned_df[cleaned_df[column_name] == value]

    elif operator == "!=":
        cleaned_df = cleaned_df[cleaned_df[column_name] != value]

    elif operator == ">":
        cleaned_df = cleaned_df[cleaned_df[column_name] > value]

    elif operator == "<":
        cleaned_df = cleaned_df[cleaned_df[column_name] < value]

    elif operator == ">=":
        cleaned_df = cleaned_df[cleaned_df[column_name] >= value]

    elif operator == "<=":
        cleaned_df = cleaned_df[cleaned_df[column_name] <= value]

    else:
        raise ValueError(
            f"Unsupported operator '{operator}'."
        )

    state["cleaned_dataframe"] = cleaned_df

    dataframe = state["dataframe"].copy()

    if operator == "==":
        dataframe = dataframe[dataframe[column_name] == value]

    elif operator == "!=":
        dataframe = dataframe[dataframe[column_name] != value]

    elif operator == ">":
        dataframe = dataframe[dataframe[column_name] > value]

    elif operator == "<":
        dataframe = dataframe[dataframe[column_name] < value]

    elif operator == ">=":
        dataframe = dataframe[dataframe[column_name] >= value]

    elif operator == "<=":
        dataframe = dataframe[dataframe[column_name] <= value]

    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)
    state["chat_response"] = "Filtered successfully."
    return state