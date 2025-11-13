from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import matplotlib.pyplot as plt
import numpy as np

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # seu front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diretório de saída do gráfico
output_dir = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "grafico_pizza.png")

# --- Gerar o gráfico antes de montar /static ---
if not os.path.exists(output_path):
    counts = [30, 70]  # substitua pelos dados reais
    labels = ["Não Esterilizado", "Esterilizado"]
    colors = ["#ff7f50", "#1e90ff"]
    plt.figure(figsize=(5,5))
    plt.pie(counts, labels=labels, autopct="%1.1f%%", colors=colors, startangle=90)
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

# Monta a pasta /static agora que o arquivo existe
app.mount("/static", StaticFiles(directory=output_dir), name="static")

# Endpoint raiz
@app.get("/")
def read_root():
    return {"message": "API do gráfico está rodando!"}

# Endpoint direto para o gráfico
@app.get("/grafico")
def get_grafico():
    if os.path.exists(output_path):
        return FileResponse(output_path)
    return {"error": "Gráfico não encontrado"}
