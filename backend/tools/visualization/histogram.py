import matplotlib.pyplot as plt
import pandas as pd

from tools.visualization.utils import save_plot


def plot_histogram(
    state: dict,
    column: str,
    bins: int = 20
):
    """
    Generate histogram for a numeric column.
    """

    df = (
        state["cleaned_dataframe"]
        if state.get("cleaned_dataframe") is not None
        else state["dataframe"]
    )

    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    if column not in df.columns:
        raise ValueError(f"Column '{column}' not found.")

    if not pd.api.types.is_numeric_dtype(df[column]):
        raise ValueError(
            f"'{column}' is not numeric."
        )

    fig, ax = plt.subplots(figsize=(8,5))

    ax.hist(
        df[column].dropna(),
        bins=bins
    )

    ax.set_title(f"Histogram of {column}")
    ax.set_xlabel(column)
    ax.set_ylabel("Frequency")

    plot_path = save_plot(fig, "histogram")

    if "plots" not in state:
        state["plots"] = {}

    state["plots"]["histogram"] = {
        "column": column,
        "path": plot_path
    }

    return {
        "state": state,
        "plot": plot_path,
        "message": f"Histogram created for '{column}'."
    }