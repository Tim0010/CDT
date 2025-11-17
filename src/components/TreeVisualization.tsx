"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Leaf, TreePine, Sparkles } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
}

interface TreeVisualizationProps {
  completedTasks: number;
  totalTasks: number;
  tasks: Task[];
}

export function TreeVisualization({ completedTasks, totalTasks, tasks }: TreeVisualizationProps) {
  const [selectedLeaf, setSelectedLeaf] = useState<Task | null>(null);
  
  // Calculate tree growth stages
  const growthPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const treeHeight = Math.min(300 + (growthPercentage * 2), 500);
  
  // Generate leaf positions based on completed tasks
  const generateLeafPositions = () => {
    const positions = [];
    const basePositions = [
      { x: 50, y: 30, rotation: -15 },
      { x: 80, y: 25, rotation: 10 },
      { x: 20, y: 40, rotation: -25 },
      { x: 70, y: 45, rotation: 20 },
      { x: 40, y: 20, rotation: -10 },
      { x: 60, y: 35, rotation: 15 },
      { x: 30, y: 50, rotation: -20 },
      { x: 85, y: 40, rotation: 25 },
    ];
    
    for (let i = 0; i < completedTasks && i < basePositions.length; i++) {
      positions.push({
        ...basePositions[i],
        task: tasks[i],
        delay: i * 0.2
      });
    }
    
    return positions;
  };

  const leafPositions = generateLeafPositions();

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-green-400";
    }
  };

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-b from-sky-100 to-green-100 rounded-lg overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-70"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 5}%`
            }}
          />
        ))}
      </div>

      {/* Tree trunk */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        initial={{ height: 0 }}
        animate={{ height: treeHeight * 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-8 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg shadow-lg" 
             style={{ height: "100%" }} />
      </motion.div>

      {/* Tree canopy */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ 
          bottom: `${treeHeight * 0.3}px`,
          width: `${120 + growthPercentage}px`,
          height: `${120 + growthPercentage}px`
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="relative w-full h-full">
          {/* Base tree shape */}
          <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-600 rounded-full opacity-80" />
          
          {/* Leaves */}
          <AnimatePresence>
            {leafPositions.map((leaf, index) => (
              <motion.div
                key={`leaf-${index}`}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getDifficultyColor(leaf.task.difficulty)}`}
                style={{
                  left: `${leaf.x}%`,
                  top: `${leaf.y}%`,
                  rotate: `${leaf.rotation}deg`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: leaf.delay,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedLeaf(leaf.task)}
              >
                <Leaf className="h-6 w-6 drop-shadow-sm" />
                {/* Sparkle effect for newly added leaves */}
                {index === leafPositions.length - 1 && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 1, delay: leaf.delay + 0.5 }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tree icon when no tasks completed */}
      {completedTasks === 0 && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <TreePine className="h-32 w-32 text-gray-400" />
          <p className="text-center text-gray-500 mt-2">Finish your work to grow your tree!</p>
        </motion.div>
      )}

      {/* Progress indicator */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-sm">
        <div className="text-xs sm:text-sm font-medium text-gray-700">
          {completedTasks} / {totalTasks} tasks
        </div>
        <div className="w-16 sm:w-20 h-2 bg-gray-200 rounded-full mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${growthPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Leaf detail tooltip */}
      <AnimatePresence>
        {selectedLeaf && (
          <motion.div
            className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 max-w-xs z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={() => setSelectedLeaf(null)}
          >
            <h3 className="font-semibold text-gray-800 mb-1">{selectedLeaf.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedLeaf.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-1 rounded-full ${
                selectedLeaf.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                selectedLeaf.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedLeaf.difficulty}
              </span>
              <span className="font-medium text-blue-600">{selectedLeaf.points} pts</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
