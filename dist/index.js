#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Command } = require("commander");
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");
const program = new Command();
const FILEPATH = path.join(__dirname, "../data/tasks.json");
console.log(figlet.textSync("Task Tracker"));
program
    .version("1.0.0")
    .description("Manage tasks with Task Tracker")
    .option("-a, --at <string>", "Add task: -a [task]")
    .option("-r, --rt <value>", "Remove task: -r [taskNumber]")
    .option("-m, --mt <value>", "Mark task: -m [taskNumber],[ND/IP/D]")
    .option("-l, --lt [D, ND, IP]", "List tasks: -l OR -l [D,ND,IP]")
    .option("-f, --fm", "Reformat indexes: -f")
    .parse(process.argv);
const options = program.opts();
function listTasks(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContent = yield fs.promises.readFile(FILEPATH, "utf-8");
            const tasks = JSON.parse(fileContent);
            if (Object.keys(tasks).length === 0) {
                console.log("No available tasks.");
                return;
            }
            if (input !== "" && input !== undefined) {
                const statusMap = {
                    D: "done",
                    ND: "not done",
                    IP: "in progress",
                };
                const status = statusMap[input.toUpperCase()];
                if (!status) {
                    console.error("Invalid input. Use D, ND, or IP to filter tasks.");
                    return;
                }
                console.log("Tasks wih status: ");
                tasks.forEach((task) => {
                    if (task.status === status) {
                        console.log(task);
                    }
                });
            }
            else {
                console.log("All tasks: ", tasks);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.code === "ENOENT") {
                    console.log("No tasks file found. Please create a tasks.json file.");
                }
                else {
                    console.error("An error occurred:", error.message);
                }
            }
            else {
                console.error("An error occurred.");
            }
        }
    });
}
function addTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = [];
            try {
                const fileContent = yield fs.promises.readFile(FILEPATH, "utf-8");
                tasks = JSON.parse(fileContent);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.code !== "ENOENT") {
                        throw error;
                    }
                    else {
                        console.error("An error occured:", error.message);
                    }
                }
                else {
                    console.error("An error occurred.");
                }
            }
            const tasksQuantity = tasks.length !== 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
            const newTask = {
                id: tasksQuantity,
                description: task,
                status: "not done",
            };
            tasks.push(newTask);
            yield fs.promises.writeFile(FILEPATH, JSON.stringify(tasks, null, 4), "utf-8");
            console.log("Task added successfully: ", newTask);
        }
        catch (error) {
            console.error("Error adding tasks.");
        }
    });
}
function removeTask(taskNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = [];
            try {
                const fileContent = yield fs.promises.readFile(FILEPATH, "utf-8");
                tasks = JSON.parse(fileContent);
            }
            catch (error) {
                if (error.code === "ENOENT") {
                    console.error("No tasks file found.");
                    return;
                }
                throw error;
            }
            const taskIndex = tasks.findIndex((task) => task.id === Number(taskNumber));
            if (taskIndex === -1) {
                console.log(`Task with ID ${taskNumber} not found.`);
                return;
            }
            const removedTask = tasks.splice(taskIndex, 1);
            yield fs.promises.writeFile(FILEPATH, JSON.stringify(tasks, null, 4), "utf-8");
            console.log("Task removed successfully:", removedTask[0]);
        }
        catch (error) {
            console.error("Error removing task.");
        }
    });
}
// D - DONE, ND - NOT DONE, IP - IN PROGRESS
function markTask(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = [];
            try {
                const fileContent = yield fs.promises.readFile(FILEPATH, "utf-8");
                tasks = JSON.parse(fileContent);
            }
            catch (error) {
                if (error.code === "ENOENT") {
                    console.error("No tasks file found.");
                    return;
                }
                throw error;
            }
            const parts = input.split(",");
            parts[1].toUpperCase();
            if (parts.length !== 2) {
                throw new Error("Invalid input. Too many or too few options.");
            }
            if (parts[1] !== "D" && parts[1] !== "ND" && parts[1] !== "IP") {
                throw new Error("Invalid String input. Only options are D, ND, and IP.");
            }
            tasks.forEach((task) => {
                if (task.id == Number(parts[0])) {
                    if (parts[1] == "D") {
                        task.status = "done";
                    }
                    else if (parts[1] == "ND") {
                        task.status = "not done";
                    }
                    else if (parts[1] == "IP") {
                        task.status = "in progress";
                    }
                }
            });
            yield fs.promises.writeFile(FILEPATH, JSON.stringify(tasks, null, 4), "utf-8");
            console.log("Task modified successfully.");
        }
        catch (error) {
            console.error("Error modifying task.");
        }
    });
}
function formatTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = [];
            try {
                const fileContent = yield fs.promises.readFile(FILEPATH, "utf-8");
                tasks = JSON.parse(fileContent);
            }
            catch (error) {
                if (error.code === "ENOENT") {
                    console.error("No tasks file found.");
                    return;
                }
                throw error;
            }
            tasks.forEach((task, index) => {
                task.id = index + 1;
            });
            yield fs.promises.writeFile(FILEPATH, JSON.stringify(tasks, null, 4), "utf-8");
            console.log("Tasks formatted successfully.");
        }
        catch (error) {
            console.error("An error has occurred.");
        }
    });
}
if (options.lt !== undefined) {
    const ltValue = typeof options.lt === "string" ? options.lt : "";
    listTasks(ltValue);
}
if (options.at) {
    addTask(options.at);
}
if (options.rt) {
    removeTask(options.rt);
}
if (options.mt) {
    markTask(options.mt);
}
if (options.fm) {
    formatTasks();
}
//# sourceMappingURL=index.js.map