from tools.delete_column import delete_column
from tools.rename_column import rename_column
from tools.fill_missing import fill_missing
from tools.answer_from_state import answer_from_state
from tools.remove_duplicates import drop_duplicates
from tools.replace_values import replace_values
from tools.convert_dtype import convert_dtype
from tools.filter_rows import filter_rows
from tools.sort_rows import sort_rows
from tools.update_report import update_report
from tools.visualization.histogram import plot_histogram
from tools.visualization.scatter import plot_scatter
from tools.visualization.box_plot import plot_box
from tools.visualization.bar_chart import plot_bar
from tools.visualization.heatmap import plot_heatmap
from tools.create_summary import create_summary

TOOL_REGISTRY = {
    "delete_column": {
        "function": delete_column,
        "category": "dataset",
        "description": "Delete a dataset column.",
        "parameters": {
            "column_name": "Name of the column to delete."
        }
    },

    "rename_column": {
        "function": rename_column,
        "category": "dataset",
        "description": "Rename a dataset column.",
        "parameters": {
            "old_name": "Existing column name.",
            "new_name": "New column name."
        }
    },

    "fill_missing": {
        "function": fill_missing,
        "category": "dataset",
        "description": "Fill missing values in a column.",
        "parameters": {
            "column_name": "Column name",
            "method": "mean | median | mode | value",
            "value": "Custom value (only for method='value')"
        }
    },

    "drop_duplicates": {
        "function": drop_duplicates,
        "category": "dataset",
        "description": "Remove duplicate rows.",
        "parameters": {
            "subset": "Optional list of columns.",
            "keep": "first | last | False"
        }
    },

    "replace_values": {
        "function": replace_values,
        "category": "dataset",
        "description": "Replace values in a column.",
        "parameters": {
            "column_name": "Column name",
            "old_value": "Value to replace",
            "new_value": "Replacement value"
        }
    },

    "convert_dtype": {
        "function": convert_dtype,
        "category": "dataset",
        "description": "Convert a column to another datatype.",
        "parameters": {
            "column_name": "Column name",
            "dtype": "Target datatype"
        }
    },
    "filter_rows": {
        "function": filter_rows,
        "category": "dataset",
        "description": "Filter rows using a condition.",
        "parameters": {
            "column_name": "Column name",
            "operator": "==, !=, >, <, >=, <=",
            "value": "Comparison value"
        }
    },
    "sort_rows": {
        "function": sort_rows,
        "category": "dataset",
        "description": "Sort dataset rows.",
        "parameters": {
            "column_name": "Column name",
            "ascending": "True or False"
        }
    },

    "update_report": {
        "function": update_report,
        "category": "analysis",
        "description": "Refresh analysis and regenerate the report after dataset modifications.",
        "parameters": {
            "retrain_model": {
                "type": "boolean",
                "description": "Whether to retrain the machine learning model."
            }
        }
    },

    "plot_histogram": {
        "function": plot_histogram,
        "category": "visualization",
        "description": "Generate histogram for a numeric column.",
        "parameters": {
            "column": {
                "type": "string",
                "description": "Numeric column name"
            },
            "bins": {
                "type": "integer",
                "description": "Number of bins",
                "default": 20
            }
        }
    },

    "plot_scatter": {
        "function": plot_scatter,
        "category": "visualization",
        "description": "Generate scatter plot between two numeric columns.",
        "parameters": {
            "x": {
                "type": "string",
                "description": "X-axis numeric column"
            },
            "y": {
                "type": "string",
                "description": "Y-axis numeric column"
            }
        },
        "examples": [
            "Age vs Fare",
            "Scatter plot of Height and Weight",
            "Salary vs Experience",
            "Price vs Rating"
        ]
    },

    "plot_box": {
        "function": plot_box,
        "category": "visualization",
        "description": "Generate a box plot for a numeric column.",
        "parameters": {
            "column": {
                "type": "string",
                "description": "Numeric column name"
            }
        },
        "examples": [
            "Box plot of Age",
            "Show box plot of Salary",
            "Outliers in Fare",
            "Visualize Age spread"
        ]
    },

    "plot_bar": {
        "function": plot_bar,
        "category": "visualization",
        "description": "Generate a bar chart showing category counts.",
        "parameters": {
            "column": {
                "type": "string",
                "description": "Categorical column name"
            }
        },
        "examples": [
            "Bar chart of Gender",
            "Show Passenger Class counts",
            "Plot Department",
            "Count plot of Embarked",
            "Bar graph of Country"
        ]
    },

    "plot_heatmap": {
        "function": plot_heatmap,
        "category": "visualization",
        "description": "Generate a correlation heatmap for all numeric columns.",
        "parameters": {},
        "examples": [
            "Show correlation heatmap",
            "Generate correlation matrix",
            "Feature correlations",
            "Heatmap",
            "Relationship between variables"
        ]
    },

    "create_summary": {
        "description": "Display the current dataset summary in the chat.",
        "parameters": {},
        "function": create_summary,
    },

    "answer_from_state": {
        "description": "Answers questions using the current analysis state.",
        "parameters":{
            "question":str
        },
        "function": answer_from_state
    },

}