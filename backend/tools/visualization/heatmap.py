import pandas as pd
import matplotlib.pyplot as plt

from tools.visualization.utils import save_plot


def plot_heatmap(state: dict):
    """
    Generate correlation heatmap for all numeric columns.
    """

    df = (
        state["cleaned_dataframe"]
        if state.get("cleaned_dataframe") is not None
        else state["dataframe"]
    )

    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    # ---------------- Numeric Columns ---------------- #

    numeric_df = df.select_dtypes(include=["number"])

    if numeric_df.shape[1] < 2:
        raise ValueError(
            "At least two numeric columns are required to generate a correlation heatmap."
        )

    corr = numeric_df.corr()

    # ---------------- Plot ---------------- #

    fig, ax = plt.subplots(figsize=(10, 8))

    image = ax.imshow(
        corr,
        cmap="coolwarm",
        interpolation="nearest",
        aspect="auto"
    )

    fig.colorbar(image)

    ax.set_xticks(range(len(corr.columns)))
    ax.set_xticklabels(corr.columns, rotation=45, ha="right")

    ax.set_yticks(range(len(corr.columns)))
    ax.set_yticklabels(corr.columns)

    ax.set_title("Correlation Heatmap")

    # Write correlation values inside cells

    for i in range(len(corr.columns)):
        for j in range(len(corr.columns)):
            ax.text(
                j,
                i,
                f"{corr.iloc[i, j]:.2f}",
                ha="center",
                va="center",
                fontsize=8
            )

    plot_path = save_plot(fig, "heatmap")

    # ---------------- Update State ---------------- #

    if "plots" not in state:
        state["plots"] = {}

    state["plots"]["heatmap"] = {
        "columns": list(corr.columns),
        "path": plot_path
    }

    return {
        "state": state,
        "plot": plot_path,
        "message": "Correlation heatmap generated successfully."
    }