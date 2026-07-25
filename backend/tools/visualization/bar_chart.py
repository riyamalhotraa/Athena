import pandas as pd
import matplotlib.pyplot as plt

from tools.visualization.utils import save_plot


def plot_bar(
    state: dict,
    column: str
):
    """
    Generate a bar chart for a categorical column.
    """
    
    df = (
        state["cleaned_dataframe"]
        if state.get("cleaned_dataframe") is not None
        else state["dataframe"]
    )

    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    # ---------- Validation ----------

    if column not in df.columns:
        raise ValueError(f"Column '{column}' not found.")

    data = df[column].dropna()

    if data.empty:
        raise ValueError(f"No valid values found in '{column}'.")

    # ---------- Plot ----------

    counts = data.value_counts()

    fig, ax = plt.subplots(figsize=(9, 6))

    ax.bar(
        counts.index.astype(str),
        counts.values
    )

    ax.set_title(f"Bar Chart of {column}")
    ax.set_xlabel(column)
    ax.set_ylabel("Count")

    plt.xticks(rotation=45, ha="right")
    ax.grid(axis="y", linestyle="--", alpha=0.5)

    plt.tight_layout()

    plot_path = save_plot(fig, "bar_chart")
    plt.close(fig)

    # ---------- Update State ----------

    state.setdefault("plots", {})

    state["plots"]["bar_chart"] = {
        "column": column,
        "path": plot_path
    }

    # Latest plot to display in chat
    state["plot"] = plot_path

    state["chat_response"] = (
        f"Here's the bar chart for **{column}**."
    )

    state["chat_response"] = "Chart created successfully."
    return state