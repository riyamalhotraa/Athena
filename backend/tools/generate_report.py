from datetime import datetime

from state import AthenaState


def generate_report(state:AthenaState)->AthenaState:
    """
    Generate the final Athena Data Science Report.
    """

    if not state.get("success",False):
        return state

    try:

        summary=state.get("summary",{})
        target=state.get("target",{})
        cleaning=state.get("cleaning",{})
        preprocessing=state.get("preprocessing",{})
        model_results=state.get("model_results",{})
        plots=state.get("plots",{})

        report = {

            "title":"ATHENA AI DATA SCIENCE REPORT",

            "generated_on":datetime.now().strftime("%d-%m-%Y %H:%M:%S"),

            "dataset":{

                "file_name":state.get("file_name"),

                "rows":summary.get("rows"),

                "columns":summary.get("columns"),

                "memory_usage_mb":summary.get("memory_usage_mb"),

                "duplicate_rows":summary.get("duplicate_rows"),

                "missing_values":summary.get("profile",{}).get("total_missing_values"),},

            "target_detection":target,

            "cleaning":cleaning,

            "preprocessing":preprocessing,

            "model_results":model_results,

            "plots":plots,
        }

        
        report_text = []

        report_text.append("=" * 60)
        report_text.append("ATHENA AI DATA SCIENCE REPORT")
        report_text.append("=" * 60)

        report_text.append("")
        report_text.append(
            f"Generated On : {report['generated_on']}"
        )

        report_text.append("")
        report_text.append("DATASET")
        report_text.append("-" * 60)

        report_text.append(
            f"File Name        : {report['dataset']['file_name']}"
        )

        report_text.append(
            f"Rows             : {report['dataset']['rows']}"
        )

        report_text.append(
            f"Columns          : {report['dataset']['columns']}"
        )

        report_text.append(
            f"Memory Usage     : {report['dataset']['memory_usage_mb']} MB"
        )

        report_text.append(
            f"Missing Values   : {report['dataset']['missing_values']}"
        )

        report_text.append(
            f"Duplicate Rows   : {report['dataset']['duplicate_rows']}"
        )

        # ----------------------------------------------------

        report_text.append("")
        report_text.append("TARGET DETECTION")
        report_text.append("-" * 60)

        report_text.append(
            f"Target Column : {target.get('target_column')}"
        )

        report_text.append(
            f"Problem Type  : {target.get('problem_type')}"
        )

        report_text.append(
            f"Confidence    : {target.get('confidence')}%"
        )

        report_text.append("")
        report_text.append("Reasoning:")

        report_text.append(
            target.get("reasoning", "Not available.")
        )

        # ----------------------------------------------------

        report_text.append("")
        report_text.append("CLEANING")
        report_text.append("-" * 60)

        if cleaning.get("steps"):

            for step in cleaning["steps"]:

                report_text.append(f"• {step}")

        else:

            report_text.append("No cleaning performed.")

        # ----------------------------------------------------

        report_text.append("")
        report_text.append("PREPROCESSING")
        report_text.append("-" * 60)

        if preprocessing.get("steps"):

            for step in preprocessing["steps"]:

                report_text.append(f"• {step}")

        else:

            report_text.append("No preprocessing performed.")

        # ----------------------------------------------------

        report_text.append("")
        report_text.append("MODEL RESULTS")
        report_text.append("-" * 60)

        if model_results.get("success"):

            report_text.append(
                f"Model : {model_results.get('model_name')}"
            )

            report_text.append(
                f"Problem Type : {model_results.get('problem_type')}"
            )

            if (
                model_results.get("problem_type")
                == "classification"
            ):

                report_text.append(
                    f"Accuracy : {model_results.get('accuracy')}"
                )

                report_text.append(
                    f"Precision : {model_results.get('precision')}"
                )

                report_text.append(
                    f"Recall : {model_results.get('recall')}"
                )

                report_text.append(
                    f"F1 Score : {model_results.get('f1_score')}"
                )

            elif (
                model_results.get("problem_type")
                == "regression"
            ):

                report_text.append(
                    f"MAE : {model_results.get('MAE')}"
                )

                report_text.append(
                    f"RMSE : {model_results.get('RMSE')}"
                )

                report_text.append(
                    f"R² Score : {model_results.get('R2 Score')}"
                )

            report_text.append("")
            report_text.append("Top Feature Importance")

            feature_importance = model_results.get(
                "feature_importance",
                {},
            )

            feature_importance = dict(
                sorted(
                    feature_importance.items(),
                    key=lambda x: x[1],
                    reverse=True,
                )
            )

            for feature, score in feature_importance.items():

                report_text.append(
                    f"{feature:<25} {score:.4f}"
                )

        else:

            report_text.append(
                model_results.get(
                    "error",
                    "No model trained."
                )
            )

        # ----------------------------------------------------

        report_text.append("")
        report_text.append("GENERATED VISUALIZATIONS")
        report_text.append("-" * 60)

        if plots:
            for category,files in plots.items():
                if not files:
                    continue

                report_text.append(f"\n{category.upper()}")
                if isinstance(files, list):
                    for file in files:
                        report_text.append(f"• {file}")

                else:
                    report_text.append(f"• {files}")

        else:
            report_text.append("No plots generated.")

        report_text.append("")
        report_text.append("="*60)

        state["report"]=report

        state["report_text"]="\n".join(report_text)

        print("="*60)
        print("📄 Report Generated")
        print("="*60)

        return state

    except Exception as e:

        state["success"]=False
        state["error"]=str(e)

        return state