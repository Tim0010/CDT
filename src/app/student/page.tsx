"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TreeVisualization } from "@/components/TreeVisualization";
import { TaskList } from "@/components/TaskList";
import { ProgressStats } from "@/components/ProgressStats";
import { CelebrationModal } from "@/components/CelebrationModal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
}

export default function StudentDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Mathematics Practice",
      description: "Complete the algebra problems from Chapter 8 - focus on linear equations",
      points: 10,
      completed: false,
      difficulty: "medium"
    },
    {
      id: "2",
      title: "Hindi Literature Reading",
      description: "Read Premchand's story 'Idgah' and write a short reflection",
      points: 15,
      completed: false,
      difficulty: "easy"
    },
    {
      id: "3",
      title: "Science Fair Project",
      description: "Create a working model on solar energy for the upcoming science exhibition",
      points: 25,
      completed: false,
      difficulty: "hard"
    },
    {
      id: "4",
      title: "English Speaking Practice",
      description: "Prepare a 3-minute speech on 'My Dream for India' for tomorrow's class",
      points: 12,
      completed: false,
      difficulty: "medium"
    },
    {
      id: "5",
      title: "Art & Craft Project",
      description: "Create a rangoli design using geometric patterns for Diwali celebration",
      points: 18,
      completed: false,
      difficulty: "hard"
    },
    {
      id: "6",
      title: "Social Studies Assignment",
      description: "Research about freedom fighters from your state and create a timeline",
      points: 14,
      completed: false,
      difficulty: "medium"
    }
  ]);

  const [showCelebration, setShowCelebration] = useState(false);
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null);

  const completedTasks = tasks.filter(task => task.completed);
  const totalPoints = completedTasks.reduce((sum, task) => sum + task.points, 0);
  const totalPossiblePoints = tasks.reduce((sum, task) => sum + task.points, 0);

  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId && !task.completed) {
          setLastCompletedTask(task);
          setShowCelebration(true);
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  const handleTaskUncomplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: false } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center flex-1 mx-4">My Growth Tree</h1>
            <div className="w-16 sm:w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Tree Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Your Growth Tree</h2>
            <TreeVisualization 
              completedTasks={completedTasks.length}
              totalTasks={tasks.length}
              tasks={completedTasks}
            />
          </motion.div>

          {/* Tasks and Progress */}
          <div className="space-y-4 sm:space-y-6">
            {/* Progress Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProgressStats 
                completedTasks={completedTasks.length}
                totalTasks={tasks.length}
                totalPoints={totalPoints}
                totalPossiblePoints={totalPossiblePoints}
              />
            </motion.div>

            {/* Task List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TaskList 
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                onTaskUncomplete={handleTaskUncomplete}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        task={lastCompletedTask}
      />
    </div>
  );
}
