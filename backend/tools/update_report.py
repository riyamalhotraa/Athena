from state import AthenaState

from tools.summarize_dataset import summarize_dataset
from tools.detect_target import detect_target
from tools.generate_plots import generate_plots
from tools.preprocessing import preprocessing
from tools.train_model import train_model
from tools.generate_report import generate_report


def update_report(
    state: AthenaState,
    retrain_model: bool = False,
) -> AthenaState:
    """
    Refresh Athena's analysis after the dataset
    has been modified.

    Parameters
    ----------
    retrain_model : bool
        If True, reruns preprocessing and model training.
        Otherwise only refreshes EDA and report.
    """

    if not state.get("success", False):
        return state

    if state.get("cleaned_dataframe") is not None:
        state["dataframe"] = state["cleaned_dataframe"]

    print("========== UPDATE REPORT ==========")
    print("Columns before:",state["columns"])

    state=summarize_dataset(state)

    print("Columns after summarize:",state["columns"])

    state = generate_plots(state)

    print("plots regenerated")

    state = generate_report(state)


    if retrain_model:

        state = preprocessing(state)

        state = train_model(state)

    print("retrained")
    state = generate_report(state)

    
    print("========== DONE ==========")

    return state