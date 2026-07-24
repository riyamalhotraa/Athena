from state import AthenaState

from tools.summarize_dataset import summarize_dataset


def refresh_state(state: AthenaState) -> AthenaState:
    """
    Refresh lightweight metadata after the dataset
    has been modified.
    """

    state = summarize_dataset(state)

    return state