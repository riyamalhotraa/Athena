# from agents.tool_registry import TOOL_REGISTRY


# def execute(action, state):
#     """
#     Executes the selected tool.
#     """

#     tool_info = TOOL_REGISTRY.get(action.tool)

#     if tool_info is None:
#         return {
#             "response": (
#                 "I'm sorry, but that's outside my capabilities for now. "
#             )
#         }

#     tool = tool_info["function"]

#     try:
#         return tool(
#             state=state,
#             **action.parameters
#         )

#     except Exception:
#         return {
#             "response": (
#                 "I'm sorry, but I couldn't complete that request. "
#                 "It may not be supported yet or the provided parameters are invalid."
#             )
#         }

from agents.tool_registry import TOOL_REGISTRY


def execute(action, state):
    """
    Executes the selected tool.
    """

    tool_info = TOOL_REGISTRY.get(action.tool)

    if tool_info is None:
        state["chat_response"] = (
            "I'm sorry, but that's outside my capabilities for now."
        )
        return state

    tool = tool_info["function"]

    try:
        return tool(
            state=state,
            **action.parameters
        )

    except Exception as e:
        print("EXECUTOR ERROR:", e)

        state["chat_response"] = (
            "I'm sorry, but I couldn't complete that request. "
            "It may not be supported yet or the provided parameters are invalid."
        )

        return state