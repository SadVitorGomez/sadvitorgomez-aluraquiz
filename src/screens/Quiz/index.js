import React, { useState, useEffect } from 'react';

import QuizContainer from '../../components/QuizContainer';
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import AlternativeForm from '../../components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import Correct from '../../components/Correct';
import Wrong from '../../components/Wrong';

import db from '../../../db.json';
import LoadingWidget from '../../components/Loading';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Resultado</Widget.Header>

      <Widget.Content>
        <p>
          {`Você Acertou ${results.filter((x) => x).length} de perguntas de ${
            db.questions.length
          }`}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>{`#${index + 1} Resultado: ${
              result === true ? 'Correta' : 'Errada'
            }`}</li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        src={question.image}
        alt="Descrição"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativeForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmitted && isCorrect && <Correct />}
          {isQuestionSubmitted && !isCorrect && <Wrong />}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  Quiz: 'Quiz',
  Loading: 'Loading',
  Result: 'Result',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.Loading);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.Quiz);
    }, 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.Result);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        {screenState === screenStates.Quiz && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.Loading && <LoadingWidget />}

        {screenState === screenStates.Result && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
