"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlantChallengeForm } from "@/components/PlantChallengeForm";
import { StudentOverview } from "@/components/StudentOverview";
import { ClassStatistics } from "@/components/ClassStatistics";
import { ArrowLeft, Plus, Users, BarChart3, Sprout } from "lucide-react";
import Link from "next/link";

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

interface Student {
  id: string;
  name: string;
  completedTasks: number;
  totalTasks: number;
  totalPoints: number;
  lastActive: Date;
}

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "challenges" | "statistics">("overview");
  const [showChallengeForm, setShowChallengeForm] = useState(false);

  // Mock data for demonstration
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Mathematics Practice",
      description: "Complete algebra problems from Chapter 8 - focus on linear equations",
      points: 10,
      difficulty: "medium",
      assignedTo: ["student1", "student2", "student3"],
      createdAt: new Date("2024-11-15"),
      dueDate: new Date("2024-11-20")
    },
    {
      id: "2",
      title: "Hindi Literature Reading",
      description: "Read Premchand's story 'Idgah' and write a short reflection",
      points: 15,
      difficulty: "easy",
      assignedTo: ["student1", "student2"],
      createdAt: new Date("2024-11-14")
    },
    {
      id: "3",
      title: "Science Fair Project",
      description: "Create a working model on solar energy for the science exhibition",
      points: 25,
      difficulty: "hard",
      assignedTo: ["student3", "student4", "student5"],
      createdAt: new Date("2024-11-13"),
      dueDate: new Date("2024-11-25")
    }
  ]);

  const [students] = useState<Student[]>([
    {
      id: "student1",
      name: "Arjun Sharma",
      completedTasks: 4,
      totalTasks: 6,
      totalPoints: 52,
      lastActive: new Date("2024-11-17")
    },
    {
      id: "student2",
      name: "Priya Patel",
      completedTasks: 5,
      totalTasks: 6,
      totalPoints: 68,
      lastActive: new Date("2024-11-17")
    },
    {
      id: "student3",
      name: "Rohan Gupta",
      completedTasks: 3,
      totalTasks: 6,
      totalPoints: 41,
      lastActive: new Date("2024-11-16")
    },
    {
      id: "student4",
      name: "Ananya Singh",
      completedTasks: 2,
      totalTasks: 6,
      totalPoints: 28,
      lastActive: new Date("2024-11-16")
    },
    {
      id: "student5",
      name: "Karan Mehta",
      completedTasks: 4,
      totalTasks: 6,
      totalPoints: 55,
      lastActive: new Date("2024-11-17")
    },
    {
      id: "student6",
      name: "Sneha Reddy",
      completedTasks: 6,
      totalTasks: 6,
      totalPoints: 75,
      lastActive: new Date("2024-11-17")
    }
  ]);

  const handleCreateChallenge = (challengeData: Omit<Challenge, "id" | "createdAt">) => {
    const newChallenge: Challenge = {
      ...challengeData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setChallenges([...challenges, newChallenge]);
    setShowChallengeForm(false);
  };

  const tabs = [
    { id: "overview", label: "Student Overview", icon: <Users className="h-5 w-5" /> },
    { id: "challenges", label: "Plant Challenges", icon: <Sprout className="h-5 w-5" /> },
    { id: "statistics", label: "Class Statistics", icon: <BarChart3 className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-center flex-1 mx-2">Teacher Dashboard</h1>
            <button
              onClick={() => setShowChallengeForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Plant Challenge</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Tab Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === "overview" ? "Students" : 
                   tab.id === "challenges" ? "Tasks" : "Stats"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <StudentOverview students={students} challenges={challenges} />
          )}
          
          {activeTab === "challenges" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Active Challenges</h2>
                {challenges.length === 0 ? (
                  <div className="text-center py-8">
                    <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No challenges created yet.</p>
                    <p className="text-sm text-gray-400">Click "Plant Challenge" to create your first one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-800">{challenge.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-600 font-medium">{challenge.points} points</span>
                          <span className="text-gray-500">
                            Assigned to {challenge.assignedTo.length} students
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "statistics" && (
            <ClassStatistics students={students} challenges={challenges} />
          )}
        </motion.div>
      </div>

      {/* Plant Challenge Modal */}
      {showChallengeForm && (
        <PlantChallengeForm
          students={students}
          onSubmit={handleCreateChallenge}
          onClose={() => setShowChallengeForm(false)}
        />
      )}
    </div>
  );
}
