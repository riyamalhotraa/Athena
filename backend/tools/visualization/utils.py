import os
import uuid
from pathlib import Path

import matplotlib
matplotlib.use("Agg")   # Prevent Tkinter errors

import matplotlib.pyplot as plt

PLOT_FOLDER = Path("plots")
PLOT_FOLDER.mkdir(exist_ok=True)


def save_plot(fig, plot_name: str):
    """
    Save matplotlib figure and return its path.
    """

    filename = f"{uuid.uuid4()}_{plot_name}.png"

    filepath = PLOT_FOLDER / filename

    fig.savefig(filepath, dpi=300, bbox_inches="tight")

    plt.close(fig)

    return str(filepath).replace("\\", "/")