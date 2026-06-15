import express from 'express';
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
import { CohereClient } from 'cohere-ai';

const router = express.Router();

// Fallback static analysis if all LLMs fail
const generateFallbackAnalysis = (username, sortedLanguages, topRepos) => {
  const primaryLang = sortedLanguages[0]?.name || 'JavaScript';
  const languageNames = sortedLanguages.map(l => l.name);
  return `### 🐱 Developer Profile Summary
The developer **${username}** has a strong portfolio centered around project development, focusing primarily on **${primaryLang}**. Their code commits indicate steady updates and active interest in modern software design paradigms.

### 🛠️ Key Technical Stack
* **Primary Languages:** ${languageNames.slice(0, 4).join(', ') || 'JavaScript, HTML, CSS'}
* **Framework Focus:** Web development technologies, tooling configurations, and frontend/backend architectures.

### 🌟 Core Strengths
1. **Documentation Integrity:** Repository structures are organized with proper package manifests and resource linkages.
2. **Modern Tooling:** Demonstrates command over standard builds, modules, and code-bundling tools.
3. **Project Variety:** Showcases versatility across multiple application contexts and system architectures.

### 🎯 Matched Job Roles
1. **${primaryLang} Developer:** Strong command of core syntax and package environments.
2. **Full-Stack Developer:** Demonstrates balance of project modules, visual elements, and API pipelines.
3. **Software Engineer:** Capable of designing modular components and scaling repository structures.

### 📈 Portfolio Recommendations
1. **Add Rich READMEs:** Enhance repository files with custom descriptions, run instructions, and live links.
2. **Increase Repository Coverage:** Include testing suites (like Jest, Mocha, or Vitest) to indicate high code quality.
3. **Diversify Tech Stacks:** Try incorporating cloud configurations (Docker, AWS) to boost DevOps relevance.`;
};

router.get('/analyze/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Set headers, including GITHUB_TOKEN if available to avoid rate limiting
    const githubHeaders = { 'User-Agent': 'ResuMind-AI-App' };
    if (process.env.GITHUB_TOKEN) {
      githubHeaders['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user profile
    const userProfileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: githubHeaders
    });

    if (userProfileRes.status === 404) {
      return res.status(404).json({ success: false, error: 'GitHub user not found.' });
    }

    if (!userProfileRes.ok) {
      throw new Error(`GitHub API profile fetch failed: ${userProfileRes.status}`);
    }

    const userProfile = await userProfileRes.json();

    // Fetch public repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: githubHeaders
    });

    if (!reposRes.ok) {
      throw new Error(`GitHub API repos fetch failed: ${reposRes.status}`);
    }

    const repos = await reposRes.json();

    // Calculate stars, forks and languages
    let totalStars = 0;
    let totalForks = 0;
    const languages = {};

    repos.forEach(repo => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Sort languages by frequency
    const sortedLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .map(entry => ({ name: entry[0], count: entry[1] }));

    // Get top 6 repos sorted by stars + forks + size
    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, 6);

    // AI Analysis Prompt
    const prompt = `
Analyze the following GitHub portfolio statistics for user "${username}":
Name: ${userProfile.name || username}
Bio: ${userProfile.bio || 'None'}
Public Repositories: ${userProfile.public_repos}
Total Stars Received: ${totalStars}
Total Forks: ${totalForks}

Languages Distribution:
${sortedLanguages.map(l => `- ${l.name}: ${l.count} repos`).join('\n')}

Top Projects Overview:
${topRepos.map((repo, i) => `
${i + 1}. Name: ${repo.name}
   Language: ${repo.language || 'N/A'}
   Description: ${repo.description || 'No description provided.'}
   Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}
   Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}
`).join('\n')}

Please analyze this developer's portfolio and provide:
### 🐱 Developer Profile Summary
[A paragraph highlighting their coding style, profile summary and main tech characteristics]

### 🛠️ Key Technical Stack
[Bullet points listing language and technical details visible]

### 🌟 Core Strengths
[3 numbered points detailing specific engineering strengths]

### 🎯 Matched Job Roles
[3 numbered points recommending suitable positions and explanations]

### 📈 Portfolio Recommendations
[3 numbered points offering advice on improving their GitHub profile to stand out to tech recruiters]

Provide the response in clean Markdown formatting. Keep the analysis professional and encouraging.
`;

    let aiAnalysis = '';
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const cohereKey = process.env.COHERE_API_KEY;

    // 1. Try Cohere as primary provider
    if (cohereKey) {
      try {
        console.log('Querying Cohere as primary analysis provider...');
        const cohere = new CohereClient({ token: cohereKey });
        const cohereRes = await cohere.chat({
          model: 'command-r-08-2024',
          message: prompt,
        });
        aiAnalysis = cohereRes.text.trim();
      } catch (cohereErr) {
        console.warn('⚠️ Cohere primary analysis failed, trying fallbacks:', cohereErr.message);
      }
    }

    // 2. Try Google Gemini Fallback
    if (!aiAnalysis && geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        // Try gemini-1.5-flash
        try {
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const result = await model.generateContent(prompt);
          aiAnalysis = result.response.text();
        } catch (e1) {
          console.warn('⚠️ Gemini 1.5 Flash failed, trying gemini-pro:', e1.message);
          const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
          const result = await model.generateContent(prompt);
          aiAnalysis = result.response.text();
        }
      } catch (geminiErr) {
        console.warn('⚠️ Gemini fallback failed:', geminiErr.message);
      }
    }

    // 3. Try OpenAI Fallback
    if (!aiAnalysis && openaiKey) {
      try {
        const openai = new OpenAI({ apiKey: openaiKey });
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        });
        aiAnalysis = completion.choices[0].message.content;
      } catch (openaiErr) {
        console.warn('⚠️ OpenAI fallback failed:', openaiErr.message);
      }
    }

    // 4. Default Static Fallback
    if (!aiAnalysis) {
      aiAnalysis = generateFallbackAnalysis(username, sortedLanguages, topRepos);
    }

    res.json({
      success: true,
      profile: {
        username: userProfile.login,
        name: userProfile.name,
        avatar_url: userProfile.avatar_url,
        html_url: userProfile.html_url,
        bio: userProfile.bio,
        location: userProfile.location,
        public_repos: userProfile.public_repos,
        followers: userProfile.followers,
        following: userProfile.following,
        total_stars: totalStars,
        total_forks: totalForks,
        top_languages: sortedLanguages.slice(0, 5)
      },
      top_repos: topRepos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        updated_at: r.updated_at
      })),
      ai_analysis: aiAnalysis
    });

  } catch (err) {
    console.error('❌ GitHub Analyzer Error:', err.message);
    res.status(500).json({ success: false, error: 'Internal server error during analysis.' });
  }
});

export default router;
