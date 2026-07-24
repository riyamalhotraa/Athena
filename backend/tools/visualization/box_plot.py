import pandas as pd
import matplotlib.pyplot as plt

from tools.visualization.utils import save_plot


def plot_box(
    state: dict,
    column: str
):
    """
    Generate a box plot for a numeric column.
    """

    df = (
        state["cleaned_dataframe"]
        if state.get("cleaned_dataframe") is not None
        else state["dataframe"]
    )

    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    # ---------------- Validation ---------------- #

    if column not in df.columns:
        raise ValueError(f"Column '{column}' not found.")

    if not pd.api.types.is_numeric_dtype(df[column]):
        raise ValueError(f"'{column}' is not numeric.")

    data = df[column].dropna()

    if data.empty:
        raise ValueError(f"No valid values found in '{column}'.")

    # ---------------- Plot ---------------- #

    fig, ax = plt.subplots(figsize=(7, 6))

    ax.boxplot(
        data,
        vert=True,
        patch_artist=True,
        labels=[column]
    )

    ax.set_title(f"Box Plot of {column}")
    ax.set_ylabel(column)

    ax.grid(axis="y", linestyle="--", alpha=0.5)

    plot_path = save_plot(fig, "box_plot")

    # ---------------- Update State ---------------- #

    if "plots" not in state:
        state["plots"] = {}

    state["plots"]["box_plot"] = {
        "column": column,
        "path": plot_path
    }

    return {
        "state": state,
        "plot": plot_path,
        "message": f"Box plot created for '{column}'."
    }