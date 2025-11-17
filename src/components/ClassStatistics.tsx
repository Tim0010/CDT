"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Award, Users, TreePine } from "lucide-react";

interface Student {
  id: string;
  name: string;
  completedTasks: number;
  totalTasks: number;
  totalPoints: number;
  lastActive: Date;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  assignedTo: string[];
  createdAt: Date;
  dueDate?: Date;
}

interface ClassStatisticsProps {
  students: Student[];
  challenges: Challenge[];
}

export function ClassStatistics({ students, challenges }: ClassStatisticsProps) {
  // Calculate statistics
  const totalStudents = students.length;
  const totalTasks = students.reduce((sum, student) => sum + student.totalTasks, 0);
  const totalCompletedTasks = students.reduce((sum, student) => sum + student.completedTasks, 0);
  const totalPoints = students.reduce((sum, student) => sum + student.totalPoints, 0);
  const avgCompletionRate = totalStudents > 0 ? (totalCompletedTasks / totalTasks) * 100 : 0;
  const avgPointsPerStudent = totalStudents > 0 ? totalPoints / totalStudents : 0;

  // Difficulty distribution
  const difficultyStats = challenges.reduce((acc, challenge) => {
    acc[challenge.difficulty] = (acc[challenge.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top performers
  const topPerformers = [...students]
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);

  // Engagement levels
  const getEngagementLevel = (student: Student) => {
    const completionRate = student.totalTasks > 0 ? (student.completedTasks / student.totalTasks) * 100 : 0;
    if (completionRate >= 80) return "high";
    if (completionRate >= 50) return "medium";
    return "low";
  };

  const engagementStats = students.reduce((acc, student) => {
    const level = getEngagementLevel(student);
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statsCards = [
    {
      title: "Class Completion Rate",
      value: `${Math.round(avgCompletionRate)}%`,
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Average task completion across all students"
    },
    {
      title: "Total Points Earned",
      value: totalPoints.toString(),
      icon: <Award className="h-6 w-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Combined points from all students"
    },
    {
      title: "Active Students",
      value: totalStudents.toString(),
      icon: <Users className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Students currently enrolled in your class"
    },
    {
      title: "Avg Points/Student",
      value: Math.round(avgPointsPerStudent).toString(),
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Average points earned per student"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="font-medium text-gray-700">{stat.title}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Challenge Difficulty Distribution */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Challenge Difficulty Distribution
          </h3>
          
          <div className="space-y-4">
            {Object.entries(difficultyStats).map(([difficulty, count]) => {
              const percentage = challenges.length > 0 ? (count / challenges.length) * 100 : 0;
              const colorClass = 
                difficulty === 'easy' ? 'bg-green-500' :
                difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
              
              return (
                <div key={difficulty} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-medium text-gray-700">{difficulty}</span>
                    <span className="text-sm text-gray-500">{count} challenges</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${colorClass}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {challenges.length === 0 && (
            <p className="text-gray-500 text-center py-4">No challenges created yet</p>
          )}
        </motion.div>

        {/* Student Engagement Levels */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Student Engagement Levels
          </h3>
          
          <div className="space-y-4">
            {[
              { level: 'high', label: 'High Engagement (80%+)', color: 'bg-green-500', count: engagementStats.high || 0 },
              { level: 'medium', label: 'Medium Engagement (50-79%)', color: 'bg-yellow-500', count: engagementStats.medium || 0 },
              { level: 'low', label: 'Low Engagement (<50%)', color: 'bg-red-500', count: engagementStats.low || 0 }
            ].map((item) => {
              const percentage = totalStudents > 0 ? (item.count / totalStudents) * 100 : 0;
              
              return (
                <div key={item.level} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm text-gray-500">{item.count} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          {totalStudents === 0 && (
            <p className="text-gray-500 text-center py-4">No students enrolled yet</p>
          )}
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Top Performers
        </h3>
        
        {topPerformers.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {topPerformers.map((student, index) => {
              const medals = ['🥇', '🥈', '🥉'];
              const completionRate = student.totalTasks > 0 ? (student.completedTasks / student.totalTasks) * 100 : 0;
              
              return (
                <div key={student.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{medals[index]}</span>
                    <div>
                      <h4 className="font-medium text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">Rank #{index + 1}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium text-yellow-600">{student.totalPoints}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-medium text-green-600">{Math.round(completionRate)}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <TreePine className="h-4 w-4 text-green-500" />
                      <span>{student.completedTasks} leaves grown</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No student data available yet</p>
        )}
      </motion.div>
    </div>
  );
}
