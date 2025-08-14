export const personalInfo = {
  name: "Rehan Shaikh",
  email: "rehanshaikh.dev@gmail.com",
  phone: "+91 9307295471",
  github: "https://github.com/RehanShaikh23",
  linkedin: "https://www.linkedin.com/in/rehan-shaikh23-5a1206318",
  title: "Full Stack Java Developer",
  bio: "Passionate developer with expertise in modern web technologies. I love creating efficient, scalable solutions and turning ideas into reality through code.",
  location: "India, Pune",
  profileImage: "/Rehan_Pic-removebg-preview.png"
};

export const skills = [
  { name: "Java", level: 90, category: "Backend" },
  { name: "JavaScript", level: 85, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "HTML", level: 95, category: "Frontend" },
  { name: "CSS", level: 90, category: "Frontend" },
  { name: "SQL", level: 80, category: "Database" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "C", level: 85, category: "Programming" },
  { name: "R", level: 70, category: "Data Science" }
];

export const projects = [
  {
    id: 1,
    title: "Group Management Dashboard",
    description: "A comprehensive dashboard for managing groups with invoice and company management features. Built with React and modern web technologies.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    features: [
      "Invoice Management System",
      "Company Profile Management",
      "User Authentication",
      "Responsive Design",
      "Real-time Updates"
    ],
    githubUrl: "https://github.com/RehanShaikh23/GroupManagementFinal",
    liveUrl: "https://group-management-final.vercel.app/",
    category: "Web Application"
  },
  {
    id: 2,
    title: "AI-Powered Smart Recruitment System (Backend)",
    description: "A backend system to streamline recruitment with AI-driven insights, secure authentication, and integrated communication tools.",
    image: "https://continusys.com/wp-content/uploads/2023/08/How-an-integrated-HR-system-supports-recruitment-and-onboarding-1-768x432.jpg",
    technologies: ["Java", "Spring Boot", "MySQL", "JWT", "Google Calendar API", "Twilio", "WebSocket"],
    features: [
      "Role-based Authentication (Recruiter & Candidate)",
      "AI-powered Resume Scoring & Skill Gap Analysis",
      "Google Calendar OAuth Integration for Interview Scheduling",
      "Real-time Notifications (Email, SMS, Slack, WebSocket)",
      "Analytics Dashboard for Recruitment Insights"
    ],
    githubUrl: "https://github.com/RehanShaikh23/smart-recruitment-system.git",
    liveUrl: "",
    category: "Backend Application"
  },
];