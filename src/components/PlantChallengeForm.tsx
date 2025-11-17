"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sprout, Calendar, Users, Star } from "lucide-react";

interface Student {
  id: string;
  name: string;
  completedTasks: number;
  totalTasks: number;
  totalPoints: number;
  lastActive: Date;
}

interface Challenge {
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  assignedTo: string[];
  dueDate?: Date;
}

interface PlantChallengeFormProps {
  students: Student[];
  onSubmit: (challenge: Challenge) => void;
  onClose: () => void;
}

export function PlantChallengeForm({ students, onSubmit, onClose }: PlantChallengeFormProps) {
  const [formData, setFormData] = useState<Challenge>({
    title: "",
    description: "",
    points: 10,
    difficulty: "medium",
    assignedTo: [],
    dueDate: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Challenge title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Challenge description is required";
    }
    
    if (formData.points < 1 || formData.points > 100) {
      newErrors.points = "Points must be between 1 and 100";
    }
    
    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = "Please select at least one student";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(studentId)
        ? prev.assignedTo.filter(id => id !== studentId)
        : [...prev.assignedTo, studentId]
    }));
  };

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getDifficultyStars = (difficulty: "easy" | "medium" | "hard") => {
    const starCount = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    return Array.from({ length: 3 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sprout className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Plant a New Challenge</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-white/90 mt-2">Create engaging tasks to help your students grow!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Challenge Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Complete Math Assignment"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Challenge Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe what students need to do..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Points and Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.points}
                  onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) || 10 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.points ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["easy", "medium", "hard"] as const).map((difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, difficulty }))}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        formData.difficulty === difficulty
                          ? getDifficultyColor(difficulty)
                          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <div className="flex gap-0.5">
                          {getDifficultyStars(difficulty)}
                        </div>
                      </div>
                      <div className="text-xs mt-1 capitalize">{difficulty}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Due Date (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    dueDate: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Assign to Students */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign to Students * ({formData.assignedTo.length} selected)
              </label>
              <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="space-y-2">
                  {students.map((student) => (
                    <label key={student.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.assignedTo.includes(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{student.name}</div>
                        <div className="text-sm text-gray-500">
                          {student.completedTasks}/{student.totalTasks} tasks • {student.totalPoints} points
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all font-medium"
              >
                Plant Challenge 🌱
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
