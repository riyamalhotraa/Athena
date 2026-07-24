from sklearn.ensemble import (
    RandomForestClassifier,
    RandomForestRegressor,
)

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)

from sklearn.model_selection import train_test_split

from state import AthenaState


def train_model(state: AthenaState) -> AthenaState:
    """
    Train a machine learning model using the processed dataset and give the expected outcomes
    """

    if not state.get("success", False):
        return state

    try:
        if state.get("X") is None or state.get("y") is None:
            state["model_results"] = {
                "success":False,
                "error":"Dataset has not been preprocessed"
            }
            return state

        X = state["X"]
        y = state["y"]

        target_info = state.get("target", {})

        problem_type=target_info.get("problem_type","unknown")

        X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42,)

        # Classification
        if problem_type=="classification":
            model=RandomForestClassifier(
                n_estimators=200,
                random_state=42,
            )

            model.fit(X_train, y_train)
            predictions = model.predict(X_test)

            feature_importance = dict(
                zip(
                    X.columns,
                    model.feature_importances_,
                )
            )

            state["trained_model"] = model

            state["model_results"] = {

                "success": True,

                "problem_type": "classification",

                "model_name": "Random Forest Classifier",

                "accuracy": round(
                    accuracy_score(
                        y_test,
                        predictions,
                    ),
                    4,
                ),

                "precision": round(
                    precision_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                    4,
                ),

                "recall": round(
                    recall_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                    4,
                ),

                "f1_score": round(
                    f1_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                    4,
                ),

                "feature_importance": feature_importance,
            }

        # ==========================================
        # Regression
        # ==========================================

        elif problem_type == "regression":

            model = RandomForestRegressor(
                n_estimators=200,
                random_state=42,
            )

            model.fit(X_train, y_train)

            predictions = model.predict(X_test)

            feature_importance = dict(
                zip(
                    X.columns,
                    model.feature_importances_,
                )
            )

            state["trained_model"] = model

            mse = mean_squared_error(
                y_test,
                predictions,
            )

            state["model_results"] = {

                "success": True,

                "problem_type": "regression",

                "model_name": "Random Forest Regressor",

                "MAE": round(
                    mean_absolute_error(
                        y_test,
                        predictions,
                    ),
                    4,
                ),

                "RMSE": round(
                    mse ** 0.5,
                    4,
                ),

                "R2 Score": round(
                    r2_score(
                        y_test,
                        predictions,
                    ),
                    4,
                ),

                "feature_importance": feature_importance,
            }

        # ==========================================
        # Unknown
        # ==========================================

        else:

            state["model_results"] = {

                "success": False,

                "error": (
                    "Problem type could not be determined."
                ),
            }

        print("=" * 60)
        print("🤖 Model Training Completed")
        print(
            f"Model : {state['model_results'].get('model_name')}"
        )
        print(
            f"Problem Type : {problem_type}"
        )
        print("=" * 60)

        return state

    except Exception as e:

        state["success"] = False

        state["error"] = str(e)

        state["model_results"] = {

            "success": False,

            "error": str(e),

        }

        return state