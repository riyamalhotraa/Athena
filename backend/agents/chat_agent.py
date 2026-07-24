# from agents.intent_router import route
# from agents.executor import execute


# def chat_agent(user_message, state):

#     action = route(user_message)

#     print("\n====================")
#     print("Selected Action")
#     print(action)
#     print("====================\n")

#     state = execute(action, state)

#     return {
#         "state": state,
#         "message": f"Successfully executed '{action.tool}'."
#     }


from agents.intent_router import route
from agents.executor import execute


def chat_agent(user_message, state):

    action = route(user_message)

    print("\n====================")
    print("Selected Action")
    print(action)
    print("====================\n")

    result = execute(action, state)

    return result