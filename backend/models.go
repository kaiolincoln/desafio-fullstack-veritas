package main

import (
	"encoding/json"
	"os"
	"sync"
)

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
}

type TaskStore struct {
	tasks    map[string]*Task
	mu       sync.RWMutex
	filename string
}

func NewTaskStore(filename string) *TaskStore {
	ts := &TaskStore{
		tasks:    make(map[string]*Task),
		filename: filename,
	}
	ts.loadFromFile()
	return ts
}

func (ts *TaskStore) loadFromFile() error {
	ts.mu.Lock()
	defer ts.mu.Unlock()

	data, err := os.ReadFile(ts.filename)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}

	var tasks []*Task
	if err := json.Unmarshal(data, &tasks); err != nil {
		return err
	}

	for _, task := range tasks {
		ts.tasks[task.ID] = task
	}

	return nil
}

func (ts *TaskStore) saveToFile() error {
	tasks := make([]*Task, 0, len(ts.tasks))
	for _, task := range ts.tasks {
		tasks = append(tasks, task)
	}

	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(ts.filename, data, 0644)
}
