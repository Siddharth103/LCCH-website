// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5555;

const questions = [
    
    // Easy
    { question: "In Python, which data type is immutable?", answers: [{ text: "list", correct: false }, { text: "tuple", correct: true }, { text: "dict", correct: false }, { text: "set", correct: false }], difficulty: "easy" },
    { question: "How do you start a block of code in Python?", answers: [{ text: "Using curly braces {}", correct: false }, { text: "Using indentation", correct: true }, { text: "Using parentheses ()", correct: false }, { text: "Using 'begin' and 'end'", correct: false }], difficulty: "easy" },
    { question: "What does 'cout' stand for in C++?", answers: [{ text: "Character Output", correct: false }, { text: "Console Output", correct: true }, { text: "Count Out", correct: false }, { text: "Clear Output", correct: false }], difficulty: "easy" },
    { question: "Which C++ keyword is used to allocate memory for an object?", answers: [{ text: "alloc", correct: false }, { text: "new", correct: true }, { text: "malloc", correct: false }, { text: "create", correct: false }], difficulty: "easy" },
    { question: "In Java, every application must contain a method named what?", answers: [{ text: "start()", correct: false }, { text: "main()", correct: true }, { text: "system()", correct: false }, { text: "program()", correct: false }], difficulty: "easy" },
    { question: "Which Java keyword is used to inherit a class?", answers: [{ text: "inherits", correct: false }, { text: "extends", correct: true }, { text: "implements", correct: false }, { text: "derives", correct: false }], difficulty: "easy" },
    { question: "What is the file extension for a compiled Java class?", answers: [{ text: ".java", correct: false }, { text: ".class", correct: true }, { text: ".jar", correct: false }, { text: ".exe", correct: false }], difficulty: "easy" },
    { question: "In Python, what is the result of `3 * 'A'`?", answers: [{ text: "9", correct: false }, { text: "'AAA'", correct: true }, { text: "Error", correct: false }, { text: "3A", correct: false }], difficulty: "easy" },
    { question: "What is the purpose of the 'break' statement in C++?", answers: [{ text: "To end the program", correct: false }, { text: "To exit a loop or switch statement", correct: true }, { text: "To skip an iteration", correct: false }, { text: "To return a value", correct: false }], difficulty: "easy" },
    { question: "Which of these is a primitive data type in Java?", answers: [{ text: "String", correct: false }, { text: "int", correct: true }, { text: "Array", correct: false }, { text: "Object", correct: false }], difficulty: "easy" },
    { question: "What function is used to get the length of a list in Python?", answers: [{ text: "size()", correct: false }, { text: "len()", correct: true }, { text: "length()", correct: false }, { text: "count()", correct: false }], difficulty: "easy" },
    { question: "In C++, which operator is used to access members of an object through a pointer?", answers: [{ text: ".", correct: false }, { text: "->", correct: true }, { text: "*", correct: false }, { text: "&", correct: false }], difficulty: "easy" },
    { question: "Which collection in Java does not allow duplicate elements?", answers: [{ text: "ArrayList", correct: false }, { text: "Set", correct: true }, { text: "LinkedList", correct: false }, { text: "Stack", correct: false }], difficulty: "easy" },
    { question: "How do you define a function in Python?", answers: [{ text: "function myFunction():", correct: false }, { text: "def myFunction():", correct: true }, { text: "void myFunction() {}", correct: false }, { text: "myFunction = () => {}", correct: false }], difficulty: "easy" },
    { question: "What is the correct syntax for a for loop in C++?", answers: [{ text: "for (i = 0; i < 5; i++)", correct: true }, { text: "for i in 1..5", correct: false }, { text: "for (i in 1..5)", correct: false }, { text: "foreach (i in 5)", correct: false }], difficulty: "easy" },
    { question: "In Java, what does the 'static' keyword mean?", answers: [{ text: "The variable cannot be changed", correct: false }, { text: "The method or variable belongs to the class, not an instance", correct: true }, { text: "The method is final", correct: false }, { text: "The variable is private", correct: false }], difficulty: "easy" },
    // Medium
    { question: "In Python, what is the difference between a list and a tuple?", answers: [{ text: "Lists are mutable, tuples are immutable", correct: true }, { text: "Tuples are mutable, lists are immutable", correct: false }, { text: "They are the same", correct: false }, { text: "Lists can store mixed data types, tuples cannot", correct: false }], difficulty: "medium" },
    { question: "What is operator overloading in C++?", answers: [{ text: "Creating a new operator", correct: false }, { text: "Giving a special meaning to an existing operator for a user-defined type", correct: true }, { text: "Using multiple operators in one statement", correct: false }, { text: "An error caused by too many operators", correct: false }], difficulty: "medium" },
    { question: "What is the 'this' keyword in Java?", answers: [{ text: "Refers to the superclass object", correct: false }, { text: "Refers to the current instance of the class", correct: true }, { text: "Refers to a static method", correct: false }, { text: "Refers to a global variable", correct: false }], difficulty: "medium" },
    { question: "What will `print(list(range(5)))` output in Python?", answers: [{ text: "[1, 2, 3, 4, 5]", correct: false }, { text: "[0, 1, 2, 3, 4]", correct: true }, { text: "[0, 1, 2, 3, 4, 5]", correct: false }, { text: "Error", correct: false }], difficulty: "medium" },
    { question: "What is a destructor in C++?", answers: [{ text: "A function to construct an object", correct: false }, { text: "A function that is automatically called when an object is destroyed", correct: true }, { text: "A function to delete a file", correct: false }, { text: "A memory leak checker", correct: false }], difficulty: "medium" },
    { question: "What is the difference between an interface and an abstract class in Java?", answers: [{ text: "A class can implement multiple interfaces but only extend one abstract class", correct: true }, { text: "Abstract classes cannot have constructors", correct: false }, { text: "Interfaces cannot have any implemented methods", correct: false }, { text: "They are functionally the same", correct: false }], difficulty: "medium" },
    { question: "What is a Python generator?", answers: [{ text: "A function that generates random numbers", correct: false }, { text: "A function that returns an iterator using the 'yield' keyword", correct:true }, { text: "A class that generates objects", correct: false }, { text: "A tool for generating documentation", correct: false }], difficulty: "medium" },
    { question: "What is a reference variable in C++?", answers: [{ text: "A pointer to an address", correct: false }, { text: "An alias for an already existing variable", correct: true }, { text: "A variable that stores a memory address", correct: false }, { text: "A read-only variable", correct: false }], difficulty: "medium" },
    { question: "What is method overloading in Java?", answers: [{ text: "Defining two methods with the same name but different parameters in the same class", correct: true }, { text: "Defining a method in a subclass that is already in the parent class", correct: false }, { text: "A method that performs too many operations", correct: false }, { text: "A method that calls itself", correct: false }], difficulty: "medium" },
    { question: "What is the output of `print(type({1, 2, 3}))` in Python?", answers: [{ text: "<class 'list'>", correct: false }, { text: "<class 'set'>", correct: true }, { text: "<class 'dict'>", correct: false }, { text: "<class 'tuple'>", correct: false }], difficulty: "medium" },
    { question: "What is the purpose of the 'finally' block in a Java try-catch statement?", answers: [{ text: "It is executed only if an exception is thrown", correct: false }, { text: "It is always executed, whether an exception is thrown or not", correct: true }, { text: "It is executed only if no exception is thrown", correct: false }, { text: "It is where you declare exceptions", correct: false }], difficulty: "medium" },
    { question: "In Python, what does `*args` and `**kwargs` do in a function definition?", answers: [{ text: "They are pointers", correct: false }, { text: "They allow a function to accept a variable number of positional and keyword arguments", correct: true }, { text: "They are used for asynchronous operations", correct: false }, { text: "They define required arguments", correct: false }], difficulty: "medium" },
    { question: "What does a `virtual` destructor do in C++?", answers: [{ text: "Prevents a class from being destroyed", correct: false }, { text: "Ensures the correct destructor is called for a derived class object pointed to by a base class pointer", correct: true }, { text: "Makes destruction faster", correct: false }, { text: "Creates a copy of the object before destruction", correct: false }], difficulty: "medium" },
    { question: "What is garbage collection in Java?", answers: [{ text: "Manually deleting unused objects", correct: false }, { text: "The automatic process of freeing up memory by deleting objects that are no longer reachable", correct: true }, { text: "A tool for cleaning up source code files", correct: "false" }, { text: "A type of exception", correct: false }], difficulty: "medium" },
    { question: "What will be the output of this Python code?\n`my_dict = {'a': 1, 'b': 2}\nprint(my_dict.get('c', 3))`", answers: [{ text: "None", correct: false }, { text: "3", correct: true }, { text: "Error", correct: false }, { text: "'c'", correct: false }], difficulty: "medium" },
    { question: "What is the difference between `i++` and `++i` in C++?", answers: [{ text: "There is no difference", correct: false }, { text: "`++i` increments then returns the value, `i++` returns the value then increments", correct: true }, { text: "`i++` is faster", correct: false }, { text: "`++i` is for integers only", correct: false }], difficulty: "medium" },
    { question: "In Java, what does the `instanceof` operator check?", answers: [{ text: "If two references point to the same object", correct: false }, { text: "If an object is an instance of a specific class or an interface", correct: true }, { text: "If a class is static", correct: false }, { text: "If an object's value is null", correct: false }], difficulty: "medium" },
    // Hard
    { question: "What is the Global Interpreter Lock (GIL) in Python?", answers: [{ text: "A security feature for web applications.", correct: false }, { text: "A mutex that allows only one thread to execute Python bytecode at a time.", correct: true }, { text: "A tool for managing global variables.", correct: false }, { text: "A way to lock the interpreter to a specific version.", correct: false }], difficulty: "hard" },
    { question: "What is a metaclass in Python?", answers: [{ text: "A class that is part of the standard library.", correct: false }, { text: "A class for storing metadata about other classes.", correct: false }, { text: "A class whose instances are classes (a 'class factory').", correct: true }, { text: "An abstract base class.", correct: false }], difficulty: "hard" },
    { question: "In C++, what is SFINAE (Substitution Failure Is Not An Error)?", answers: [{ text: "A compiler optimization technique.", correct: false }, { text: "A rule that allows a template specialization to be ignored if it would result in invalid code.", correct: true }, { text: "An error that occurs during runtime.", correct: false }, { text: "A way to handle exceptions in templates.", correct: false }], difficulty: "hard" },
    { question: "What is the Diamond Problem in C++ and how is it solved?", answers: [{ text: "A memory leak issue, solved by using smart pointers.", correct: false }, { text: "An ambiguity with multiple inheritance, solved using virtual inheritance.", correct: true }, { text: "A linking error with templates.", correct: false }, { text: "A problem with function overloading resolution.", correct: false }], difficulty: "hard" },
    { question: "In Java, what is the difference between checked and unchecked exceptions?", answers: [{ text: "Checked exceptions are errors, unchecked are warnings.", correct: false }, { text: "Checked exceptions are checked at compile-time; unchecked are checked at runtime.", correct: true }, { text: "Unchecked exceptions must be handled in a try-catch block.", correct: false }, { text: "There is no functional difference.", correct: false }], difficulty: "hard" },
    { question: "What is Type Erasure in Java Generics?", answers: [{ text: "A way to delete types from memory.", correct: false }, { text: "The process where the compiler replaces generic type parameters with their bounds or Object.", correct: true }, { text: "An error that occurs when a generic type is used incorrectly.", correct: false }, { text: "A feature for creating anonymous types.", correct: false }], difficulty: "hard" },
    { text: "What is the output of this Python code?\n`a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)`", answers: [{ text: "[1, 2, 3]", correct: false }, { text: "[1, 2, 3, 4]", correct: true }, { text: "[4]", correct: false }, { text: "A syntax error", correct: false }], difficulty: "hard" },
    { text: "What is the purpose of move semantics in C++11?", answers: [{ text: "To move objects in memory for better performance.", correct: false }, { text: "To allow the transfer of resources from one object to another instead of copying them.", correct:true }, { text: "A way to handle object serialization.", correct: false }, { text: "To enable multithreading.", correct: false }], difficulty: "hard" },
    { text: "What is the difference between `HashMap` and `Hashtable` in Java?", answers: [{ text: "HashMap is synchronized and allows null keys; Hashtable is not.", correct: false }, { text: "Hashtable is synchronized and does not allow null keys; HashMap is not synchronized and allows one null key.", correct: true }, { text: "They are identical and interchangeable.", correct: false }, { text: "HashMap is part of an older collection framework.", correct: false }], difficulty: "hard" },
    { text: "What are list comprehensions in Python used for?", answers: [{ text: "Understanding lists", correct: false }, { text: "Creating a new list based on an existing iterable in a concise way", correct: true }, { text: "Compressing list data", correct: false }, { text: "A type of for-loop", correct: false }], difficulty: "hard" },
    { text: "What is a smart pointer in C++ (e.g., `std::unique_ptr`)?", answers: [{ text: "A pointer that is faster than a raw pointer", correct: false }, { text: "A class that wraps a raw pointer to manage its lifetime and prevent memory leaks", correct: true }, { text: "A pointer that can point to multiple objects", correct: false }, { text: "A pointer that can't be null", correct: false }], difficulty: "hard" },
    { text: "In Java, what is the difference between method overriding and method hiding?", answers: [{ text: "There is no difference", correct: false }, { text: "Overriding is for instance methods (runtime polymorphism), hiding is for static methods (compile-time)", correct: true }, { text: "Overriding is for static methods, hiding is for instance methods", correct: false }, { text: "Hiding is a type of error", correct: false }], difficulty: "hard" },
    { text: "What does the `yield from` statement do in Python?", answers: [{ text: "It stops a generator", correct: false }, { text: "It delegates part of a generator's operations to another generator", correct: true }, { text: "It's a syntax error", correct: false }, { text: "It is used in asynchronous functions", correct: false }], difficulty: "hard" },
    { text: "What is the volatile keyword used for in C++ and Java?", answers: [{ text: "To make a variable constant", correct: false }, { text: "To tell the compiler that a variable's value may be changed by external entities and to prevent certain optimizations", correct: true }, { text: "To make a variable thread-safe", correct: false }, { text: "To declare a global variable", correct: false }], difficulty: "hard" },
    { text: "What is the Java Memory Model?", answers: [{ text: "The physical layout of memory in the JVM", correct: false }, { text: "A specification that guarantees how threads interact with memory, ensuring visibility of writes across threads", correct: true }, { text: "A tool for analyzing memory usage", correct: false }, { text: "The size of the heap", correct: false }], difficulty: "hard" },
    { text: "In Python, what is the difference between deep copy and shallow copy?", answers: [{ text: "Shallow copy copies everything, deep copy only references", correct: false }, { text: "Shallow copy creates a new object but inserts references into it; deep copy creates a new object and recursively adds copies of nested objects", correct: true }, { text: "They are the same", correct: false }, { text: "Deep copy is faster", correct: false }], difficulty: "hard" },
    { text: "What is RAII (Resource Acquisition Is Initialization) in C++?", answers: [{ text: "A memory management technique", correct: false }, { text: "A programming idiom where resource allocation is tied to object lifetime, ensuring resources are released when objects go out of scope", correct: true }, { text: "A type of exception handling", correct: false }, { text: "A way to optimize resource usage", correct: false }], difficulty: "hard" }
];
// --- END OF PASTED QUESTIONS ---

let quizState = {
    quizStarted: false,
    currentQuestionIndex: -1,
    answersForCurrentQuestion: [] // To store fastest answers
};

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('A new user connected:', socket.id);

    socket.on('start-quiz', () => {
        if (quizState.quizStarted) return;
        console.log('Admin started the quiz!');
        quizState.quizStarted = true;
        socket.broadcast.emit('quiz-started');
        socket.emit('admin-update', { message: 'Quiz has started. Ready to push first question.' });
    });

    socket.on('get-next-question', () => {
        if (!quizState.quizStarted) return;

        quizState.currentQuestionIndex++;
        quizState.answersForCurrentQuestion = []; // Reset for new question

        if (quizState.currentQuestionIndex < questions.length) {
            const nextQuestion = questions[quizState.currentQuestionIndex];
            io.emit('new-question', {
                question: nextQuestion,
                questionNumber: quizState.currentQuestionIndex + 1,
                totalQuestions: questions.length
            });
            console.log(`Pushed question ${quizState.currentQuestionIndex + 1}`);
        } else {
            io.emit('quiz-over', { message: 'The quiz has ended!' });
            console.log('Quiz over.');
        }
    });

    // NEW: Listen for user answers
    socket.on('submit-answer', (data) => {
        const currentQuestion = questions[quizState.currentQuestionIndex];
        if (!currentQuestion) return;

        const answer = currentQuestion.answers[data.answerIndex];
        if (answer && answer.correct) {
            quizState.answersForCurrentQuestion.push({
                name: data.name,
                time: new Date() // Record submission time
            });

            // Send updated leaderboard to admin
            io.emit('leaderboard-update', quizState.answersForCurrentQuestion);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));