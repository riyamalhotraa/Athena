from agents.chat_agent import chat_agent
from agents.graph import athena_graph

state = {
    "file_path": r"C:\Users\Riya Malhotra\Desktop\athena-app\backend\uploads\titanic.csv"
}

state = athena_graph.invoke(state)

while True:

    query = input("\nYou: ")

    if query.lower() == "exit":
        break

    response = chat_agent(query, state)

    state = response["state"]

    print("Athena:", response["message"])