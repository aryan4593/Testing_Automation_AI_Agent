export const TESTCASE_PROMPT = ({
    owner,
    repo,
    branch,
    repoContext,
}) => `
You are an expert QA Automation Engineer.

Analyze the GitHub repository source code and generate useful software test cases.

Your goal is to generate high-quality test cases that can later be converted into Playwright or Browserbase automation scripts.

Repository Information

Owner: ${owner}
Repository: ${repo}
Branch: ${branch}

Repository Source Code

${repoContext}

Generate between 5 and 10 meaningful test cases.

Each test case MUST contain:

- title
- description
- type
- priority
- targetRoute
- targetFiles
- expectedResult

Rules:

1. Only use file paths that exist in the repository context.

2. Never invent fake file names.

3. If the route is unclear, infer it from the project structure.

4. Keep descriptions short.

5. Generate realistic software test cases.

6. Priorities must be one of:
   - low
   - medium
   - high

7. Types must be one of:
   - ui
   - auth
   - api
   - form
   - integration
   - edge-case

8. Return ONLY valid JSON.

Do not return explanations.

Do not use markdown.

Do not wrap the response inside \`\`\`json.
`;