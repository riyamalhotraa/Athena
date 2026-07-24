#python -m agents.dataset_agent

from langgraph.graph import StateGraph, END

from state import AthenaState

from tools.load_dataset import load_dataset
from tools.summarize_dataset import summarize_dataset
from tools.detect_target import detect_target
from tools.clean_dataset import clean_dataset
from tools.preprocessing import preprocessing
from tools.generate_plots import generate_plots
from tools.train_model import train_model
from tools.generate_report import generate_report

builder = StateGraph(AthenaState)

builder.add_node("load_dataset", load_dataset)
builder.add_node("summarize_dataset", summarize_dataset)
builder.add_node("detect_target", detect_target)
builder.add_node("clean_dataset", clean_dataset)
builder.add_node("generate_plots", generate_plots)
builder.add_node("preprocessing", preprocessing)
builder.add_node("train_model", train_model)
builder.add_node("generate_report", generate_report)
builder.set_entry_point("load_dataset")
builder.add_edge("load_dataset", "summarize_dataset")
builder.add_edge("summarize_dataset", "detect_target")
builder.add_edge("detect_target", "clean_dataset")
builder.add_edge("clean_dataset", "generate_plots")
builder.add_edge("generate_plots", "preprocessing")
builder.add_edge("preprocessing", "train_model")
builder.add_edge("train_model", "generate_report")
builder.add_edge("generate_report", END)

athena_graph = builder.compile()
athena_graph

if __name__ == "__main__":

    initial_state = {
        "success": True,
        "error": None,

        "file_path": r"C:\Users\Riya Malhotra\Downloads\titanic.csv",

        "file_name": "",

        "dataframe": None,
        "cleaned_dataframe": None,
        "processed_dataframe": None,

        "rows": 0,
        "columns": 0,

        "summary": {},
        "target": {},
        "cleaning": {},
        "preprocessing": {},

        "X": None,
        "y": None,

        "scaler": None,
        "encoders": {},

        "plots": {},

        "trained_model": None,
        "model_results": {},

        "report": {},
        "report_text": "",
    }

    result = athena_graph.invoke(initial_state)

    print(result["report_text"])