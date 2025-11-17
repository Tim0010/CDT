"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TreePine, Leaf, GraduationCap, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center mb-6">
            <TreePine className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Growth Tree Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track your learning journey at Prakriti School. Complete your assignments, 
            watch your knowledge tree grow, and celebrate every milestone along the way.
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Link 
            href="/student"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <GraduationCap className="h-5 w-5" />
            I&apos;m a Student
          </Link>
          <Link 
            href="/teacher"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <BookOpen className="h-5 w-5" />
            I&apos;m a Teacher
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TreePine className="h-10 w-10 text-green-600" />,
                title: "Complete Tasks",
                description: "Finish your homework and assignments to help your tree grow bigger and stronger."
              },
              {
                icon: <Leaf className="h-10 w-10 text-green-500" />,
                title: "Collect Leaves",
                description: "Every completed task adds a new leaf. See how many you can collect this week!"
              },
              {
                icon: <GraduationCap className="h-10 w-10 text-blue-500" />,
                title: "See Progress",
                description: "Check how well you're doing and what you need to work on next."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p> {new Date().getFullYear()} Prakriti School - Nurturing Growth Through Experience</p>
        </div>
      </footer>
    </div>
  );
}
