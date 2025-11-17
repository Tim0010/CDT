"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trophy, Leaf } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  difficulty: "easy" | "medium" | "hard";
}

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function CelebrationModal({ isOpen, onClose, task }: CelebrationModalProps) {
  if (!task) return null;

  const celebrationMessages = [
    "🎉 Great job!",
    "🌟 Well done!",
    "💪 Nice work!",
    "🚀 Awesome!",
    "✨ You did it!"
  ];

  const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header with confetti effect */}
              <div className="relative bg-gradient-to-r from-green-400 to-blue-500 p-4 sm:p-6 text-white overflow-hidden">
                {/* Floating confetti */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    initial={{ 
                      x: Math.random() * 300,
                      y: -10,
                      rotate: 0,
                      opacity: 1
                    }}
                    animate={{
                      y: 200,
                      rotate: 360,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      delay: Math.random() * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="text-center">
                  <motion.div
                    className="inline-block mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.6,
                      repeat: 2,
                      delay: 0.2
                    }}
                  >
                    <Trophy className="h-16 w-16 text-yellow-300" />
                  </motion.div>
                  
                  <motion.h2
                    className="text-2xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Task Completed!
                  </motion.h2>
                  
                  <motion.p
                    className="text-lg text-white/90"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {randomMessage}
                  </motion.p>
                </div>
              </div>

              {/* Task details */}
              <div className="p-6">
                <motion.div
                  className="text-center mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {task.description}
                  </p>

                  {/* Points earned */}
                  <motion.div
                    className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                    +{task.points} Points Earned!
                  </motion.div>
                </motion.div>

                {/* Tree growth animation */}
                <motion.div
                  className="bg-gradient-to-b from-sky-100 to-green-100 rounded-lg p-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="inline-block mb-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 1,
                        delay: 0.8,
                        repeat: 1
                      }}
                    >
                      <Leaf className="h-12 w-12 text-green-500" />
                    </motion.div>
                    <p className="text-sm text-gray-600">
                      A new leaf has been added to your growth tree!
                    </p>
                  </div>
                </motion.div>

                {/* Action button */}
                <motion.button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Keep Going! 🌱
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
