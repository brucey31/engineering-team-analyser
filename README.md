# Engineering Team Analyser

You can preview a deployed example at [https://engineering-team-analyser-vgdkqapdiq-nw.a.run.app](https://engineering-team-analyser-vgdkqapdiq-nw.a.run.app)

## What is this tool for?
This tool helps to identify, assess & analyse engineering (currently) skillsets against an agreed progression framework.
<img src="https://github.com/brucey31/engineering-team-analyser/blob/main/public/comparision.png?raw=true" alt="comparisons" title="Engineering Framework comparisions">

To help both Individual Contributors & their managers get a better & more objective view of:
1. The level of their current skills & work in comparison to the company agreed framework
2. Which skills the questionee is excelling in for their level
3. Which skills the questionee could improve upon to reach the next level.
(for managers)
4. How the questionee compares to other members of the team
5. Identify skillset weaknesses within the team that most urgently need addressing.

## Privacy
This tool has no backend & all data is stored in your browser's local storage. No data therefore leaves your computer and is not shared with anyone unless you screenshot & share it yourself. 

To delete all data from this app, follow [this guide](https://support.google.com/chrome/answer/2392709?hl=en-GB&co=GENIE.Platform%3DDesktop) for chrome or search your own browser settings.


## Pages
- `/frameworks` - (default) - Allows the user to input their name & pick which progression framework they would like to be assessed against.
- `/questions` - based on the chosen framework, asks the user ordinal questions on what actions & impacts they are currently making against the question within the framework topic.
- `/results` - shows the analysis of the questionee against the chosen framework & lists areas of excellence & potential improvement.


## Frameworks
<img src="https://github.com/brucey31/engineering-team-analyser/blob/main/public/questions.png?raw=true" alt="questions" title="Engineering Framework questions">

You can find the JSON schemas for the existing frameworks in the [src/constants](https://github.com/brucey31/engineering-team-analyser/blob/main/src/constants) folder. There is currently a framework for:
1. Software Engineer progression framework - inspired by the similar framework from [Circle CI](https://docs.google.com/spreadsheets/d/131XZCEb8LoXqy79WWrhCX4sBnGhCM1nAIz4feFZJsEo/edit#gid=0)
2. Engineering Manager progression framework - inspired by [Circle CI](https://docs.google.com/spreadsheets/d/131XZCEb8LoXqy79WWrhCX4sBnGhCM1nAIz4feFZJsEo/edit#gid=0) also.

The schemas follow the below pattern:
```json
{
    "id": "<UUID>>",
    "name": "<str>",
    "topics": [
        { 
            "name": "<str>",
            "questions": [
                {
                    "text": "<str>",
                    "answers": [
                        {
                            "text": "<str>",
                            "level": "<int>"
                        }, ...
                    ]
                }, ...
            ]
        }, ...
    ],
    "levels": [
        {
            "level_name": "<str>",
            "mean_score": "<int>"
        }
    ]
}
```

The level integer within each answer corresponds to a `level_name` within the framework. At the end each topic is aggregated up into a mean average for the answers within the topic & compared to the mean score for each level within the framework. 

Across all topics, the scores are taken as a mean again to ascertain which final level the questionee is at. Topics that scored below this level are marked as improvements on the results page & topics that have been marked as higher are marked as "doing well".

The spider chart shows the results across each topic & are plotted against other questionees that have undergone the same framework questions within the browser's local data store. 




## ToDo
1. Discuss & improve framework designs
2. Add tests for logic components in /src/controllers/
3. Add tests for components
4. Create new framework stub to allow others to PR their own frameworks in
