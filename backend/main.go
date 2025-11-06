package main

import (
	"log"
	"net/http"
)

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	store := NewTaskStore("tasks.json")

	http.HandleFunc("/tasks", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			store.GetTasks(w, r)
		case "POST":
			store.CreateTask(w, r)
		case "PUT":
			store.UpdateTask(w, r)
		case "DELETE":
			store.DeleteTask(w, r)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	}))

	log.Println("🚀 Servidor rodando em http://localhost:8080")
	log.Println("💾 Persistência em arquivo: tasks.json")
	log.Println("📝 Endpoints disponíveis:")
	log.Println("   GET    /tasks")
	log.Println("   POST   /tasks")
	log.Println("   PUT    /tasks?id={id}")
	log.Println("   DELETE /tasks?id={id}")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
