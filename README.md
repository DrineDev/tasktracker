# Task Tracker CLI

Task Tracker is a command-line interface (CLI) application designed to help you manage your tasks efficiently. With Task Tracker, you can add, remove, update, and list tasks, as well as reformat task indexes for better organization.

## Features
- Add tasks.
- Remove tasks by their number.
- Mark tasks as "Not Done (ND)," "In Progress (IP)," or "Done (D)."
- List tasks by their status or all at once.
- Reformat task indexes to ensure sequential numbering.

---

## Usage
Run the application with the following commands and options:

### Add a Task
```bash
-a, --at <string>
```
Add a new task by providing the task description.

Example:
```bash
tasktrack -a "Buy groceries"
```

### Remove a Task
```bash
-r, --rt <value>
```
Remove a task by specifying its task number.

Example:
```bash
tasktrack -r 2
```

### Mark a Task
```bash
-m, --mt <value>
```
Mark a task with one of the following statuses:
- **ND**: Not Done
- **IP**: In Progress
- **D**: Done

Specify the task number followed by the status, separated by a comma.

Example:
```bash
tasktrack -m 3,IP
```

### List Tasks
```bash
-l, --lt [D, ND, IP]
```
List tasks based on their status or display all tasks.
- **No argument**: Lists all tasks.
- **D**: Lists tasks marked as "Done."
- **ND**: Lists tasks marked as "Not Done."
- **IP**: Lists tasks marked as "In Progress."

Examples:
```bash
tasktrack -l  # Lists all tasks
tasktrack -l D  # Lists tasks marked as "Done"
```

### Reformat Task Indexes
```bash
-f, --fm
```
Reformat the task indexes to ensure they are sequential and start from 1.

Example:
```bash
tasktrack -f
```

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://roadmap.sh/projects/task-tracker
   ```
2. Navigate to the project directory:
   ```bash
   cd task-tracker
   ```
3. Build the application:
   ```bash
   npm run build
   ```
4. Run the application:
   ```bash
   node dist/index.js
   ```

Once built, you can also use the shortcut command `tasktrack` to run the program with any of the options mentioned above.

---

## Contributing
Contributions are welcome! Feel free to submit issues, feature requests, or pull requests on the [Task Tracker GitHub repository](https://roadmap.sh/projects/task-tracker).

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

