import { useState, useCallback } from 'react';
import type { Task, IceValues, IceSuggestion, TaskStatus } from '../types/task';
import { calculateIceScore } from '../utils/ice';
import { sortTasksByPriority } from '../utils/taskSort';

const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

type UseTasksReturn = {
  tasks: Task[];
  selectedTaskId: string | null;
  addTask: (name: string, description: string) => void;
  updateIceValues: (taskId: string, values: IceValues) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus, errorMessage?: string) => void;
  selectTask: (taskId: string) => void;
  deselectTask: () => void;
  setSuggestion: (taskId: string, suggestion: IceSuggestion) => void;
  getSortedTasks: () => Task[];
};

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const addTask = useCallback((name: string, description: string) => {
    if (!name.trim() || !description.trim()) {
      return;
    }

    const newTask: Task = {
      id: generateId(),
      name: name.trim(),
      description: description.trim(),
      status: 'idle',
      createdAt: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateIceValues = useCallback((taskId: string, values: IceValues) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const iceScore = calculateIceScore(values.impact, values.confidence, values.ease);

        return {
          ...task,
          impact: values.impact,
          confidence: values.confidence,
          ease: values.ease,
          iceScore,
          status: 'ready',
        };
      }),
    );
  }, []);

  const updateTaskStatus = useCallback(
    (taskId: string, status: TaskStatus, errorMessage?: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            status,
            errorMessage,
          };
        }),
      );
    },
    [],
  );

  const selectTask = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, []);

  const deselectTask = useCallback(() => {
    setSelectedTaskId(null);
  }, []);

  const setSuggestion = useCallback((taskId: string, suggestion: IceSuggestion) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        return {
          ...task,
          suggestion,
        };
      }),
    );
  }, []);

  const getSortedTasks = useCallback((): Task[] => {
    return sortTasksByPriority(tasks);
  }, [tasks]);

  return {
    tasks,
    selectedTaskId,
    addTask,
    updateIceValues,
    updateTaskStatus,
    selectTask,
    deselectTask,
    setSuggestion,
    getSortedTasks,
  };
};
