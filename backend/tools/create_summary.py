# from state import AthenaState


# def create_summary(
#     state: AthenaState,
# ) -> dict:
#     """
#     Returns the existing dataset summary for display in chat.
#     """

#     summary = state.get("summary")

#     if not summary:
#         return {
#             "message": "No dataset summary is available."
#         }

#     return {
#         "message": summary
#     }

from state import AthenaState


def create_summary(
    state: AthenaState,
) -> AthenaState:
    """
    Displays the existing dataset summary in chat.
    """

    summary = state.get("summary")

    if summary is None:
        state["chat_response"] = "No dataset summary is available."
        return state

    # If summary is already a string
    if isinstance(summary, str):
        state["chat_response"] = summary
        return state

    # If summary is a dictionary, format it nicely
    message = f"""
📊 Dataset Summary

• Rows: {summary.get('rows')}
• Columns: {summary.get('columns')}

• Missing Values:
{summary.get('missing_values')}

• Data Types:
{summary.get('data_types')}
"""

    state["chat_response"] = message.strip()

    return state