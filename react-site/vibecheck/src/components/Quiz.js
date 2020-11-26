import React from 'react';

// Some questions have been adapted from https://www.nsvrc.org/saam/consent-quiz

// eslint-disable-next-line no-unused-vars
const questions = [
    {
        questionText: 'You should ask for consent before:',
        answerOptions: [
            { answerText: 'Holding hands', isCorrect: false },
            { answerText: 'Kissing', isCorrect: false },
            { answerText: 'Having sex', isCorrect: false },
            { answerText: 'All of the above', isCorrect: true },
        ],
    },
    {
        questionText: 'When should you ask for consent?',
        answerOptions: [
            { answerText: 'Right before sex', isCorrect: false },
            { answerText: 'Before any type of touch', isCorrect: true },
            { answerText: 'Only the first time', isCorrect: false },
            { answerText: 'Whenever you feel like it', isCorrect: false },
        ],
    },
    {
        questionText: 'Who should ask for consent?',
        answerOptions: [
            { answerText: 'Casual hookups', isCorrect: false },
            { answerText: 'Long-term partners', isCorrect: false },
            { answerText: 'Married couples', isCorrect: false },
            { answerText: 'All of the Above', isCorrect: true },
        ],
    },
    {
        questionText: 'Body language is irrelevant, saying "Yes" is all that matters.',
        answerOptions: [
            { answerText: 'True', isCorrect: false },
            { answerText: 'False', isCorrect: true },
        ],
    },
    {
        questionText: 'Which of these options gives consent?',
        answerOptions: [
            { answerText: '"I guess so"', isCorrect: false },
            { answerText: '"If you want to"', isCorrect: false },
            { answerText: '*silence*', isCorrect: false },
            { answerText: 'None of the above', isCorrect: true },
        ],
    },
    {
        questionText: 'What should you do if your partner seems unsure?',
        answerOptions: [
            { answerText: 'Try to convince them', isCorrect: false },
            { answerText: 'Assume they\'re into it', isCorrect: false },
            { answerText: 'Suggest a different activity', isCorrect: true },
            { answerText: 'Ask why they never want to have fun', isCorrect: false },
        ],
    },
    {
        questionText: 'Consent can be taken away at any time',
        answerOptions: [
            { answerText: 'True', isCorrect: true },
            { answerText: 'False', isCorrect: false },
        ],
    },
    {
        questionText: 'If your partner says they want to stop, you should:',
        answerOptions: [
            { answerText: 'Finish if you feel close', isCorrect: false },
            { answerText: 'Stop immediately', isCorrect: true },
        ],
    },
];

// eslint-disable-next-line no-unused-vars
class Quiz extends React.Component {
   
    constructor(props) {
        super(props);
        this.state={ currentQuestion: 0, hasCompleted: false, score: 0 }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(answerText, isCorrect) {
        console.log(isCorrect);
        if(isCorrect) {
            alert("Correct!");
            this.setState({ score: this.state.score + 1 })
        }
        if(this.state.currentQuestion < questions.length-1 ) {
            var nextQuestion = this.state.currentQuestion + 1;
            this.setState({ currentQuestion: nextQuestion, hasCompleted: false })
        }
        else {
            this.setState({ hasCompleted: true })
        }
    }

    render() {
        return (
            <div className='app'>
                {( this.state.hasCompleted ) ? (
                    <div className='score-section'>You scored {this.state.score} out of {questions.length}</div>
                    ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {this.state.currentQuestion + 1}</span>/{ questions.length }
                            </div>
                            <div className='question-text'>{ questions[this.state.currentQuestion].questionText }</div>
                        </div>
                        <div className='answer-section'>
                            {questions[this.state.currentQuestion].answerOptions.map((answerOption, index) => (
		                    <button onClick={ () => this.handleClick(answerOption.answerText, answerOption.isCorrect) } >{answerOption.answerText}</button>
	                        ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Quiz;