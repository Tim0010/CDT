"use client";

import { motion } from "framer-motion";
import { Check, Clock, Star } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
}

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskUncomplete: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskComplete, onTaskUncomplete }: TaskListProps) {
  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyStars = (difficulty: "easy" | "medium" | "hard") => {
    const starCount = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    return Array.from({ length: 3 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">My Tasks</h2>
      
      <div className="space-y-6">
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Pending Tasks ({pendingTasks.length})
            </h3>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onTaskComplete(task.id)}
                      className="mt-1 w-5 h-5 border-2 border-gray-300 rounded hover:border-green-500 transition-colors flex items-center justify-center group"
                    >
                      <Check className="h-3 w-3 text-transparent group-hover:text-green-500 transition-colors" />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {getDifficultyStars(task.difficulty)}
                          </div>
                          <span className="text-sm font-medium text-blue-600">
                            {task.points} pts
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(task.difficulty)}`}>
                          {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Completed Tasks ({completedTasks.length})
            </h3>
            <div className="space-y-3">
              {completedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-green-200 bg-green-50 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onTaskUncomplete(task.id)}
                      className="mt-1 w-5 h-5 bg-green-500 border-2 border-green-500 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800 line-through opacity-75">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {getDifficultyStars(task.difficulty)}
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            +{task.points} pts
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-3 line-through opacity-75">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border opacity-75 ${getDifficultyColor(task.difficulty)}`}>
                          {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                        </span>
                        <span className="text-xs text-green-600 font-medium">
                          ✓ Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {tasks.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No tasks assigned yet.</p>
            <p className="text-sm text-gray-400">Check back later for new challenges!</p>
          </div>
        )}
      </div>
    </div>
  );
}
