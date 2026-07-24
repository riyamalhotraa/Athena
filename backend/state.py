from typing import TypedDict
import pandas as pd


class AthenaState(TypedDict):

    #general
    success:bool
    error:str|None

    #dataset
    file_path:str
    file_name:str

    dataframe:pd.DataFrame
    cleaned_dataframe: pd.DataFrame|None
    processed_dataframe:pd.DataFrame|None

    rows:int
    columns:int

    #eda
    summary:dict
    target:dict

    #cleaning
    cleaning:dict

    #preprocessing
    preprocessing:dict
    X:pd.DataFrame|None
    y:pd.Series|None
    scaler:object|None
    encoders:dict

    #visualization
    plots:dict

    #model
    trained_model:object|None
    model_results:dict

    # chat
    question: str
    chat_response: str

    #final report
    report:dict
    report_text:str