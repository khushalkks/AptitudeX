export const defaultJobRoles = [
  {
    title: 'Frontend Developer',
    description: 'Responsible for building high-quality, interactive, and responsive user interfaces using modern web technologies like React, JavaScript, and CSS.',
    industry: 'Technology',
    level: 'mid',
    minimumScore: 70,
    requiredSkills: [
      { name: 'JavaScript', weight: 1.5, category: 'technical' },
      { name: 'React', weight: 1.5, category: 'technical' },
      { name: 'HTML', weight: 1.0, category: 'technical' },
      { name: 'CSS', weight: 1.0, category: 'technical' },
      { name: 'Redux', weight: 1.0, category: 'technical' },
      { name: 'Tailwind CSS', weight: 1.0, category: 'tool' },
      { name: 'TypeScript', weight: 1.2, category: 'technical' },
      { name: 'Git', weight: 1.0, category: 'tool' }
    ],
    keywords: [
      { term: 'React', weight: 1.5, synonyms: ['React.js', 'ReactJS'] },
      { term: 'JavaScript', weight: 1.5, synonyms: ['JS', 'ES6'] },
      { term: 'TypeScript', weight: 1.2, synonyms: ['TS'] },
      { term: 'Redux', weight: 1.0, synonyms: ['Redux Toolkit', 'Context API'] },
      { term: 'Tailwind', weight: 1.0, synonyms: ['TailwindCSS', 'CSS Frameworks'] },
      { term: 'HTML5', weight: 1.0, synonyms: ['HTML'] },
      { term: 'CSS3', weight: 1.0, synonyms: ['CSS', 'SASS', 'SCSS'] },
      { term: 'Webpack', weight: 0.8, synonyms: ['Vite', 'Babel'] },
      { term: 'REST API', weight: 1.0, synonyms: ['API integration', 'Fetch', 'Axios'] },
      { term: 'Responsive Design', weight: 1.0, synonyms: ['Mobile-first', 'Flexbox', 'CSS Grid'] }
    ]
  },
  {
    title: 'Backend Developer',
    description: 'Responsible for designing, building, and maintaining server-side logic, databases, APIs, and microservices architecture.',
    industry: 'Technology',
    level: 'mid',
    minimumScore: 70,
    requiredSkills: [
      { name: 'Node.js', weight: 1.5, category: 'technical' },
      { name: 'Express.js', weight: 1.2, category: 'technical' },
      { name: 'MongoDB', weight: 1.3, category: 'technical' },
      { name: 'SQL', weight: 1.3, category: 'technical' },
      { name: 'REST APIs', weight: 1.2, category: 'technical' },
      { name: 'Redis', weight: 1.0, category: 'technical' },
      { name: 'Docker', weight: 1.1, category: 'tool' },
      { name: 'JWT', weight: 1.0, category: 'technical' }
    ],
    keywords: [
      { term: 'Node.js', weight: 1.5, synonyms: ['NodeJS', 'Node'] },
      { term: 'Express', weight: 1.2, synonyms: ['Express.js', 'ExpressJS'] },
      { term: 'MongoDB', weight: 1.3, synonyms: ['Mongoose', 'NoSQL'] },
      { term: 'PostgreSQL', weight: 1.3, synonyms: ['MySQL', 'SQL', 'Relational Database'] },
      { term: 'REST API', weight: 1.2, synonyms: ['RESTful API', 'Endpoints'] },
      { term: 'Redis', weight: 1.0, synonyms: ['Caching', 'Message Queue'] },
      { term: 'Docker', weight: 1.1, synonyms: ['Containers', 'Containerization'] },
      { term: 'JWT', weight: 1.0, synonyms: ['JSON Web Tokens', 'Authentication', 'OAuth'] },
      { term: 'System Design', weight: 1.2, synonyms: ['Architecture', 'Scalability'] },
      { term: 'AWS', weight: 1.0, synonyms: ['Amazon Web Services', 'Cloud'] }
    ]
  },
  {
    title: 'Full Stack Developer',
    description: 'Proficient in both frontend and backend development. Responsible for end-to-end features, from UI layout to server deployment.',
    industry: 'Technology',
    level: 'mid',
    minimumScore: 75,
    requiredSkills: [
      { name: 'React', weight: 1.4, category: 'technical' },
      { name: 'Node.js', weight: 1.4, category: 'technical' },
      { name: 'MongoDB', weight: 1.2, category: 'technical' },
      { name: 'SQL', weight: 1.2, category: 'technical' },
      { name: 'TypeScript', weight: 1.2, category: 'technical' },
      { name: 'Git', weight: 1.0, category: 'tool' },
      { name: 'REST APIs', weight: 1.2, category: 'technical' }
    ],
    keywords: [
      { term: 'MERN Stack', weight: 1.5, synonyms: ['React', 'Node.js', 'Express', 'MongoDB'] },
      { term: 'JavaScript', weight: 1.4, synonyms: ['JS', 'TypeScript', 'TS'] },
      { term: 'REST API', weight: 1.2, synonyms: ['API Design', 'GraphQL'] },
      { term: 'SQL', weight: 1.2, synonyms: ['MySQL', 'PostgreSQL'] },
      { term: 'Git', weight: 1.0, synonyms: ['GitHub', 'Version Control'] },
      { term: 'Deployment', weight: 1.0, synonyms: ['AWS', 'Heroku', 'Netlify', 'Vercel'] },
      { term: 'Docker', weight: 1.0, synonyms: ['Containers'] },
      { term: 'HTML/CSS', weight: 1.0, synonyms: ['Web development', 'Sass', 'Tailwind'] }
    ]
  },
  {
    title: 'DevOps Engineer',
    description: 'Responsible for managing cloud infrastructure, deploying applications, and implementing continuous integration and delivery pipelines.',
    industry: 'Technology',
    level: 'mid',
    minimumScore: 75,
    requiredSkills: [
      { name: 'Docker', weight: 1.4, category: 'tool' },
      { name: 'Kubernetes', weight: 1.5, category: 'tool' },
      { name: 'CI/CD', weight: 1.4, category: 'technical' },
      { name: 'AWS', weight: 1.4, category: 'tool' },
      { name: 'Terraform', weight: 1.3, category: 'tool' },
      { name: 'Linux', weight: 1.2, category: 'technical' },
      { name: 'Jenkins', weight: 1.1, category: 'tool' }
    ],
    keywords: [
      { term: 'Kubernetes', weight: 1.5, synonyms: ['K8s'] },
      { term: 'Docker', weight: 1.4, synonyms: ['Containers'] },
      { term: 'AWS', weight: 1.4, synonyms: ['Amazon Web Services', 'GCP', 'Azure'] },
      { term: 'CI/CD', weight: 1.4, synonyms: ['GitHub Actions', 'Jenkins', 'GitLab CI'] },
      { term: 'Terraform', weight: 1.3, synonyms: ['IaC', 'Infrastructure as Code'] },
      { term: 'Linux', weight: 1.2, synonyms: ['Bash scripting', 'Shell'] },
      { term: 'Ansible', weight: 1.0, synonyms: ['Configuration Management', 'Chef', 'Puppet'] },
      { term: 'Monitoring', weight: 1.1, synonyms: ['Prometheus', 'Grafana', 'Datadog'] }
    ]
  },
  {
    title: 'Data Scientist',
    description: 'Responsible for cleaning, analyzing, and modeling large datasets to discover patterns and build predictive machine learning systems.',
    industry: 'Technology',
    level: 'mid',
    minimumScore: 70,
    requiredSkills: [
      { name: 'Python', weight: 1.5, category: 'technical' },
      { name: 'SQL', weight: 1.3, category: 'technical' },
      { name: 'Machine Learning', weight: 1.4, category: 'technical' },
      { name: 'Pandas', weight: 1.2, category: 'technical' },
      { name: 'Scikit-Learn', weight: 1.3, category: 'technical' },
      { name: 'Data Visualization', weight: 1.1, category: 'technical' }
    ],
    keywords: [
      { term: 'Python', weight: 1.5, synonyms: ['Py'] },
      { term: 'Machine Learning', weight: 1.4, synonyms: ['ML', 'Deep Learning', 'Neural Networks'] },
      { term: 'SQL', weight: 1.3, synonyms: ['Database queries', 'PostgreSQL'] },
      { term: 'Pandas', weight: 1.2, synonyms: ['NumPy', 'DataFrames'] },
      { term: 'Scikit-Learn', weight: 1.3, synonyms: ['sklearn', 'Model training'] },
      { term: 'TensorFlow', weight: 1.2, synonyms: ['PyTorch', 'Keras'] },
      { term: 'Data Analysis', weight: 1.2, synonyms: ['Data Science', 'Analytics'] },
      { term: 'Data Visualization', weight: 1.1, synonyms: ['Matplotlib', 'Seaborn', 'Tableau', 'PowerBI'] }
    ]
  }
];
