import pandas as pd

from state import AthenaState
from agents.graph import athena_graph


def fill_missing(
    state: AthenaState,
    column_name: str,
    method: str = "mean",
    value=None,
) -> AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    method = method.lower()

    if method == "mean":

        if not pd.api.types.is_numeric_dtype(cleaned_df[column_name]):
            raise ValueError(
                "Mean can only be applied to numeric columns."
            )

        fill_value = cleaned_df[column_name].mean()

    elif method == "median":

        if not pd.api.types.is_numeric_dtype(cleaned_df[column_name]):
            raise ValueError(
                "Median can only be applied to numeric columns."
            )

        fill_value = cleaned_df[column_name].median()

    elif method == "mode":

        fill_value = cleaned_df[column_name].mode()[0]

    elif method == "value":

        fill_value = value

    else:

        raise ValueError(
            f"Unsupported method '{method}'."
        )

    cleaned_df[column_name] = cleaned_df[column_name].fillna(fill_value)

    state["cleaned_dataframe"] = cleaned_df

    dataframe = state["dataframe"].copy()
    dataframe[column_name] = dataframe[column_name].fillna(fill_value)
    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)

    state["chat_response"] = "Filled successfully."
    return state