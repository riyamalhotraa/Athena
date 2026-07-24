from pathlib import Path

import pandas as pd

from state import AthenaState


def load_dataset(state:AthenaState)->AthenaState:
    """
    Load a CSV or Excel dataset into the shared Athena state.

    Expected input in state:
        state["file_path"]

    Updates:
        success
        error
        file_name
        dataframe
        rows
        columns
    """

    if state.get("dataframe") is not None:
        print("Dataset already loaded. Skipping reload.")
        return state

    file_path=state["file_path"]
    path=Path(file_path)

    if not path.exists():
        state["success"] = False
        state["error"] = f"File not found: {file_path}"
        return state

    try:
        extension = path.suffix.lower()
        if extension==".csv":
            df=pd.read_csv(path)

        elif extension in [".xlsx",".xls"]:
            df=pd.read_excel(path)

        else:
            state["success"]=False
            state["error"]=(
                "Unsupported file format. "
                "Please upload a CSV or Excel file."
            )
            return state

        state["success"]=True
        state["error"]=None

        state["file_name"]=path.name
        state["dataframe"]=df
        state["rows"]=len(df)
        state["columns"]=len(df.columns)
        state["cleaned_dataframe"]=None
        state["processed_dataframe"]=None

        print("=" * 60)
        print("✅ Dataset Loaded Successfully")
        print(f"File     : {path.name}")
        print(f"Rows     : {len(df)}")
        print(f"Columns  : {len(df.columns)}")
        print("=" * 60)

        return state

    except Exception as e:

        state["success"]=False
        state["error"]=str(e)

        return state