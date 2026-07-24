from state import AthenaState


def summarize_dataset(
    state: AthenaState,
) -> dict:
    """
    Returns the existing dataset summary for display in chat.
    """

    summary = state.get("summary")

    if not summary:
        return {
            "message": "No dataset summary is available."
        }

    return {
        "message": summary
    }