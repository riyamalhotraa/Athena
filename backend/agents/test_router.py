#python -m agents.test_router
from agents.intent_router import route

queries = [
    "Delete Cabin column",
    "Rename Sex to Gender",
    "Fill missing Age with median",
    "Sort by Fare descending",
]

for query in queries:
    print("=" * 50)
    print("Query:", query)

    action = route(query)

    print(action)