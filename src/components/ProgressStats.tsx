"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Zap, TrendingUp } from "lucide-react";

interface ProgressStatsProps {
  completedTasks: number;
  totalTasks: number;
  totalPoints: number;
  totalPossiblePoints: number;
}

export function ProgressStats({ 
  completedTasks, 
  totalTasks, 
  totalPoints, 
  totalPossiblePoints 
}: ProgressStatsProps) {
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const pointsPercentage = totalPossiblePoints > 0 ? (totalPoints / totalPossiblePoints) * 100 : 0;

  const getMotivationalMessage = () => {
    if (completionPercentage === 100) {
      return "🎉 Wow! You finished everything!";
    } else if (completionPercentage >= 75) {
      return "🌟 You're doing great! Just a little more to go";
    } else if (completionPercentage >= 50) {
      return "💪 Nice work! You're halfway done";
    } else if (completionPercentage >= 25) {
      return "🌱 Good job! Your tree is starting to grow";
    } else if (completionPercentage > 0) {
      return "🌿 Great start! You got your first leaf";
    } else {
      return "🌱 Time to start working on your tasks!";
    }
  };

  const stats = [
    {
      icon: <Target className="h-6 w-6" />,
      label: "Tasks Completed",
      value: `${completedTasks}/${totalTasks}`,
      percentage: completionPercentage,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      progressColor: "bg-blue-500"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      label: "Points Earned",
      value: `${totalPoints}/${totalPossiblePoints}`,
      percentage: pointsPercentage,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      progressColor: "bg-yellow-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      label: "Completion Rate",
      value: `${Math.round(completionPercentage)}%`,
      percentage: completionPercentage,
      color: "text-green-600",
      bgColor: "bg-green-100",
      progressColor: "bg-green-500"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">Progress Overview</h2>
      </div>

      {/* Motivational Message */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-700 font-medium">
          {getMotivationalMessage()}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="border border-gray-200 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${stat.progressColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${stat.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Badges */}
      {completedTasks > 0 && (
        <motion.div
          className="mt-6 pt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your Badges</h3>
          <div className="flex flex-wrap gap-2">
            {completedTasks >= 1 && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                🌱 First Task Done
              </span>
            )}
            {completedTasks >= 3 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                🌿 Getting Better
              </span>
            )}
            {completedTasks >= 5 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                🌳 Super Student
              </span>
            )}
            {totalPoints >= 50 && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                ⭐ Point Star
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
