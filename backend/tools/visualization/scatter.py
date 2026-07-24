import pandas as pd
import matplotlib.pyplot as plt

from tools.visualization.utils import save_plot


def plot_scatter(
    state: dict,
    x: str,
    y: str
):
    """
    Generate scatter plot between two numeric columns.
    """

    df = (
        state["cleaned_dataframe"]
        if state.get("cleaned_dataframe") is not None
        else state["dataframe"]
    )

    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    # ---------------- Validation ---------------- #

    if x not in df.columns:
        raise ValueError(f"Column '{x}' not found.")

    if y not in df.columns:
        raise ValueError(f"Column '{y}' not found.")

    if not pd.api.types.is_numeric_dtype(df[x]):
        raise ValueError(f"'{x}' is not numeric.")

    if not pd.api.types.is_numeric_dtype(df[y]):
        raise ValueError(f"'{y}' is not numeric.")

    plot_df = df[[x, y]].dropna()

    if plot_df.empty:
        raise ValueError("No valid data available to plot.")

    # ---------------- Plot ---------------- #

    fig, ax = plt.subplots(figsize=(8, 6))

    ax.scatter(
        plot_df[x],
        plot_df[y],
        alpha=0.7
    )

    ax.set_title(f"{y} vs {x}")
    ax.set_xlabel(x)
    ax.set_ylabel(y)

    ax.grid(True)

    plot_path = save_plot(fig, "scatter")

    # ---------------- Update State ---------------- #

    if "plots" not in state:
        state["plots"] = {}

    state["plots"]["scatter"] = {
        "x": x,
        "y": y,
        "path": plot_path
    }

    return {
        "state": state,
        "plot": plot_path,
        "message": f"Scatter plot created for '{x}' vs '{y}'."
    }