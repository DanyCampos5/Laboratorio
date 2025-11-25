import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, accuracy_score
import numpy as np

# --- Carregar o DataFrame ---
df = pd.read_csv("labimun_dataset_800.csv")  

# (opcional) verifique as colunas
print(df.head())
print(df.columns)

# --- Pré-processamento ---
# df já está com as colunas categóricas codificadas e as irrelevantes removidas
X = df.drop(columns=["esterilizado"])
y = df["esterilizado"].astype(int)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, shuffle=True
)

# Padronização
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Contagem de Classes para Balanceamento
neg_count = np.sum(y_train == 0)
pos_count = np.sum(y_train == 1)
scale_pos_weight = neg_count / pos_count

# Configurar o modelo base XGBoost
xgb_base = XGBClassifier(
    objective='binary:logistic',
    eval_metric='logloss',
    use_label_encoder=False,
    random_state=42,
    n_jobs=1,
    scale_pos_weight=scale_pos_weight
)

param_dist = {
    'n_estimators': [200, 500, 800],
    'max_depth': [3, 6, 9],
    'learning_rate': [0.01, 0.05, 0.1],
    'min_child_weight': [1, 3, 5],
    'gamma': [0, 0.1, 0.5]
}

random_search = RandomizedSearchCV(
    estimator=xgb_base,
    param_distributions=param_dist,
    n_iter=15,
    scoring='accuracy',
    cv=5,
    verbose=0,
    random_state=42,
    n_jobs=1
)

print("--- Iniciando Otimização do XGBoost (RandomizedSearchCV - Serial) ---")
random_search.fit(X_train_scaled, y_train)

# Avaliação
best_xgb_model = random_search.best_estimator_
y_pred_xgb = best_xgb_model.predict(X_test_scaled)

train_acc_xgb = best_xgb_model.score(X_train_scaled, y_train)
test_acc_xgb = best_xgb_model.score(X_test_scaled, y_test)

print("\n--- Resultados do Melhor Modelo XGBoost (Otimizado) ---")
print(f"Melhores Parâmetros: {random_search.best_params_}")
print(f"Acurácia Treino: {train_acc_xgb:.3f} | Acurácia Teste: {test_acc_xgb:.3f}")
print("\n🔹 Relatório de Classificação:")
print(classification_report(y_test, y_pred_xgb))

# --- Gerar gráfico de pizza ---
import matplotlib.pyplot as plt
import os
import numpy as np
# Converter valores contínuos para categorias binárias
# (Se o valor for >= 0.5, considera "Esterilizado")
df["esterilizado_binario"] = (df["esterilizado"] >= 0.5).astype(int)

# Contar as classes que realmente existem
unique, counts = np.unique(df["esterilizado_binario"], return_counts=True)

# Mapear as classes (0 e 1) para nomes legíveis
classes = {0: "Não Esterilizado", 1: "Esterilizado"}
labels = [classes[u] for u in unique]

colors = ["#ff7f50", "#1e90ff"][:len(unique)]

# Criar diretório de saída
output_dir = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(output_dir, exist_ok=True)

# Criar o gráfico
plt.figure(figsize=(5,5))
plt.pie(
    counts,
    labels=labels,
    autopct="%1.1f%%",
    colors=colors,
    startangle=90,
    textprops={"fontsize": 12},
    explode=[0.05]*len(unique)
)
plt.title("Proporção de Animais Esterilizados")
plt.tight_layout()

# Salvar a imagem
output_path = os.path.join(output_dir, "grafico_pizza.png")
plt.savefig(output_path)
plt.close()

print(f"✅ Gráfico de pizza salvo em: {output_path}")

# --- Salvar estatísticas em JSON ---
import json

stats = {
    "total_registros": int(len(df)),
    "total_esterilizados": int(counts[1] if len(counts) > 1 else 0),
    "total_nao_esterilizados": int(counts[0] if len(counts) > 0 else 0),
    "acuracia_modelo": float(test_acc_xgb),
    "melhores_parametros": random_search.best_params_
}

stats_path = os.path.join(output_dir, "estatisticas.json")
with open(stats_path, "w") as f:
    json.dump(stats, f, indent=4)

print(f"✅ Estatísticas salvas em: {stats_path}")