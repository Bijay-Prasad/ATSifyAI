interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "warning" | "bad";
      tip: string;
    }[];
    keywordRelevance: string;
    skillsDetected: string;
    noSkillsDetected: string;
  };
  improvements: string[];
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "warning" | "bad";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "warning" | "bad";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "warning" | "bad";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "warning" | "bad";
      tip: string;
      explanation: string;
    }[];
  };
}
