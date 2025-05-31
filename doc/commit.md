# 🧾 Git Commit Message Convention

This project follows the **[Conventional Commits](https://www.conventionalcommits.org/)** specification to ensure clear, consistent, and meaningful commit messages.

---

## 📖 Standard Format: Conventional Commits

The **Conventional Commits** specification uses a structured commit message syntax:

`<type>(<scope>): <subject>`

csharp
Copy
Edit

### 📌 Example:

```bash
feat(auth): add login endpoint with JWT support
fix(ui): correct button alignment in settings page
🔤 Common Types
Type	Description
feat	A new feature
fix	A bug fix
docs	Documentation only changes
style	Changes that do not affect meaning (e.g. whitespace, format)
refactor	Code change that neither fixes a bug nor adds a feature
perf	A code change that improves performance
test	Adding or updating tests
chore	Maintenance tasks (e.g., updating dependencies)
ci	Changes to CI/CD configuration files and scripts
build	Changes that affect the build system or external dependencies
setup Changes related to project setup or configuration

✳️ Optional Elements
<scope>: A noun describing the section of the codebase affected (optional but encouraged).

BREAKING CHANGE:: If the change breaks backward compatibility, include this in the body or footer.

✅ Best Practices
Use imperative mood: “fix bug” not “fixed bug”.

Keep the subject line under 50 characters.

Separate the subject and body with a blank line.

Wrap body lines at 72 characters.

Explain why the change was made, not just what.

Group related changes into a single commit.

📦 Example Full Commit Message
bash
Copy
Edit
feat(api): add pagination to the /posts endpoint

Adds query parameters for page and limit. Defaults to page=1 and limit=10.
This change improves performance when retrieving large datasets.

BREAKING CHANGE: the /posts endpoint no longer returns all posts by default.
🛠 Tools That Support This Convention
Commitlint – Lint commit messages.

Semantic Release – Automate versioning and changelogs.

📚 References
Conventional Commits

Semantic Versioning

How to Write a Git Commit Message
```
