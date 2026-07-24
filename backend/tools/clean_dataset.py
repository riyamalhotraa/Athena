import pandas as pd

from state import AthenaState


def clean_dataset(state:AthenaState)->AthenaState:
    """
    Clean the dataset by handling missing values,
    duplicates and formatting issues.

    Input:
        state["dataframe"]

    Output:
        state["cleaned_dataframe"]
        state["cleaning"]
    """

    if not state.get("success",False):
        return state

    try:
        df=state["dataframe"].copy()
        cleaning_steps=[]

        original_columns=list(df.columns)

        df.columns=(
            df.columns.astype(str)
            .str.strip()
            .str.replace(" ","_")
        )

        if original_columns!=list(df.columns):
            cleaning_steps.append(
                "Standardized column names."
            )

        duplicate_rows=int(df.duplicated().sum())

        if duplicate_rows>0:
            df = df.drop_duplicates()

            cleaning_steps.append(f"Removed {duplicate_rows} duplicate rows.")


        empty_columns=df.columns[
            df.isnull().all()
        ].tolist()

        if empty_columns:

            df=df.drop(columns=empty_columns)

            cleaning_steps.append(f"Removed empty columns: {', '.join(empty_columns)}")

        for column in df.columns:

            missing=int(df[column].isnull().sum())

            if missing==0:
                continue

            if pd.api.types.is_numeric_dtype(df[column]):
                median=df[column].median()
                df[column]=df[column].fillna(median)

                cleaning_steps.append(f"Filled {missing} missing values in '{column}' using median.")

            else:
                mode=df[column].mode()

                if not mode.empty:
                    df[column] = df[column].fillna(mode.iloc[0])

                    cleaning_steps.append(f"Filled {missing} missing values in '{column}' using mode.")


        state["cleaned_dataframe"] = df

        state["cleaning"] = {
            "steps": cleaning_steps,
            "rows_before_cleaning":len(state["dataframe"]),
            "rows_after_cleaning":len(df),
            "columns_after_cleaning":len(df.columns),
            "duplicates_removed":duplicate_rows,
            "removed_empty_columns":empty_columns,
        }

        print("="*60)
        print("🧹 Dataset Cleaning Completed")
        print(f"Rows After Cleaning    :{len(df)}")
        print(f"Columns                :{len(df.columns)}")
        print(f"Steps Performed        :{len(cleaning_steps)}")
        print("="*60)

        return state

    except Exception as e:

        state["success"]=False
        state["error"]=str(e)

        return state