# from agents.graph import athena_graph
# from state import AthenaState


# class AnalysisService:

#     def start_analysis(self, dataset_path: str) -> dict:

#         # Initial state for LangGraph
#         state: AthenaState = {
#             "success": True,
#             "error": None,

#             "file_path": dataset_path,
#             "file_name": "",

#             "dataframe": None,
#             "cleaned_dataframe": None,
#             "processed_dataframe": None,

#             "rows": 0,
#             "columns": 0,

#             "summary": {},
#             "target": {},

#             "cleaning": {},

#             "preprocessing": {},
#             "X": None,
#             "y": None,
#             "scaler": None,
#             "encoders": {},

#             "plots": {},

#             "trained_model": None,
#             "model_results": {},

#             "report": {},
#             "report_text": "",
#         }

#         result = athena_graph.invoke(state)
#         summary = result.get("summary", {})
#         preview = summary.get("sample_rows", [])

#         feature_info = [
#             {
#                 "name": column,
#                 "type": dtype,
#             }
#             for column, dtype in summary.get("data_types", {}).items()
#         ]
 
#         quality = {
#             "missing_values": summary.get("profile", {}).get(
#                 "total_missing_values", 0
#             ),
#             "duplicate_rows": summary.get(
#                 "duplicate_rows",
#                 0,
#             ),
#             "missing_percentage": summary.get(
#                 "profile",
#                 {},
#             ).get(
#                 "missing_percentage",
#                 0,
#             ),
#         }

#         plots = result.get("plots", {})


#         def convert_path(path):
#             if not path:
#                 return None

#             filename = path.replace("\\", "/").split("/")[-1]

#             return f"http://localhost:8000/plots/{filename}"


#         plots["missing_values"] = convert_path(
#             plots.get("missing_values")
#         )

#         plots["correlation_heatmap"] = convert_path(
#             plots.get("correlation_heatmap")
#         )

#         plots["histograms"] = [
#             convert_path(p)
#             for p in plots.get("histograms", [])
#         ]

#         plots["boxplots"] = [
#             convert_path(p)
#             for p in plots.get("boxplots", [])
#         ]

#         plots["countplots"] = [
#             convert_path(p)
#             for p in plots.get("countplots", [])
#         ]

#         # Response
#         return {
#             "success": result.get("success", True),

#             "analysis_id": dataset_path,

#             "summary": summary,
#             "preview": preview,
#             "feature_info": feature_info,
#             "quality": quality,

#             "target": result.get("target", {}),
#             "cleaning": result.get("cleaning", {}),
#             "preprocessing": result.get("preprocessing", {}),
#             "model_results": result.get("model_results", {}),

#             "report": result.get("report_text", ""),
#             "plots": plots,

#             "error": result.get("error"),
#         }


# analysis_service = AnalysisService()


from agents.graph import athena_graph
from state import AthenaState


class AnalysisService:

    def __init__(self):
        # Stores AthenaState for each analyzed dataset
        self.states = {}

    def start_analysis(self, dataset_path: str) -> dict:

        # Initial state for LangGraph
        state: AthenaState = {
            "success": True,
            "error": None,

            "file_path": dataset_path,
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

        result = athena_graph.invoke(state)

        # Store the complete AthenaState for future chat interactions
        
        print("\n=== SAVING STATE ===")
        print("Key:", dataset_path)

        self.states[dataset_path] = result

        print("All Keys:", list(self.states.keys()))
        print("====================\n")

        summary = result.get("summary", {})
        preview = summary.get("sample_rows", [])

        feature_info = [
            {
                "name": column,
                "type": dtype,
            }
            for column, dtype in summary.get("data_types", {}).items()
        ]

        quality = {
            "missing_values": summary.get("profile", {}).get(
                "total_missing_values", 0
            ),
            "duplicate_rows": summary.get(
                "duplicate_rows",
                0,
            ),
            "missing_percentage": summary.get(
                "profile",
                {},
            ).get(
                "missing_percentage",
                0,
            ),
        }

        plots = result.get("plots", {})

        def convert_path(path):
            if not path:
                return None

            filename = path.replace("\\", "/").split("/")[-1]

            return f"https://athena-backend-pclz.onrender.com/plots/{filename}"

        plots["missing_values"] = convert_path(
            plots.get("missing_values")
        )

        plots["correlation_heatmap"] = convert_path(
            plots.get("correlation_heatmap")
        )

        plots["histograms"] = [
            convert_path(p)
            for p in plots.get("histograms", [])
        ]

        plots["boxplots"] = [
            convert_path(p)
            for p in plots.get("boxplots", [])
        ]

        plots["countplots"] = [
            convert_path(p)
            for p in plots.get("countplots", [])
        ]

        # Response
        return {
            "success": result.get("success", True),

            "analysis_id": dataset_path,

            "summary": summary,
            "preview": preview,
            "feature_info": feature_info,
            "quality": quality,

            "target": result.get("target", {}),
            "cleaning": result.get("cleaning", {}),
            "preprocessing": result.get("preprocessing", {}),
            "model_results": result.get("model_results", {}),

            "report": result.get("report", ""),
            "report_text": result.get("report_text", ""),
            "plots": plots,

            "error": result.get("error"),
        }

    def get_state(self, dataset_id: str) -> AthenaState:
        if dataset_id not in self.states:
            raise ValueError(f"No analysis state found for '{dataset_id}'")

        return self.states[dataset_id]

    def save_state(self, dataset_id: str, state: AthenaState):
        self.states[dataset_id] = state

    def get_dashboard_stats(self):
        """
        Returns statistics for the dashboard.
        """

        total_datasets = len(self.states)
        analyses_completed = len(self.states)

        reports_generated = 0
        visualizations_created = 0

        for state in self.states.values():

            # Count reports
            if state.get("report"):
                reports_generated += 1

            # Count plots
            plots = state.get("plots", {})
            visualizations_created += len(plots)

        return {
            "total_datasets": total_datasets,
            "analyses_completed": analyses_completed,
            "reports_generated": reports_generated,
            "visualizations_created": visualizations_created,
        }


analysis_service = AnalysisService()