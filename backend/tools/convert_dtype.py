import pandas as pd

from state import AthenaState
from agents.graph import athena_graph


def convert_dtype(
    state: AthenaState,
    column_name: str,
    dtype: str,
)->AthenaState:


    cleaned_df = state["cleaned_dataframe"].copy()

    if column_name not in cleaned_df.columns:
        raise ValueError(
            f"Column '{column_name}' does not exist."
        )

    dtype = dtype.lower()

    try:

        if dtype == "datetime":
            cleaned_df[column_name] = pd.to_datetime(
                cleaned_df[column_name]
            )

        elif dtype == "category":
            cleaned_df[column_name] = cleaned_df[column_name].astype(
                "category"
            )

        else:
            cleaned_df[column_name] = cleaned_df[column_name].astype(
                dtype
            )

    except Exception as e:
        raise ValueError(
            f"Failed to convert '{column_name}' to {dtype}: {e}"
        )

    state["cleaned_dataframe"] = cleaned_df

    dataframe = state["dataframe"].copy()

    try:

        if dtype == "datetime":
            dataframe[column_name] = pd.to_datetime(
                dataframe[column_name]
            )

        elif dtype == "category":
            dataframe[column_name] = dataframe[column_name].astype(
                "category"
            )

        else:
            dataframe[column_name] = dataframe[column_name].astype(
                dtype
            )

    except Exception:
        pass

    state["dataframe"] = dataframe

    state = athena_graph.invoke(state)
    state["chat_response"] = "Changed successfully."
    return state