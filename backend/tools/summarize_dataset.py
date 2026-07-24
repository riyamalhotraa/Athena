import pandas as pd

from state import AthenaState


def summarize_dataset(state: AthenaState) -> AthenaState:
    """
    Generate a comprehensive summary of the loaded dataset.

    Updates:
        state["summary"]
    """

    if not state.get("success", False):
        return state

    if state.get("cleaned_dataframe") is not None:
        df = state["cleaned_dataframe"]
    else:
        df = state["dataframe"]

    preview = (
        df.head(5)
        .astype(object)
        .where(pd.notnull(df.head(5)), None)
    )

    try:

        summary = {

            "shape": df.shape,

            "rows": len(df),

            "columns": len(df.columns),

            "column_names": list(df.columns),

            "data_types": {
                col: str(dtype)
                for col, dtype in df.dtypes.items()
            },

            "missing_values": df.isnull().sum().to_dict(),

            "duplicate_rows": int(df.duplicated().sum()),

            "numeric_columns": df.select_dtypes(
                include="number"
            ).columns.tolist(),

            "categorical_columns": df.select_dtypes(
                include=["object", "category"]
            ).columns.tolist(),

            "datetime_columns": df.select_dtypes(
                include=["datetime", "datetimetz"]
            ).columns.tolist(),

            "memory_usage_mb": round(
                df.memory_usage(deep=True).sum() / (1024 ** 2),
                2
            ),

            "unique_values": {
                col: int(df[col].nunique())
                for col in df.columns
            },

            "statistics": df.describe(include="all").fillna("").to_dict(),

            # Only first 5 rows for LLM reasoning
            "sample_rows": preview.to_dict(
                orient="records"
                ),

            "profile": {

                "total_missing_values": int(
                    df.isnull().sum().sum()
                ),

                "missing_percentage": round(
                    (
                        df.isnull().sum().sum()
                        / df.size
                    )
                    * 100,
                    2,
                ),

                "has_duplicates": bool(
                    df.duplicated().sum()
                ),

                "is_empty": df.empty,
            },
        }

        state["summary"] = summary

        print("=" * 60)
        print("📊 Dataset Summary Generated")
        print(f"Rows: {summary['rows']}")
        print(f"Columns: {summary['columns']}")
        print(f"Memory: {summary['memory_usage_mb']} MB")
        print("=" * 60)

        return state

    except Exception as e:

        state["success"] = False
        state["error"] = str(e)

        return state