import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

from state import AthenaState


def preprocessing(state:AthenaState)->AthenaState:
    """
    Preprocess the cleaned dataset.

    Input:
        state["cleaned_dataframe"]

    Output:
        state["processed_dataframe"]
        state["X"]
        state["y"]
        state["encoders"]
        state["scaler"]
        state["preprocessing"]
    """

    if not state.get("success",False):
        return state
    try:

        df = state["cleaned_dataframe"].copy()
        preprocessing_steps=[]
        encoders={}

        scaler=StandardScaler()

        constant_columns=[
            column for column in df.columns
            if df[column].nunique(dropna=False)<=1
        ]

        if constant_columns:
            df.drop(columns=constant_columns,inplace=True)
            preprocessing_steps.append(f"Removed constant columns:{constant_columns}")

        target=None
        if state.get("target"):
            target=state["target"].get("target_column")

        if target and target in df.columns:
            y=df[target]
            X=df.drop(columns=[target])

        else:
            X=df.copy()
            y=None

        #Label Encoding
        categorical_columns = X.select_dtypes(include=["object", "category"]).columns

        for column in categorical_columns:
            encoder=LabelEncoder()
            X[column]=encoder.fit_transform(X[column].astype(str))

            encoders[column]=encoder

            preprocessing_steps.append(f"Label encoded '{column}'.")

        # Feature Scaling
        numeric_columns=X.select_dtypes(include="number").columns

        if len(numeric_columns)>0:
            X[numeric_columns]=scaler.fit_transform(X[numeric_columns])

            preprocessing_steps.append("Scaled numerical features.")

        # Create processed dataframe
        if y is not None:
            processed_df=pd.concat([X,y.reset_index(drop=True)],axis=1)

        else:
            processed_df = X.copy()

        state["processed_dataframe"]=processed_df

        state["X"]=X

        state["y"]=y

        state["encoders"]=encoders

        state["scaler"]=scaler

        state["preprocessing"] = {

            "steps": preprocessing_steps,

            "categorical_columns": list(categorical_columns),

            "numeric_columns": list(numeric_columns),

            "encoded_columns": list(encoders.keys()),

            "scaled_columns": list(numeric_columns),

            "target_column": target,

            "features": list(X.columns),

            "num_features": X.shape[1]

        }

        print("=" * 60)
        print("⚙️ Preprocessing Completed")
        print(f"Features          : {X.shape[1]}")
        print(f"Samples           : {X.shape[0]}")
        print(f"Encoded Columns   : {len(encoders)}")
        print("=" * 60)

        return state

    except Exception as e:

        state["success"] = False

        state["error"] = str(e)

        return state