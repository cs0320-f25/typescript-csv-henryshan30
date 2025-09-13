# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own. 
Functionality: There is no type enforcement so "thirty" is returned just fine
Functionality: Fields with commas are not parsed correctly
Functionality: Empty row is not parsed correctly
Extensibility: Currently has no error reporting, could return error messages

- #### Step 2: Use an LLM to help expand your perspective.
There is overlap with my suggestions such as the quoted comma issue. A concern it pointed out that I missed is the potential memory issue when parsing extremely large csv files, and malformed csv files where there are too may or too few columns when compared to the header. Changed the prompt to focus more on edge cases in one and more on developer feautures in the other. Suggestions mostly stayed the same, but went more in depth.


- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

Functionality: As a user of the applciation, I want to be able to properly parse csv files even if they have quoted fields with commas(came from both me and LLM).
Extensibilitiy: As a developer of the application, I want to see detailed error messages that explain why the parser didn't work as intented, such as if there were malformed rows in the csv file and what row/column specifically caused the error(came from both me and LLM).
Functionality: As a developer of the application, I want to have structured types instead of only strings so that invalid data will be caught (came from both me and LLM).
Functionality: As a user of the application, I want empty rows to be skipped, should return [] instead of [""] (came from me).


My initial ideas were mostly errors I noticed that I wanted fixed such as the comma and quote handling as well as the lack of type enforcement. The LLM mostyl reinforced my thoughts giving me more confidence in them, and since it came up with so many, it also showed me some things I hadn't thought of. When I first used the original prompt, the LLM gave a long list of potential edge cases and improvements, but once I narrowed down the prompts to focus on only one of those, the LLM went much more into detail on each of its suggestions. What resonated with me were the things that I had already thought of as it gave me more confidence in the importance of those changes. However, what didn't resonate with me were changes that I felt weren't very necessary such as web worker support. 

### Design Choices

### 1340 Supplement

- #### 1. Correctness
What mmakes a CSV parser correct/the properties we should be testing consists of proper formatting such as quotes around fields with commas, same number of columns for all rows, and proper handling of empty values or rows/columns.

- #### 2. Random, On-Demand Generation
You could generate very large csv files to cover most edge cases. Could also test how large a csv file the parser can handle.

- #### 3. Overall experience, Bugs encountered and resolved
This sprint differed from previous assignments as it was done in typescript, and we were actually encouraged to consult with an LLM for one of the questions to aid our brainstorming which was surprising. I did find bugs with the pre-existing code through testing, but did not yet fix them as that was said to be part of next week's sprint.

#### Errors/Bugs: My parser has an error if the header type of the csv files is different than the schema.
#### Tests: In my tests, I covered a base cases where a schema consisting of a tuple of a string and number is taken in. I also tested the case where the schema is undefined so the function should just return the normal string[][]. Lastly, I also tested a case where the parser would return an error because it wouldn't be able to transform each row via the given schema because of a wrong type.
#### How To… run tests with npm test.

#### Team members and contributions (include cs logins): None

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): None
#### Total estimated time it took to complete project: 6 hours
#### Link to GitHub Repo:  https://github.com/cs0320-f25/typescript-csv-henryshan30/tree/main/src
