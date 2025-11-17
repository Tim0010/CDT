"use client";

import { motion } from "framer-motion";
import { User, TreePine, Trophy, Clock, TrendingUp } from "lucide-react";

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

interface StudentOverviewProps {
  students: Student[];
  challenges: Challenge[];
}

export function StudentOverview({ students, challenges }: StudentOverviewProps) {
  const getProgressPercentage = (student: Student) => {
    return student.totalTasks > 0 ? (student.completedTasks / student.totalTasks) * 100 : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-blue-600 bg-blue-100";
    if (percentage >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getLastActiveText = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Active now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const sortedStudents = [...students].sort((a, b) => {
    const aProgress = getProgressPercentage(a);
    const bProgress = getProgressPercentage(b);
    return bProgress - aProgress;
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Total Students</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{students.length}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TreePine className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Active Challenges</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{challenges.length}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Avg. Completion</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">
            {students.length > 0 
              ? Math.round(students.reduce((sum, s) => sum + getProgressPercentage(s), 0) / students.length)
              : 0}%
          </p>
        </motion.div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Student Progress</h2>
        
        {students.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No students enrolled yet.</p>
            <p className="text-sm text-gray-400">Students will appear here once they join your class.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedStudents.map((student, index) => {
              const progressPercentage = getProgressPercentage(student);
              const progressColorClass = getProgressColor(progressPercentage);
              
              return (
                <motion.div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{student.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {getLastActiveText(student.lastActive)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Progress</div>
                        <div className="font-medium text-gray-800">
                          {student.completedTasks}/{student.totalTasks} tasks
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Points</div>
                        <div className="font-medium text-blue-600">{student.totalPoints}</div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${progressColorClass}`}>
                        {Math.round(progressPercentage)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  
                  {/* Tree Growth Indicator */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <TreePine className="h-4 w-4 text-green-500" />
                    <span>
                      Tree has {student.completedTasks} {student.completedTasks === 1 ? 'leaf' : 'leaves'}
                    </span>
                    {progressPercentage >= 80 && (
                      <span className="text-green-600 font-medium">🌳 Flourishing!</span>
                    )}
                    {progressPercentage >= 50 && progressPercentage < 80 && (
                      <span className="text-blue-600 font-medium">🌿 Growing well</span>
                    )}
                    {progressPercentage > 0 && progressPercentage < 50 && (
                      <span className="text-yellow-600 font-medium">🌱 Just started</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
