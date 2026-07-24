from pathlib import Path

import matplotlib.pyplot as plt
import seaborn as sns

from state import AthenaState


def generate_plots(state:AthenaState)->AthenaState:
    """
    Generate common EDA plots.

    Input:
        state["cleaned_dataframe"]

    Output:
        state["plots"]
    """

    if not state.get("success",False):
        return state

    try:
        df=state["cleaned_dataframe"]

        plots_dir=Path("plots")
        plots_dir.mkdir(exist_ok=True)

        plots = {
            "missing_values": None,
            "correlation_heatmap": None,
            "histograms": [],
            "boxplots": [],
            "countplots": [],
        }

        #Missing Values
        missing=df.isnull().sum()

        if missing.sum()>0:

            plt.figure(figsize=(10, 5))
            missing[missing>0].plot(kind="bar")

            plt.title("Missing Values")
            plt.tight_layout()
            path=plots_dir/"missing_values.png"
            plt.savefig(path)
            plt.close()

            plots["missing_values"]=str(path.resolve())

        # Correlation Heatmap
        numeric_df=df.select_dtypes(include="number")

        if numeric_df.shape[1] > 1:
            plt.figure(figsize=(10, 8))
            sns.heatmap(numeric_df.corr(),annot=True,cmap="coolwarm",fmt=".2f")
            plt.title("Correlation Heatmap")
            plt.tight_layout()
            path=plots_dir/"correlation_heatmap.png"
            plt.savefig(path)
            plt.close()

            plots["correlation_heatmap"] = str(path.resolve())

        # Histograms
        for column in numeric_df.columns:

            plt.figure(figsize=(6,4))
            sns.histplot(df[column], kde=True)
            plt.title(column)
            plt.tight_layout()
            path = plots_dir / f"{column}_histogram.png"
            plt.savefig(path)
            plt.close()

            plots["histograms"].append(str(path.resolve()))

        # Boxplots
        for column in numeric_df.columns:
            plt.figure(figsize=(6, 4))
            sns.boxplot(x=df[column])
            plt.title(column)
            plt.tight_layout()
            path = plots_dir / f"{column}_boxplot.png"
            plt.savefig(path)
            plt.close()

            plots["boxplots"].append(str(path.resolve()))

        # Count Plots
        categorical=df.select_dtypes(include=["object","category"])

        for column in categorical.columns:

            if df[column].nunique()>20:
                continue

            plt.figure(figsize=(8, 4))
            sns.countplot(data=df,x=column,order=df[column].value_counts().index,)
            plt.xticks(rotation=45)
            plt.tight_layout()

            path=plots_dir/f"{column}_countplot.png"

            plt.savefig(path)
            plt.close()
            plots["countplots"].append(str(path.resolve()))



        state["plots"]=plots

        print("="*60)
        print("📈 Visualizations Generated")
        print(f"Histograms      : {len(plots['histograms'])}")
        print(f"Boxplots        : {len(plots['boxplots'])}")
        print(f"Countplots      : {len(plots['countplots'])}")
        print("="*60)

        return state

    except Exception as e:

        state["success"]=False
        state["error"]=str(e)

        return state