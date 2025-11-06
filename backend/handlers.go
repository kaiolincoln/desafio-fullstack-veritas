package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
)

func (ts *TaskStore) GetTasks(w http.ResponseWriter, r *http.Request) {
	ts.mu.RLock()
	defer ts.mu.RUnlock()

	w.Header().Set("Content-Type", "application/json")

	tasks := make([]*Task, 0, len(ts.tasks))
	for _, task := range ts.tasks {
		tasks = append(tasks, task)
	}

	json.NewEncoder(w).Encode(tasks)
}

func (ts *TaskStore) CreateTask(w http.ResponseWriter, r *http.Request) {
	var task Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if task.Title == "" {
		http.Error(w, "Título é obrigatório", http.StatusBadRequest)
		return
	}

	validStatuses := map[string]bool{"todo": true, "in_progress": true, "done": true}
	if task.Status == "" {
		task.Status = "todo"
	} else if !validStatuses[task.Status] {
		http.Error(w, "Status inválido. Use: todo, in_progress ou done", http.StatusBadRequest)
		return
	}

	task.ID = uuid.New().String()

	ts.mu.Lock()
	ts.tasks[task.ID] = &task
	ts.mu.Unlock()

	if err := ts.saveToFile(); err != nil {
		log.Printf("Erro ao salvar no arquivo: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

func (ts *TaskStore) UpdateTask(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "ID é obrigatório", http.StatusBadRequest)
		return
	}

	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ts.mu.Lock()
	defer ts.mu.Unlock()

	if _, exists := ts.tasks[id]; !exists {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	if updatedTask.Title == "" {
		http.Error(w, "Título é obrigatório", http.StatusBadRequest)
		return
	}

	validStatuses := map[string]bool{"todo": true, "in_progress": true, "done": true}
	if !validStatuses[updatedTask.Status] {
		http.Error(w, "Status inválido. Use: todo, in_progress ou done", http.StatusBadRequest)
		return
	}

	updatedTask.ID = id
	ts.tasks[id] = &updatedTask

	if err := ts.saveToFile(); err != nil {
		log.Printf("Erro ao salvar no arquivo: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedTask)
}

func (ts *TaskStore) DeleteTask(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "ID é obrigatório", http.StatusBadRequest)
		return
	}

	ts.mu.Lock()
	defer ts.mu.Unlock()

	if _, exists := ts.tasks[id]; !exists {
		http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
		return
	}

	delete(ts.tasks, id)

	if err := ts.saveToFile(); err != nil {
		log.Printf("Erro ao salvar no arquivo: %v", err)
	}

	w.WriteHeader(http.StatusNoContent)
}
